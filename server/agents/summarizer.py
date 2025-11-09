import re
from datetime import datetime
from server.agents.base import create_agent
from server.utils.document_parser import parse_pdf


def clean_markdown(text: str) -> str:
    """
    Remove markdown-style formatting (bold, italics, etc.) and extra whitespace.
    """
    if not text:
        return ""
    # Remove **bold**, *italic*, _underline_, etc.
    cleaned = re.sub(r"(\*\*|\*|__|_)", "", text)
    cleaned = re.sub(r"\s+\n", "\n", cleaned).strip()
    # Remove any introductory or unnecessary leading phrases
    cleaned = re.sub(
        r"(?i)^(here('|’)s|below is|the following is|this is|summary of|an overview of).{0,80}?:\s*", 
        "", 
        cleaned
    )
    return cleaned


def document_summarizer():
    """
    Creates a document summarization agent that returns clean, direct bullet-point summaries.
    """
    system_prompt = (
        "You are an intelligent document summarization assistant. Your task is to read and understand the given document, then generate a concise, clear, "
        "and professional summary. The summary should be presented directly as 5–6 bullet points. Do NOT include any introductory text like 'Here’s a summary...' or 'Below is an overview...'. Write in simple, formal, and easy-to-understand language. Avoid unnecessary jargon, repetition, or commentary."
    )

    agent = create_agent("document_summarizer", system_prompt)

    def summarize(document_text: str):
        """
        Summarizes the provided document text.
        """
        prompt = (
            f"Summarize the following document into 5-6 bullet points:\n\n{document_text}\n\n Respond only with the bullet points — no introductions, summaries, or explanations before the list."
        )

        # Call the agent safely (works whether it uses .invoke() or callable interface)
        result = agent.invoke(prompt) if hasattr(agent, "invoke") else agent(prompt)

        # Clean Markdown or extraneous phrases
        return clean_markdown(result)

    return summarize