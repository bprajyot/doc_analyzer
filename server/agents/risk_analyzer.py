import json
from datetime import datetime
from server.agents.base import create_agent

def risk_analyzer():
    system_prompt = (
        "You are a legal risk analysis assistant. "
        "Your task is to carefully read the given document or clause and identify any content "
        "that may pose potential legal, ethical, or data privacy risks. "
        "If risks exist, return a bullet-point list summarizing each risk clearly. "
        "If no risks are found, respond with 'No issues found.' "
        "Also estimate an overall risk percentage (0–100%) based on severity."
    )

    agent = create_agent("risk_analyzer", system_prompt)
    def analyze(document_text: str):
        prompt = (
            f"Analyze the following document for risks:\n\n{document_text}\n\n"
            "Respond with bullet points and a final 'Risk Percentage' value."
        )

        result = agent(prompt)
        return result
    
    return analyze