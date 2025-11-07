import os
import fitz  # PyMuPDF
import pandas as pd

def parse_pdf(content: bytes, file: str) -> str:
    file = file.lower()
    doc = fitz.open(stream=content, filetype="pdf")
    return "\n".join([page.get_text() for page in doc])