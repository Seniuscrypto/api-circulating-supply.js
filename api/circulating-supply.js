const https = require("https");

const MINT_ADDRESS = "7fj85y28pKMndm4So66Szkb5GMGfLHFEkwsZdDx2pump";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const body = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "getTokenSupply",
    params: [MINT_ADDRESS],
  });

  const options = {
    hostname: "api.mainnet-beta.solana.com",
    path: "/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    },
  };

  const data = await new Promise((resolve, reject) => {
    const req = https.request(options, (r) => {
      let raw = "";
      r.on("data", (chunk) => (raw += chunk));
      r.on("end", () => resolve(JSON.parse(raw)));
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });

  const supply = data.result.value.uiAmount;
  res.status(200).json({ circulatingSupply: supply });
};
