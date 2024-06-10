const http = require("http");
const fs = require("fs");

// ---------- Read Data ------------------
const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
// ---------- Create Server --------------
const server = http.createServer((req, res) => {
    if (req.url === "/api") {
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(data);
    } else {
        res.end("Page Not Found !");
    }
});

// ---------- Listen Server --------------

server.listen("8000", "127.0.0.1", () => {
    console.log("Running...");
});
