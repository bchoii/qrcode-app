import http from "node:http";
import QRCode from "qrcode";

async function run() {
  const server = http.createServer(async (req, res) => {
    console.log(req.url);
    if (!req.url) {
      res.writeHead(404);
      return res.end();
    }

    const code = req.url.slice(1);
    if (!code) {
      res.writeHead(404);
      return res.end();
    }

    const result = await QRCode.toBuffer(code, {
      errorCorrectionLevel: "H",
      type: "png",
    });
    res.writeHead(200, { "Content-Type": "image/png" });
    res.write(result);
    // res.writeHead(200, { "Content-Type": "text/plain" });
    // res.write("Hello World!");
    res.end();
  });

  // 5. Start listening a server on 4000 port
  const port = 4000;
  server.listen(port, () =>
    console.log(`Server running at http://localhost:${port}/`)
  );
}

run();
