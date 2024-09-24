import { log } from "node:console";
import http from "node:http";
import formidable from "formidable";
import path from "node:path";
import fs from "node:fs";
const PORT = 3000;

const mimeTypes = {
    '.css':"text/css",
    '.js':"text/javascript",
    '.png':"image/png",
    '.jpeg':"image/jpeg",
    '.jpg':"image/jpg",
}

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if(method === "GET")
    {
        res.write(
            fs.readFileSync(
                path.join(import.meta.dirname, "public", "pages", "index.html")
            )
        );
        res.end();
    }
    else if (method === 'POST') {
        const form = formidable();
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Invalid form data' }));
        }
        log('Received data:', fields);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(fields));
    });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end(`${method} is not allowed.`);
    }
})
server.listen(3000, () => {
    log(`Server is running http://localhost:${PORT}`)
})