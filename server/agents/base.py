from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage

def create_agent(name: str, system_prompt: str):
    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.7)

    def run(input_text: str):
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=input_text),
        ]
        response = llm.invoke(messages)
        return response.content

    return run