const { Connection, PublicKey } = require('@solana/web3.js');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  res.setHeader('Content-Type', 'application/json');

  const mintAddress = '7fj85y28pkmndm4so66szkb5gmgflhfekwszdddx2pump';

  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
    const mint = new PublicKey(mintAddress);
    const supplyInfo = await connection.getTokenSupply(mint);

    let circulating = supplyInfo.value.uiAmount;
    if (circulating == null) {
      const decimals = supplyInfo.value.decimals;
      circulating = Number(supplyInfo.value.amount) / (10 ** decimals);
    }

    res.status(200).json({ circulatingSupply: circulating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch supply' });
  }
};
