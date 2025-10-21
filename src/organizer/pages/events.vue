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

        <Column field="org" :header="$t('myFairs.columns.org')" />

        <Column field="title" :header="$t('myFairs.columns.name')" />

        <Column field="price" :header="$t('myFairs.columns.price')">
          <template #body="{ data }">
            <span class="price-text">{{ data.price }}</span>
          </template>
        </Column>

        <Column field="quantity" :header="$t('myFairs.columns.quantity')">
          <template #body="{ data }">
            <span class="quantity-text">{{ data.quantity }}</span>
          </template>
        </Column>

        <Column field="category" :header="$t('myFairs.columns.category')">
          <template #body="{ data }">
            <span class="category-text">{{ data.category.name }}</span>
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
  max-width: 80rem;
  margin: 2rem auto;
  padding: 2rem;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 1);
}

.page-title {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #1d1d1d;
}

.custom-table {
  border: 2px solid #333;
  overflow: hidden;
  font-family: "Inter", sans-serif;
}

.p-datatable .p-datatable-thead > tr > th {
  border: 2px solid #333;
  font-size: 0.95rem;
  padding: 0.9rem;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 1);
}

.p-datatable .p-datatable-tbody > tr > td {
  border: none;
  padding: 1rem;
  font-size: 0.95rem;
  color: #333;
  vertical-align: middle;
}

.p-datatable-table{
  border-collapse: separate;
  border-spacing: 10px;
}

.p-datatable .p-datatable-tbody > tr:nth-child(even) {
  background-color: #fffdf9;
}

.status-badge {
  color: #1d1d1d;
  padding: 0.35rem 0.9rem;
  font-weight: 700;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.date-text {
  font-size: 0.95rem;
}

.location-text {
  text-decoration: none;
}

.edit-btn {
  border: 2px solid #333;
  height: 38px;
  background-color: #ffcd00;
  font-size: 0.95rem;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
  font-weight: bold;
}

.edit-btn:hover {
  background-color: #fff7ed;
  border-color: #f59e0b;
  color: #f59e0b;
  cursor: pointer;
  box-shadow: 3px 3px 0 rgba(245, 158, 11, 1);
}

.event-thumb {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 1);
}
.no-image {
  font-size: 0.8rem;
  color: #999;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-style: italic;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 1);
}
</style>
