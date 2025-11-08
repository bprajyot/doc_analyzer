import os
import fitz
import pandas as pd

def parse_pdf(content: bytes) -> str:
    doc = fitz.open(stream=content, filetype="pdf")
    return "\n".join([page.get_text() for page in doc])