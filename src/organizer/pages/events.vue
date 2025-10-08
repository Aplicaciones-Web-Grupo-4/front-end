<template>
  <div class="my-fairs-page">
    <h2 class="page-title">Mis ferias publicadas</h2>

    <div class="table-container">
      <DataTable :value="fairs" class="custom-table" responsiveLayout="scroll">
        <!-- 📷 Imagen -->
        <Column header="Imagen" style="width: 120px">
          <template #body="{ data }">
            <img
                v-if="data.photos && data.photos.length"
                :src="data.photos[0]"
                alt="Evento"
                class="event-thumb"
            />
            <div v-else class="no-image">Sin imagen</div>
          </template>
        </Column>

        <!-- 🏷️ Nombre -->
        <Column field="title" header="Nombre"></Column>

        <!-- 🔸 Estado -->
        <Column header="Estado">
          <template #body="{ data }">
            <span class="status-badge">{{ data.status }}</span>
          </template>
        </Column>

        <!-- 📅 Fecha -->
        <Column field="date" header="Fecha">
          <template #body="{ data }">
            <span class="date-text">{{ data.date }}</span>
          </template>
        </Column>

        <!-- 📍 Ubicación -->
        <Column field="location" header="Ubicación">
          <template #body="{ data }">
            <span class="location-text">{{ data.location }}</span>
          </template>
        </Column>

        <!-- ⚙️ Acciones -->
        <Column header="Acciones">
          <template #body="{ data }">
            <Button
                label="Editar"
                text
                class="edit-btn"
                @click="editFair(data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

// 🌐 Estado reactivo
const fairs = ref([]);

// 📡 Cargar los eventos desde db.json
const loadFairs = async () => {
  try {
    const res = await fetch("http://localhost:3001/events");
    if (!res.ok) throw new Error("Error al cargar eventos");
    fairs.value = await res.json();
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

// 🔁 Cargar al entrar y al volver desde otra vista
onMounted(loadFairs);
onActivated(loadFairs);

const editFair = (fair) => {
  console.log("Editar feria:", fair.title);
  // aquí podrías hacer router.push(`/org/events/edit/${fair.id}`)
};
</script>

<style>
.my-fairs-page {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fffaf3; /* Fondo cálido */
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.page-title {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #1d1d1d;
}

/* 📋 Tabla */
.custom-table {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  font-family: "Inter", sans-serif;
  border: 1px solid #f0e6d8;
}

.p-datatable .p-datatable-thead > tr > th {
  background-color: #fff6e6;
  color: #1d1d1d;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 1rem;
  border: none;
}

.p-datatable .p-datatable-tbody > tr > td {
  border: none;
  padding: 1rem;
  font-size: 0.95rem;
  color: #333;
  vertical-align: middle;
}

.p-datatable .p-datatable-tbody > tr:nth-child(even) {
  background-color: #fffdf9;
}

/* 🟡 Estado */
.status-badge {
  background-color: #fff4d6;
  color: #1d1d1d;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

/* 🗓️ Fecha */
.date-text {
  color: #d19700;
  font-weight: 600;
}

/* 📍 Ubicación */
.location-text {
  color: #007b83;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}
.location-text:hover {
  text-decoration: underline;
}

/* ✏️ Botón Editar */
.edit-btn {
  color: #111 !important;
  font-weight: 700 !important;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s;
}
.edit-btn:hover {
  color: #d19700 !important;
}

/* 🖼️ Miniatura */
.event-thumb {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #eee;
}
.no-image {
  font-size: 0.8rem;
  color: #999;
  font-style: italic;
}
</style>
