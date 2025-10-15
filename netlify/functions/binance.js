export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body || "{}");

    const resp = await fetch("https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      return {
        statusCode: resp.status,
        body: JSON.stringify({ error: "Error al obtener datos de Binance" }),
      };
    }

    const data = await resp.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
