const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
    // First Solution

    // const file = fs.createReadStream("./text.txt");
    // file.on("data", (chunck) => {
    //     res.write(chunck);
    // });
    // file.on("end", () => {
    //     res.end();
    // });
    // file.on("error", (err) => {
    //     res.statusCode(500);
    //     res.end(err);
    // });

    // Second Solution

    const file = fs.createReadStream("./text.txt");
    file.pipe(res);

    // With this solution we don't have Backpressure problem anymore !!!
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Server Is Running...");
});
