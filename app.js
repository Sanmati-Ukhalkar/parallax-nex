const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Decode URL to handle spaces and special chars
    let decodedUrl;
    try {
        decodedUrl = decodeURIComponent(req.url);
    } catch (e) {
        decodedUrl = req.url;
    }

    // Strip query parameters and hash fragments
    const parsedUrl = new URL(decodedUrl, 'http://localhost');
    let filePath = path.join(__dirname, parsedUrl.pathname);

    // Security check: prevent directory traversal
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        return res.end('Forbidden');
    }

    // Helper to serve a file
    const serveFile = (fileToServe, mimeType) => {
        fs.stat(fileToServe, (err, stats) => {
            if (err || !stats.isFile()) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end('Not Found');
            }

            res.writeHead(200, {
                'Content-Type': mimeType,
                'Content-Length': stats.size
            });
            const stream = fs.createReadStream(fileToServe);
            stream.pipe(res);
        });
    };

    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
            serveFile(filePath, 'text/html');
        } else if (!err && stats.isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
            serveFile(filePath, mimeType);
        } else {
            // File not found. Check if it's a SPA route (no extension)
            const ext = path.extname(parsedUrl.pathname);
            if (!ext) {
                const spaIndex = path.join(__dirname, 'index.html');
                serveFile(spaIndex, 'text/html');
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
