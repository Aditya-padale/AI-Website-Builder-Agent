// custom-preview-loader.js
// Custom preview loader for HTML/CSS/JS (CodePan style)

export function openCustomPreview(files, containerId) {
    const html = files['index.html'] || files['public/index.html'] || '';
    const css = `<style>${files['style.css'] || files['src/index.css'] || ''}</style>`;
    let jsContent = files['script.js'] || files['src/index.js'] || '';

    // Stronger check for import/export (multiline, any position)
    if (/import\s.+from\s+['"].+['"]|export\s+(default|function|const|let|var|class)/s.test(jsContent)) {
        jsContent = '';
        setTimeout(() => {
            alert('Error: import/export statements are not supported in this preview. Please use only plain JS.');
        }, 100);
    }
    const js = jsContent ? `<script>${jsContent}<\/script>` : '';

    const fullHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            ${css}
        </head>
        <body>
            ${html}
            ${js}
        </body>
        </html>
    `;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.width = '100%';
    iframe.height = '600px';
    iframe.style.border = '1px solid #ccc';

    const container = document.getElementById(containerId);
    container.innerHTML = '';
    container.appendChild(iframe);
}
