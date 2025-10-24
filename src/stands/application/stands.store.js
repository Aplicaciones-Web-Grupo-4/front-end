import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { StandsApi } from '../infrastructure/stands-api.js';
import { StandAssembler } from '../infrastructure/stands.assembler.js';
import { FairAssembler } from '../infrastructure/fair.assembler.js';
import { Stand } from '../domain/model/stand.entity.js';

const api = new StandsApi();

export const useStandsStore = defineStore('stands', () => {
    const stands = ref(/** @type {Stand[]} */([]));
    const fairs  = ref([]);
    const loading = ref(false);
    const errors  = ref([]);

    const count = computed(() => stands.value.length);
    
    async function fetchFairs() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL || "https://db-server-1-66zf.onrender.com"}/events`);
    if (!res.ok) throw new Error("Error al cargar ferias (eventos)");
    const data = await res.json();

    // Mapea los datos para que cada feria tenga un id y un título
    fairs.value = data.map((f, index) => ({
      id: f.id ?? index + 1, // por si el backend no devuelve ID
      title: f.title || f.org || "Sin nombre",
      org: f.org,
      category: f.category?.name,
    }));
  } catch (e) {
    console.error("Error cargando ferias:", e);
    errors.value.push(e);
  }
}


    async function fetchStands() {
        loading.value = true;
        try {
            const resp = await api.getStands();
            stands.value = StandAssembler.toEntities(resp);
        } catch (e) { errors.value.push(e); }
        finally { loading.value = false; }
    }

    function getById(id){ return stands.value.find(s => s.id === +id); }

    // ===== Helpers para code/fair =====
    function letterForFairId(fairId) {
        const A = 'A'.charCodeAt(0);
        return (typeof fairId === 'number' && fairId > 0 && fairId < 27)
            ? String.fromCharCode(A + (fairId - 1))
            : 'S';
    }
    function nextNumberForFair(fairId) {
        const nums = stands.value
            .filter(s => s.fairId === fairId && typeof s.code === 'string')
            .map(s => {
                const m = s.code.match(/\d+/);
                return m ? Number(m[0]) : 0;
            });
        const max = nums.length ? Math.max(...nums) : 0;
        return max + 1;
    }
    function inferFairIdByCategory(category) {
        const matches = stands.value.filter(s => s.category === category);
        if (!matches.length) return null;
        const freq = matches.reduce((acc, s) => {
            acc[s.fairId] = (acc[s.fairId] || 0) + 1;
            return acc;
        }, {});
        return Number(Object.entries(freq).sort((a,b) => b[1]-a[1])[0][0]);
    }

    // ===== ADD: genera code siempre =====
    async function add(partial) {
        try {
            const fairId = partial.fairId ?? null;
            const code = `${letterForFairId(fairId)}${nextNumberForFair(fairId)}`;
            const newStand = {
                id: null, // lo asigna json-server
                name: partial.name?.trim() ?? '',
                category: partial.category ?? '',
                fairId,
                code
            };
            const resp = await api.createStand(StandAssembler.toResource(newStand));
            const created = StandAssembler.toEntity(resp.data);
            stands.value.push(created);
        } catch (e) { errors.value.push(e); }
    }

    // ===== UPDATE: conserva code si no cambia la feria; si cambia, regenera =====
    async function update(partial) {
        try {
            const current = getById(partial.id);
            if (!current) throw new Error('Registro no encontrado');

            // ¿Cambió la categoría? → podemos inferir feria
            let targetFairId = partial.fairId ?? current.fairId;
            if (typeof partial.category === 'string' && partial.category !== current.category) {
                const inferred = inferFairIdByCategory(partial.category);
                if (inferred) targetFairId = inferred;
            }

            // Code: si la feria no cambia, se mantiene; si cambia, se regenera
            const fairChanged = targetFairId !== current.fairId;
            const targetCode = fairChanged
                ? `${letterForFairId(targetFairId)}${nextNumberForFair(targetFairId)}`
                : current.code;

            const payload = {
                ...current,                 // asegura enviar todos los campos
                ...partial,                 // aplica cambios de nombre/categoría
                fairId: targetFairId,
                code: targetCode
            };

            const resp = await api.updateStand(StandAssembler.toResource(payload)); // PUT, recurso completo
            const updated = StandAssembler.toEntity(resp.data);
            const idx = stands.value.findIndex(s => s.id === updated.id);
            if (idx !== -1) stands.value[idx] = updated;
        } catch (e) { errors.value.push(e); }
    }

    async function remove(stand) {
        try {
            await api.deleteStand(stand.id);
            const idx = stands.value.findIndex(s => s.id === stand.id);
            if (idx !== -1) stands.value.splice(idx, 1);
        } catch (e) { errors.value.push(e); }
    }

    return { stands, fairs, loading, errors, count, fetchStands, fetchFairs, add, update, remove, getById };
});
