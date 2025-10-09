<template>
  <div class="my-fairs-page">
    <h2 class="page-title">{{ $t('myFairs.title') }}</h2>

    <div class="table-container">
      <DataTable :value="fairs" class="custom-table" responsiveLayout="scroll">
        <Column :header="$t('myFairs.columns.image')" style="width: 120px">
          <template #body="{ data }">
            <img
                v-if="data.photos && data.photos.length"
                :src="data.photos[0]"
                alt="Evento"
                class="event-thumb"
            />
            <div v-else class="no-image">{{ $t('myFairs.noImage') }}</div>
          </template>
        </Column>

        <Column field="title" :header="$t('myFairs.columns.name')" />

        <Column :header="$t('myFairs.columns.status')">
          <template #body="{ data }">
            <span class="status-badge">{{ data.status }}</span>
          </template>
        </Column>

        <Column field="date" :header="$t('myFairs.columns.date')">
          <template #body="{ data }">
            <span class="date-text">{{ data.date }}</span>
          </template>
        </Column>

        <Column field="location" :header="$t('myFairs.columns.location')">
          <template #body="{ data }">
            <span class="location-text">{{ data.location }}</span>
          </template>
        </Column>

        <Column :header="$t('myFairs.columns.actions')">
          <template #body="{ data }">
            <Button
                :label="$t('myFairs.edit')"
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
import { useI18n } from "vue-i18n";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

const { t } = useI18n();

const API_URL = import.meta.env.VITE_API_URL || "https://db-server-1-66zf.onrender.com";

const fairs = ref([]);

const loadFairs = async () => {
  try {
    const res = await fetch(`${API_URL}/events`);
    if (!res.ok) throw new Error(t("myFairs.errors.load"));
    fairs.value = await res.json();
  } catch (err) {
    console.error("Error al cargar eventos:", err);
  }
};

onMounted(loadFairs);
onActivated(loadFairs);

const editFair = (fair) => {
  console.log("Editar feria:", fair.title);
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

.date-text {
  color: #d19700;
  font-weight: 600;
}

.location-text {
  color: #007b83;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}
.location-text:hover {
  text-decoration: underline;
}

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
