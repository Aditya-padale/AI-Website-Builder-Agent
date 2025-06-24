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
│   ├── custom-preview-loader.js    # (Optional) Custom preview logic
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
  - `custom-preview-loader.js`: (If present) Custom logic for previewing code.
  - `monaco-loader.js`: Loads Monaco code editor for in-browser editing.
  - `stackblitz-loader.js`: Integrates StackBlitz for live preview of generated sites.
  - `styles.css`: Custom CSS for the frontend UI.

- **static/**: Reserved for static assets (currently empty).
- **templates/**: Reserved for template files (currently empty).
- **requirements.txt**: Python dependencies for backend (install with `pip install -r requirements.txt`).
- **req.txt**: (If present) Possibly a duplicate or legacy requirements file.
- **README.md**: Project documentation (this file).
- **.env**: (Optional) Store environment variables like API keys (not committed to version control).

---

This structure ensures a clean separation between backend and frontend, and makes it easy to extend or deploy the project. Each file is named for clarity and maintainability. If you add new features, place them in the appropriate directory.
