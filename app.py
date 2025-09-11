from dotenv import load_dotenv
load_dotenv() # Load environment variables from .env file

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
from index import FinancialChatbot, initialize_gemini_model, ensure_plots_dir # Import necessary components from index.py
import uvicorn
import os
import shutil # Import shutil for file operations
from rag_utils import load_documents, split_documents, add_documents_to_vector_store, retrieve_documents # Import RAG utilities
from dashboard_utils import generate_dynamic_dashboard, ensure_dashboard_plots_dir # Import dashboard utilities
import json # Import json for parsing plot responses

# Ensure the plots directory exists when the app starts
ensure_plots_dir()
ensure_dashboard_plots_dir() # Ensure dashboard plots directory also exists

# Initialize the chatbot
chatbot = FinancialChatbot()
# Check if the Gemini model was initialized successfully
if not chatbot.agent:
    print("FATAL ERROR: Gemini model could not be initialized. Please check your GOOGLE_API_KEY.")
    exit(1) # Exit if the chatbot can't be initialized

app = FastAPI(
    title="Personal Finance AI Agent",
    description="An AI assistant for comprehensive financial planning using Google Gemini and LangChain.",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Allow frontend origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

class ChatRequest(BaseModel):
    user_input: str

@app.get("/", summary="Root endpoint for health check")
async def read_root():
    return {"message": "Welcome to the Personal Finance AI Assistant API! Visit /docs for API documentation."}

@app.post("/chat", summary="Interact with the Personal Finance AI Agent")
async def chat_with_agent(request: ChatRequest):
    """
    Sends a user message to the AI financial assistant and returns the AI's response.
    """
    try:
        response = chatbot.chat(request.user_input)
        print(f"[DEBUG] Raw agent response: {response}") # Add this line
        
        # Attempt to parse response as JSON to check for plot data
        try:
            json_response = json.loads(response)
            if isinstance(json_response, dict) and json_response.get("type") == "plot":
                return {"response_type": "plot", "data": json_response}
        except json.JSONDecodeError:
            pass # Not a JSON response, treat as plain text
        
        return {"response_type": "text", "data": response}
    except Exception as e:
        return {"error": str(e)}

@app.post("/upload-document", summary="Upload a financial document for RAG")
async def upload_document(file: UploadFile = File(...)):
    """
    Uploads a document (PDF, TXT, DOCX) to be processed and stored in the vector database
    for Retrieval-Augmented Generation.
    """
    try:
        upload_dir = "./uploaded_documents"
        os.makedirs(upload_dir, exist_ok=True)
        file_location = os.path.join(upload_dir, file.filename)

        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        documents = load_documents(file_location)
        chunks = split_documents(documents)
        add_documents_to_vector_store(chunks)

        return {"message": f"Document '{file.filename}' uploaded and processed successfully!", "file_path": file_location}
    except ValueError as ve:
        return {"error": str(ve)}
    except Exception as e:
        return {"error": f"Failed to process document: {str(e)}"}

@app.post("/generate-dashboard", summary="Generate a dynamic dashboard from an uploaded document")
async def generate_dashboard(file_path: str):
    """
    Generates a dynamic dashboard based on the specified uploaded financial document.
    Returns a list of paths to the generated chart images.
    """
    try:
        chart_paths = generate_dynamic_dashboard(file_path)
        if chart_paths:
            # Return relative paths for frontend consumption
            return {"message": "Dashboard generated successfully!", "chart_paths": [os.path.basename(p) for p in chart_paths]}
        else:
            return {"message": "No dashboard charts could be generated from the document.", "chart_paths": []}
    except Exception as e:
        return {"error": f"Failed to generate dashboard: {str(e)}"}

if __name__ == "__main__":
    # This block is for local development using `python app.py`
    # For production, use `uvicorn app:app --host 0.0.0.0 --port 8000`
    uvicorn.run(app, host="0.0.0.0", port=8000)
