import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain.document_loaders import PyPDFLoader, TextLoader, Docx2txtLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Initialize embedding model
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=os.getenv("GOOGLE_API_KEY"))

# ChromaDB persistent directory
CHROMA_DB_DIR = "./chroma_db"

def load_documents(file_path: str):
    if file_path.endswith(".pdf"):
        loader = PyPDFLoader(file_path)
    elif file_path.endswith(".txt"):
        loader = TextLoader(file_path)
    elif file_path.endswith(".docx"):
        loader = Docx2txtLoader(file_path)
    else:
        raise ValueError("Unsupported file type")
    return loader.load()

def split_documents(documents):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    return text_splitter.split_documents(documents)

def get_vector_store():
    if not os.path.exists(CHROMA_DB_DIR):
        os.makedirs(CHROMA_DB_DIR)
    # This will load an existing vector store if it exists, or create a new one
    vector_store = Chroma(persist_directory=CHROMA_DB_DIR, embedding_function=embeddings)
    return vector_store

def add_documents_to_vector_store(documents):
    vector_store = get_vector_store()
    vector_store.add_documents(documents)
    vector_store.persist() # Ensure changes are saved to disk

def retrieve_documents(query: str, k: int = 4):
    vector_store = get_vector_store()
    retrieved_docs = vector_store.similarity_search(query, k=k)
    return retrieved_docs
