import os
import pandas as pd
import matplotlib.pyplot as plt
import camelot
from typing import List, Dict, Any, Optional
from datetime import datetime
import shutil

# Directory to save generated dashboard plots
DASHBOARD_PLOTS_DIR = "./dashboard_plots"

def ensure_dashboard_plots_dir():
    """Ensures the directory for dashboard plots exists."""
    if not os.path.exists(DASHBOARD_PLOTS_DIR):
        os.makedirs(DASHBOARD_PLOTS_DIR)

def extract_tables_from_pdf(pdf_path: str, pages: str = "all") -> List[pd.DataFrame]:
    """
    Extracts tables from a PDF document using Camelot.
    
    Args:
        pdf_path: Path to the PDF file.
        pages: Page numbers to extract tables from (e.g., "1", "1,3", "1-3", "all").
               Defaults to "all".
               
    Returns:
        A list of pandas DataFrames, each representing a table found in the PDF.
    """
    try:
        tables = camelot.read_pdf(pdf_path, pages=pages, flavor='stream', edge_tol=500) # 'stream' for table-like data, 'lattice' for well-defined tables
        extracted_dfs = [table.df for table in tables]
        print(f"[DEBUG] Extracted {len(extracted_dfs)} tables from {pdf_path}")
        return extracted_dfs
    except Exception as e:
        print(f"[ERROR] Failed to extract tables from PDF {pdf_path}: {e}")
        return []

def process_financial_data(dataframes: List[pd.DataFrame]) -> Dict[str, Any]:
    """
    Processes extracted financial dataframes to derive meaningful insights.
    This is a placeholder and will need to be customized based on expected document structures.
    
    Args:
        dataframes: A list of pandas DataFrames extracted from documents.
        
    Returns:
        A dictionary containing processed data suitable for dashboard visualization.
    """
    processed_data = {
        "summary": {},
        "spending_by_category": {},
        "income_vs_expenses": {"income": 0, "expenses": 0},
        "trends": {},
        # Add more categories as needed
    }
    
    # Placeholder for actual data processing logic
    # In a real scenario, you'd have more sophisticated parsing
    # For now, let's just try to find some 'transactions' or 'amounts'
    
    all_text = ""
    for df in dataframes:
        all_text += df.to_string() + "\n" # Concatenate all text for basic keyword search
    
    # Very basic parsing example:
    if "income" in all_text.lower() and "expense" in all_text.lower():
        # This part would need actual regex or more advanced NLP to extract numbers
        processed_data["income_vs_expenses"]["income"] = 100000 # Mock value
        processed_data["income_vs_expenses"]["expenses"] = 50000 # Mock value
        
    # Example: Simple category parsing (very naive)
    if "groceries" in all_text.lower():
        processed_data["spending_by_category"]["groceries"] = 15000 # Mock value
    if "utilities" in all_text.lower():
        processed_data["spending_by_category"]["utilities"] = 5000 # Mock value
        
    print(f"[DEBUG] Processed financial data (mocked): {processed_data}")
    return processed_data

def generate_spending_by_category_chart(spending_data: Dict[str, float], filename: str) -> str:
    """
    Generates a pie chart for spending by category.
    
    Args:
        spending_data: Dictionary of spending categories and amounts.
        filename: Name of the file to save the chart.
        
    Returns:
        The path to the saved chart image.
    """
    if not spending_data:
        print("[INFO] No spending data to plot for category chart.")
        return ""

    labels = spending_data.keys()
    sizes = spending_data.values()
    
    ensure_dashboard_plots_dir()
    filepath = os.path.join(DASHBOARD_PLOTS_DIR, filename)
    
    plt.figure(figsize=(8, 8))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140)
    plt.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
    plt.title('Spending by Category')
    plt.savefig(filepath)
    plt.close()
    
    print(f"[DEBUG] Spending by category chart saved to: {filepath}")
    return filepath

def generate_income_vs_expenses_chart(income_vs_expenses_data: Dict[str, float], filename: str) -> str:
    """
    Generates a bar chart for income vs. expenses.
    
    Args:
        income_vs_expenses_data: Dictionary with 'income' and 'expenses' values.
        filename: Name of the file to save the chart.
        
    Returns:
        The path to the saved chart image.
    """
    if not income_vs_expenses_data or (income_vs_expenses_data.get("income", 0) == 0 and income_vs_expenses_data.get("expenses", 0) == 0):
        print("[INFO] No income/expenses data to plot for bar chart.")
        return ""

    labels = list(income_vs_expenses_data.keys())
    values = list(income_vs_expenses_data.values())
    
    ensure_dashboard_plots_dir()
    filepath = os.path.join(DASHBOARD_PLOTS_DIR, filename)
    
    plt.figure(figsize=(8, 6))
    plt.bar(labels, values, color=['green', 'red'])
    plt.title('Income vs. Expenses')
    plt.xlabel('Category')
    plt.ylabel('Amount (₹)')
    plt.savefig(filepath)
    plt.close()
    
    print(f"[DEBUG] Income vs. Expenses chart saved to: {filepath}")
    return filepath

def generate_dynamic_dashboard(file_path: str) -> List[str]:
    """
    Generates a dynamic dashboard based on the uploaded financial document.
    
    Args:
        file_path: The path to the uploaded financial document.
        
    Returns:
        A list of file paths to the generated chart images.
    """
    chart_paths = []
    
    file_extension = os.path.splitext(file_path)[1].lower()
    
    if file_extension == ".pdf":
        dataframes = extract_tables_from_pdf(file_path)
        processed_data = process_financial_data(dataframes)
        
        if processed_data["spending_by_category"]:
            chart_filename = f"spending_by_category_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
            chart_path = generate_spending_by_category_chart(processed_data["spending_by_category"], chart_filename)
            if chart_path:
                chart_paths.append(chart_path)
                
        if processed_data["income_vs_expenses"]["income"] > 0 or processed_data["income_vs_expenses"]["expenses"] > 0:
            chart_filename = f"income_vs_expenses_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
            chart_path = generate_income_vs_expenses_chart(processed_data["income_vs_expenses"], chart_filename)
            if chart_path:
                chart_paths.append(chart_path)
                
    # Add handling for .docx and .txt here if needed, extracting text
    # For now, focusing on PDF tables as the primary dashboard source
    
    if not chart_paths:
        print(f"[INFO] No charts generated for {file_path}. Data extraction or processing might need refinement.")
        
    return chart_paths
