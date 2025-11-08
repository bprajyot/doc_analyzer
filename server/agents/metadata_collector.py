import json
from datetime import datetime
from server.agents.base import create_agent
from server.utils.document_parser import parse_pdf

def metadata_collector():
    system_prompt = (
        "You are a metadata extraction assistant. "
        "Given a document or text, your job is to extract key metadata fields. "
        "Identify and return the following details if available:\n"
        "- Title\n"
        "- Author or Creator\n"
        "- Date\n"
        "- Document Type\n"
        "- Keywords (if any)\n\n"
        "Return the response strictly as a valid JSON dictionary with keys exactly as above. "
        "If a field is missing, use null as its value."
    )

    agent = create_agent("metadata_collector", system_prompt)

    def extract_metadata(document_text: str):
        prompt = f"Extract metadata from the following document:\n\n{document_text}"
        result = agent(prompt)

        try:
            metadata = json.loads(result)
        except json.JSONDecodeError:
            metadata = {"raw_output": result}

        return metadata

    return extract_metadata