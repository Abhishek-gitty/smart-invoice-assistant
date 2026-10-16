
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const MODEL = "qwen2.5:3b";

const files = {
    "/": ["index.html", "text/html"],
    "/index.html": ["index.html", "text/html"],
    "/style.css": ["style.css", "text/css"],
    "/script.js": ["script.js", "application/javascript"]
};

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    if (req.method === "POST" && req.url === "/analyze") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", async () => {
            try {
                const data = JSON.parse(body);

                if (!data.invoice || !data.invoice.trim()) {
                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });
                    res.end(JSON.stringify({
                        error: "Please enter invoice text."
                    }));
                    return;
                }

                const response = await fetch(
                    "http://127.0.0.1:11434/api/generate",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            model: MODEL,
                            stream: false,
                            prompt: `Extract invoice details from the text below.
Return the result with these fields:
Client name, Invoice number, Amount, Currency, Due date.
If a field is missing, write "Not provided".
Do not invent missing details.

Invoice text:
${data.invoice}`
                        })
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.error || "Local AI request failed."
                    );
                }

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    result: result.response
                }));

            } catch (error) {
                res.writeHead(500, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    error: error.message
                }));
            }
        });

        return;
    }

    const file = files[req.url];

    if (req.method !== "GET" || !file) {
        res.writeHead(404);
        res.end("Not found");
        return;
    }

    fs.readFile(path.join(__dirname, file[0]), (error, content) => {
        if (error) {
            res.writeHead(500);
            res.end("Could not load file");
            return;
        }

        res.writeHead(200, {
            "Content-Type": file[1] + "; charset=utf-8"
        });

        res.end(content);
    });
});

server.listen(PORT, "127.0.0.1", () => {
    console.log(`Smart Invoice Assistant: http://localhost:${PORT}`);
});
