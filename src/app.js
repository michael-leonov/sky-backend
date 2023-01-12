import * as http from "http";
import "dotenv/config";
import getUsers from "./modules/users";

const host = "http://127.0.0.1";
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, host);

  res.setHeader("Content-Type", "text/plain");

  if (url.search.startsWith("?hello")) {
    const name = url.searchParams.get("hello");

    if (name) {
      res.statusCode = 200;
      res.statusMessage = "OK";
      res.write(`Hello, ${name}`);
      res.end();

      return;
    }

    res.statusCode = 400;
    res.statusMessage = "Bad request";
    res.write("Enter a name");
    res.end();

    return;
  }

  if (url.search.startsWith("?users")) {
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.setHeader("Content-Type", "application/json");
    res.write(getUsers());
    res.end();

    return;
  }

  if (url.search === "") {
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.write("Hello World");
    res.end();

    return;
  }

  res.statusCode = 500;
  res.statusMessage = "Server error";
  res.setHeader("Content-Type", "text/plain");
  res.write("");
  res.end();
});

server.listen(PORT, () =>
  console.log(`Server start on http://${host}:${PORT}/`)
);
