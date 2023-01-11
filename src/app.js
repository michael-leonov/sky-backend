import * as http from "http";
import "dotenv/config";
import getUsers from "./modules/users";

const HOST_NAME = process.env.HOST_NAME || "http://127.0.0.1";
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url === "/users") {
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.setHeader = "Content-Type: application/json";
    res.write(getUsers());
    res.end();

    return;
  }

  res.statusCode = 200;
  res.statusMessage = "OK";
  res.setHeader = "Content-Type: text/plain";
  res.write("Hello World!");
  res.end();
});

server.listen(PORT, () =>
  console.log(`Server start on http://${HOST_NAME}:${PORT}/`)
);
