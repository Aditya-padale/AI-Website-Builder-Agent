from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse, HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uvicorn
import os
import zipfile
import io
from langchain_pipeline import generate_code_with_gemini

app = FastAPI()

# Allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static frontend files at /static
frontend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../frontend'))
app.mount("/static", StaticFiles(directory=frontend_path), name="static")

@app.get("/")
def serve_index():
    return HTMLResponse(open(os.path.join(frontend_path, "index.html"), encoding="utf-8").read())

class PromptRequest(BaseModel):
    prompt: str
    as_react: bool = False

@app.post("/api/generate")
async def generate_code(req: PromptRequest):
    if req.as_react:
        # Generate React+Tailwind project structure
        code_dict = generate_code_with_gemini(req.prompt, react_project=True)
        if isinstance(code_dict, dict) and code_dict.get("error"):
            # Return the actual error message for better debugging
            error_detail = code_dict.get("error")
            logs = f"[ERROR] React+Tailwind project generation failed: {error_detail}"
            return JSONResponse({"files": None, "logs": logs})
        # code_dict: {filename: content, ...}
        # Return as JSON for frontend file explorer/editor/live preview
        return JSONResponse({"files": code_dict, "logs": "[INFO] React+Tailwind project generated."})
    else:
        # Improved prompt: require images to be highly relevant to the website topic/content
        code = generate_code_with_gemini(
            req.prompt + "\n\nRequirements:\n- Use modern HTML5, CSS3, and JavaScript.\n- Add interactive animations and transitions using JS and CSS.\n- Use only direct image links from Unsplash (https://images.unsplash.com/) or Pexels (https://images.pexels.com/).\n- Do NOT use Imgur, Google Images, or any image host that blocks hotlinking.\n- All images must be visible and not broken.\n- All images must be highly relevant and directly related to the website topic and content. Do not use generic or unrelated images.\n- Make the website visually stunning, professional, and highly interactive.\n- Use multiple sections, cards, creative layouts, and advanced UI/UX patterns.\n- Add at least 3 interactive JS features (e.g., sliders, modals, carousels, tabs, accordions, etc.).\n- Use CSS for beautiful effects, gradients, and responsiveness.\n- Use advanced CSS (flexbox, grid, animations, transitions, hover effects, etc.).\n- Add a sticky header, animated hero section, testimonials, gallery, and contact form.\n- Use at least 5 high-quality images from Unsplash or Pexels (direct links) that are contextually appropriate.\n- Add a footer with social links and copyright.\n- The code in index.html must be at least 500 lines long.\n- Do not include explanations, only output the code.\n- All code must be in a single HTML file with <style> and <script> tags included.\n- Make the code as long, detailed, and feature-rich as possible.")
        logs = "[INFO] Best possible interactive website generated with highly relevant images and animations."
        return JSONResponse({"files": {"index.html": code}, "logs": logs})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
