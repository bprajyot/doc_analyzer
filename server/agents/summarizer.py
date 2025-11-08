import json
from datetime import datetime
from server.agents.base import create_agent
from server.agents.risk_analyzer import risk_analyzer
from server.utils.document_parser import parse_pdf

def document_summarizer():
    system_prompt = (
        "You are an intelligent document summarization assistant. "
        "Your goal is to read and understand a given document, then generate a concise, clear, "
        "and professional summary. "
        "The summary should be presented in 5–6 bullet points, written in simple and formal language. "
        "Avoid unnecessary jargon or repetition. Focus only on the key ideas, facts, and conclusions."
    )

    agent = create_agent("document_summarizer", system_prompt)

    def summarize(document_text: str):
        prompt = (
            f"Summarize the following document into 5–6 bullet points:\n\n{document_text}\n\n"
            "Use clear, professional, and easy-to-understand language."
        )
        result = agent(prompt)
        return result
    
    return summarize