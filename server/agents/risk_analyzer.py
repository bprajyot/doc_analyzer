import re
from datetime import datetime
from server.agents.base import create_agent
from server.utils.document_parser import parse_pdf

def clean_risk_output(raw_text: str) -> str:
    """
    Clean and reformat the AI's output for readability and database storage.
    Removes markdown artifacts (**bold**, extra newlines) and normalizes spacing.
    """
    # Remove markdown bold (**text**) or other formatting
    cleaned = re.sub(r"\*\*(.*?)\*\*", r"\1", raw_text)

    # Normalize bullet points
    cleaned = re.sub(r"[\*\•]\s*", "- ", cleaned)

    # Remove excessive newlines and whitespace
    cleaned = re.sub(r"\n{2,}", "\n", cleaned).strip()

    # Ensure "Risk Percentage" appears on a new line at the end
    cleaned = re.sub(r"(Risk Percentage:\s*\d+%?)", r"\n\1", cleaned)

    # Add a timestamp footer if desired
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cleaned += f"\n\n[Analyzed at: {timestamp}]"

    return cleaned


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
        return clean_risk_output(result)

    return analyze