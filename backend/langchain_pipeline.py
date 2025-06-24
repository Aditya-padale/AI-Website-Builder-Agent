# langchain_pipeline.py
# Placeholder for LangChain + Gemini integration

import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate

load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

def generate_code_with_gemini(prompt: str, react_project: bool = False):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return {"error": "# ERROR: Gemini API key not found in .env file."} if react_project else "# ERROR: Gemini API key not found in .env file."
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=api_key)
    if react_project:
        template = PromptTemplate.from_template(
            '''You are an expert React and Tailwind CSS developer. Generate a minimal but complete React project structure for the following website request. 
Output the following files as a JSON object with filename as key and file content as value:
- public/index.html
- src/App.jsx
- src/index.js
- tailwind.config.js
- postcss.config.js
- package.json
- src/index.css (with Tailwind imports)
- README.md
All code must be valid and runnable. Do not include explanations, only output the JSON object.\nRequest: {prompt}'''
        )
        chain = template | llm
        result = chain.invoke({"prompt": prompt})
        import json
        raw = result.content if hasattr(result, 'content') else str(result)
        # Remove code block markers if present
        if raw.strip().startswith('```'):
            raw = raw.strip().lstrip('`').split('\n', 1)[-1]
            if raw.strip().endswith('```'):
                raw = raw.rsplit('```', 1)[0]
        try:
            return json.loads(raw)
        except Exception as e:
            return {"error": f"Failed to parse Gemini output as JSON: {e}\nRaw output:\n{raw}"}
    else:
        template = PromptTemplate.from_template(
            """
You are an expert web developer. Generate a complete, modern, and visually appealing website as a single HTML file (including CSS and JavaScript in <style> and <script> tags) for the following request. Only output the code, no explanation.
Request: {prompt}
"""
        )
        chain = template | llm
        result = chain.invoke({"prompt": prompt})
        return result.content if hasattr(result, 'content') else str(result)
