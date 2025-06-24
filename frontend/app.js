// Simple frontend logic for prompt submission and UI updates

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('prompt-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const prompt = document.getElementById('prompt-input').value;
        setLoading(true);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, as_react: false }) // Only generate plain HTML/CSS/JS
            });
            if (res.ok) {
                const data = await res.json();
                window.hideFunnyLoading && window.hideFunnyLoading();
                if (data.files && !data.files.error) {
                    showFileTree(data.files);
                    document.getElementById('logs-output').value = data.logs || '';
                    document.getElementById('live-preview-btn').classList.remove('hidden');
                    document.getElementById('stackblitz-container').classList.remove('hidden');
                    const iframe = document.getElementById('site-preview');
                    if (iframe) iframe.classList.add('hidden');
                    import('./stackblitz-loader.js').then(mod => {
                        mod.openCustomPreview(data.files, 'stackblitz-container');
                    }).catch(err => {
                        document.getElementById('logs-output').value += '\nFailed to load custom preview loader: ' + err;
                        console.error('Failed to load custom preview loader:', err);
                    });
                    const firstFile = Object.keys(data.files)[0];
                    if (firstFile) {
                        showCodeInMonaco(data.files[firstFile], firstFile.endsWith('.js') ? 'javascript' : firstFile.endsWith('.css') ? 'css' : firstFile.endsWith('.html') ? 'html' : 'plaintext');
                    }
                } else {
                    document.getElementById('logs-output').value = data.logs || 'Error: No files returned.';
                    // Clear Monaco and preview if error
                    const container = document.getElementById('monaco-container');
                    if (container) container.innerHTML = '';
                    const iframe = document.getElementById('site-preview');
                    if (iframe) iframe.srcdoc = '';
                    if (iframe) iframe.classList.remove('hidden');
                    document.getElementById('stackblitz-container').classList.add('hidden');
                }
            } else {
                window.hideFunnyLoading && window.hideFunnyLoading();
                document.getElementById('logs-output').value = 'Error generating React project.';
            }
        } catch (err) {
            window.hideFunnyLoading && window.hideFunnyLoading();
            document.getElementById('logs-output').value = 'Error: ' + err.message;
        }
        setLoading(false);
        window.hideFunnyLoading && window.hideFunnyLoading();
    });

    document.getElementById('retry-btn').onclick = function() {
        // Placeholder: Could trigger a retry endpoint
        document.getElementById('logs-output').value = 'Retrying (not implemented)...';
    };

    document.getElementById('download-btn').onclick = function() {
        // Download currently visible code from Monaco
        const container = document.getElementById('monaco-container');
        let code = '';
        if (window.monaco && window.monaco.editor) {
            const editors = window.monaco.editor.getEditors ? window.monaco.editor.getEditors() : [];
            if (editors.length > 0) {
                code = editors[0].getValue();
            }
        }
        if (!code && container) code = container.textContent;
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'website.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    document.getElementById('reflect-btn').onclick = function() {
        // Placeholder: Could trigger a reflection endpoint
        document.getElementById('logs-output').value = 'Reflecting (not implemented)...';
    };

    // Always build as React+Tailwind project
    let asReact = true;
    let monacoInstance = null;
    let lastReactFiles = null;

    function setLoading(isLoading) {
        document.getElementById('prompt-input').disabled = isLoading;
        document.querySelector('button[type="submit"]').disabled = isLoading;
    }

    function showFileTree(files) {
        const fileTreeDiv = document.getElementById('file-tree');
        fileTreeDiv.innerHTML = '';
        fileTreeDiv.classList.remove('hidden');
        lastReactFiles = files;
        document.getElementById('live-preview-btn').classList.remove('hidden');
        document.getElementById('deploy-vercel-btn').classList.remove('hidden');
        document.getElementById('deploy-netlify-btn').classList.remove('hidden');
        const ul = document.createElement('ul');
        ul.className = 'text-sm';
        Object.keys(files).forEach(fname => {
            const li = document.createElement('li');
            li.className = 'cursor-pointer hover:bg-blue-100 rounded px-2 py-1';
            li.textContent = fname;
            li.onclick = () => {
                showCodeInMonaco(files[fname], fname.endsWith('.js') ? 'javascript' : fname.endsWith('.css') ? 'css' : fname.endsWith('.html') ? 'html' : 'plaintext');
                // Try to preview if it's HTML
                const iframe = document.getElementById('site-preview');
                if (iframe && fname.endsWith('.html')) {
                    iframe.srcdoc = files[fname];
                } else if (iframe) {
                    iframe.srcdoc = '';
                }
            };
            ul.appendChild(li);
        });
        fileTreeDiv.appendChild(ul);
    }

    document.getElementById('live-preview-btn').onclick = function() {
        if (lastReactFiles) {
            const container = document.getElementById('stackblitz-container');
            if (container) {
                container.classList.remove('hidden');
                container.style.height = '600px'; // Ensure visible
            }
            import('./stackblitz-loader.js').then(mod => {
                mod.openCustomPreview(lastReactFiles, 'stackblitz-container');
            }).catch(e => {
                console.error('Error launching custom preview:', e);
                document.getElementById('logs-output').value += '\nError launching custom preview: ' + e;
            });
        } else {
            console.warn('No React files to preview.');
        }
    };

    window.showCodeInMonaco = function(value, language = 'javascript') {
        const container = document.getElementById('monaco-container');
        if (!container) return;
        container.classList.remove('hidden'); // Ensure visible
        container.innerHTML = '';
        import('./monaco-loader.js').then(({ loadMonacoEditor }) => {
            loadMonacoEditor('monaco-container', value, language);
        }).catch((err) => {
            container.textContent = value;
            console.error('Monaco failed to load:', err);
            const logsElem = document.getElementById('logs-output');
            if (logsElem) {
                if ('value' in logsElem) {
                    logsElem.value += '\nMonaco Editor failed to load. Showing plain text.';
                } else {
                    logsElem.textContent += '\nMonaco Editor failed to load. Showing plain text.';
                }
            } else {
                console.warn("logs-output element not found in DOM. Please add an element with id='logs-output' to your HTML.");
            }
        });
    };

    // ...existing code for showFileTree, setLoading, etc...

});

// Remove all top-level DOM access outside DOMContentLoaded
// ...existing code...
