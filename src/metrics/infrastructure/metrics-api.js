export class MetricsApi {
  baseUrl = import.meta.env.VITE_API_URL || "https://db-server-1-66zf.onrender.com";

  async registerAction(eventId, action) {
    try {
      const res = await fetch(`${this.baseUrl}/metrics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: Number(eventId),
          action,
          timestamp: new Date().toISOString()
        })
      });

      if (!res.ok) {
        console.error("❌ Error al registrar métrica:", res.statusText);
      } else {
        console.log(`✅ ${action.toUpperCase()} registrada para evento ${eventId}`);
      }
    } catch (e) {
      console.error("Error en MetricsApi.registerAction:", e);
    }
  }

  async getAll() {
    const res = await fetch(`${this.baseUrl}/metrics`);
    return res.json();
  }
}
