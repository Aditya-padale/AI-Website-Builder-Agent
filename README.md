# AI Website Builder Agent

A modern, full-stack AI-powered website builder that generates high-quality, interactive, and visually stunning HTML/CSS/JS (or React+Tailwind) websites from natural language prompts. Features a robust FastAPI backend and a beautiful, user-friendly frontend.

---

## Features

- **AI Website Generation:**
  - Generates complete, professional websites from your prompt using Gemini AI (Google Generative Language API).
  - Supports both plain HTML/CSS/JS and React+Tailwind project structures.
  - Ensures all images are highly relevant, high-quality, and hotlink-safe (Unsplash/Pexels only).
  - Produces interactive, feature-rich, and responsive designs with advanced UI/UX patterns.

- **Modern Frontend UI:**
  - Clean, two-column layout with sidebar, code editor, live preview, and logs.
  - Device preview toggles, grouped action buttons, and a fun animated loading overlay.
  - Beautiful typography (Inter, Fira Code) and indigo accent color.

- **Robust Backend:**
  - FastAPI server with CORS support and static file serving.
  - No artificial delays—waits only for AI to finish.
  - Detailed prompts to maximize website quality and relevance.
  - Returns detailed error messages for easier debugging.

- **Developer Friendly:**
  - Easy to run locally or deploy to the cloud.
  - Modular codebase for easy extension and customization.

---

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js (for frontend development, optional)
- Gemini API key (Google Generative Language API)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/reflective-ai-agent.git
   cd reflective-ai-agent
   ```

2. **Install backend dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

3. **Set up your Gemini API key:**
   - Export your API key as an environment variable:
     ```sh
     export GOOGLE_API_KEY=your-gemini-api-key
     ```
   - Or add it to a `.env` file if supported.

4. **Run the backend server:**
   ```sh
   cd backend
   python main.py
   ```
   The server will start at `http://localhost:8000`.

5. **Access the frontend:**
   - Open your browser and go to `http://localhost:8000`.

---

## Usage

1. Enter a detailed prompt describing the website you want to generate.
2. Choose between HTML/CSS/JS or React+Tailwind mode.
3. Click "Generate" and watch the AI build your site!
4. Edit, preview, and export your generated website directly from the UI.

---

## Project Structure

```
reflective-ai-agent/
├── backend/                         # Backend (FastAPI server, AI logic)
│   ├── main.py                     # FastAPI app, API endpoints, static serving
│   ├── langchain_pipeline.py       # LangChain pipeline for AI code generation
│   ├── reflection_engine.py        # (Optional) Reflection/feedback logic
│   ├── req.txt                     # (Optional) Additional requirements
│   └── __pycache__/                # Python bytecode cache
│       ├── langchain_pipeline.cpython-312.pyc
│       └── main.cpython-312.pyc
├── frontend/                       # Frontend (UI, code editor, preview)
│   ├── app.js                      # Main frontend logic (UI, API calls, state)
│   ├── custom-preview-loader.js    # (Present, but currently unused) This file exists in the codebase but is not referenced or imported anywhere in the frontend logic. You may remove it if not needed.
│   ├── index.html                  # Main HTML file (UI layout, sidebar, preview)
│   ├── monaco-loader.js            # Monaco code editor loader
│   ├── stackblitz-loader.js        # StackBlitz integration for live preview
│   └── styles.css                  # Custom styles for the frontend
├── static/                         # (Empty) Reserved for static assets
├── templates/                      # (Empty) Reserved for template files
├── req.txt                         # (Optional) Requirements (duplicate?)
├── requirements.txt                # Python dependencies for backend
├── README.md                       # Project documentation
├── .env                            # (Optional) Environment variables (not committed)
```

### Directory & File Details

- **backend/**: Contains all backend logic and API endpoints.
  - `main.py`: FastAPI app, serves API and static frontend, handles prompt requests.
  - `langchain_pipeline.py`: Handles AI code generation using LangChain and Gemini API.
  - `reflection_engine.py`: (If used) Logic for reflecting on or improving generated code.
  - `req.txt`: (If present) Additional or legacy requirements.
  - `__pycache__/`: Python bytecode cache (auto-generated).

- **frontend/**: Contains all frontend UI and logic.
  - `index.html`: Main UI layout, sidebar, preview, code editor, logs, etc.
  - `app.js`: Handles user interaction, API calls, state management, and UI updates.
  - `custom-preview-loader.js`: (Present, but currently unused) This file exists in the codebase but is not referenced or imported anywhere in the frontend logic. You may remove it if not needed.
  - `monaco-loader.js`: Loads Monaco code editor for in-browser editing (actively used).
  - `stackblitz-loader.js`: Integrates StackBlitz for live preview of generated sites (actively used).
  - `styles.css`: Custom CSS for the frontend UI.

- **static/**: Reserved for static assets (currently empty).
- **templates/**: Reserved for template files (currently empty).
- **requirements.txt**: Python dependencies for backend (install with `pip install -r requirements.txt`).
- **req.txt**: (If present) Possibly a duplicate or legacy requirements file.
- **README.md**: Project documentation (this file).
- **.env**: (Optional) Store environment variables like API keys (not committed to version control).

---

This structure ensures a clean separation between backend and frontend, and makes it easy to extend or deploy the project. Each file is named for clarity and maintainability. If you add new features, place them in the appropriate directory.

---

## Troubleshooting

- **Gemini API Quota Exceeded:**
  - If you see a `429` error or quota message, you have exceeded your daily free tier. Wait for reset or upgrade your plan.
- **Broken Images:**
  - The AI is instructed to use only Unsplash/Pexels direct links. If you see broken images, try regenerating or refining your prompt.
- **React Generation Errors:**
  - Check the logs panel for detailed error messages from the backend.

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Credits

- Built with [FastAPI](https://fastapi.tiangolo.com/), [LangChain](https://python.langchain.com/), [Gemini API](https://ai.google.dev/gemini-api), and [Monaco Editor](https://microsoft.github.io/monaco-editor/).
- UI inspired by modern design systems and developer tools.
