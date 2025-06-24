// Monaco Editor loader
// This script loads Monaco from CDN and exposes a function to create an editor

export function loadMonacoEditor(containerId, value, language = 'javascript') {
    if (!window.monaco) {
        const loaderScript = document.createElement('script');
        loaderScript.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js';
        loaderScript.onload = () => {
            window.require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });
            window.require(['vs/editor/editor.main'], function () {
                window.monaco.editor.create(document.getElementById(containerId), {
                    value: value,
                    language: language,
                    theme: 'vs-dark',
                    automaticLayout: true,
                    readOnly: false
                });
            });
        };
        document.body.appendChild(loaderScript);
    } else {
        window.monaco.editor.create(document.getElementById(containerId), {
            value: value,
            language: language,
            theme: 'vs-dark',
            automaticLayout: true,
            readOnly: false
        });
    }
}
