import re
import json
from datetime import datetime
from server.agents.base import create_agent
from langchain_core.output_parsers import StrOutputParser
from server.utils.document_parser import parse_pdf


def clean_markdown(text: str) -> str:
    """
    Remove markdown-style formatting (bold, italics, etc.) from text.
    """
    if not text:
        return ""
    # Remove **bold**, *italic*, __underline__, etc.
    cleaned = re.sub(r"(\*\*|\*|__|_)", "", text)
    # Optionally, strip extra spaces and newlines
    cleaned = re.sub(r"\s+\n", "\n", cleaned).strip()
    return cleaned


def risk_analyzer():
    """
    Creates a legal risk analysis agent function that analyzes document text
    and returns potential risks with a risk percentage.
    """
    system_prompt = (
        "You are a legal risk analysis assistant. Your goal is to identify any potential legal, ethical, or data privacy risks "
        "in the provided document or clause. Return your answer directly — do not include introductions like 'Here’s an analysis...' or 'Below is a summary...'. Only output the findings themselves, as clear bullet points, followed by a final line in the format 'Risk Percentage: <number>%'. If no risks are found, simply respond with 'No issues found.'"
    )

    agent = create_agent("risk_analyzer", system_prompt)
    parser = StrOutputParser()

    def analyze(document_text: str):
        """
        Runs the risk analysis on the provided document text.
        """
        prompt = (
            f"Analyze the following document for risks:\n\n{document_text}\n\n Respond only with the bullet-point list of risks and a final 'Risk Percentage' line. Do NOT include introductions, explanations, or summaries before the list."
        )
        result = agent.invoke(prompt) if hasattr(agent, "invoke") else agent(prompt)
        parsed = parser.parse(result) if hasattr(parser, "parse") else parser(result)
        return clean_markdown(parsed)

    return analyze