const MINT_ADDRESS = "7fj85y28pKMndm4So66Szkb5GMGfLHFEkwsZdDx2pump";
const RPC_URL = "https://api.mainnet-beta.solana.com";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

  try {
    const response = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenSupply",
        params: [MINT_ADDRESS],
      }),
    });

    const data = await response.json();
    const supply = data.result.value.uiAmount;
    res.status(200).send(supply.toString());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
