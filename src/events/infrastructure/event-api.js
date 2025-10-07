// events/infrastructure/event-api.js
export async function fetchEventBySlug(slug) {
    // mock: en real harías fetch a tu backend
    const dto = {
        id: "feria-artesania-gastronomia",
        slug,
        title: "Feria de Artesanía y Gastronomía",
        cover: "/src/assets/mock/event-cover.jpg",
        description:
            "Descubre la Feria de Artesanía y Gastronomía, un evento vibrante que celebra la riqueza cultural de Lima.",
        days: ["Sábado: 10:00 AM – 8:00 PM", "Domingo: 10:00 AM – 6:00 PM"],
        locationText: "Lima, Perú",
        locationLat: -12.0621,
        locationLng: -77.0365,
        stands: [
            { id: "stand-1", name: "Artesanías del Perú", image: "/src/assets/mock/stands/stand1.jpg" },
            { id: "stand-2", name: "Sabores Andinos",      image: "/src/assets/mock/stands/stand2.jpg" },
            { id: "stand-3", name: "Textiles Milenarios",   image: "/src/assets/mock/stands/stand3.jpg" },
            { id: "stand-4", name: "Cerámica Inka",         image: "/src/assets/mock/stands/stand4.jpg" },
        ],
    };

    // Simula latencia
    await new Promise(r => setTimeout(r, 300));
    return dto;
}
