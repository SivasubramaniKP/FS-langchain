from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
from index import FinancialChatbot, initialize_gemini_model, ensure_plots_dir # Import necessary components from index.py
import uvicorn
import os

# Ensure the plots directory exists when the app starts
ensure_plots_dir()

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
        return {"response": response}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    # This block is for local development using `python app.py`
    # For production, use `uvicorn app:app --host 0.0.0.0 --port 8000`
    uvicorn.run(app, host="0.0.0.0", port=8000)
