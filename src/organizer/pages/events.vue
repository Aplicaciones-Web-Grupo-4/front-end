<template>
  <div class="my-fairs-page">
    <h2 class="page-title">{{ $t('myFairs.title') }}</h2>

    <div class="table-container">
      <DataTable :value="fairs" class="custom-table" responsiveLayout="scroll">
        <!-- Imagen -->
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

        <!-- Columnas -->
        <Column field="org" :header="$t('myFairs.columns.org')" />
        <Column field="title" :header="$t('myFairs.columns.name')" />
        <Column field="price" :header="$t('myFairs.columns.price')" />
        <Column field="quantity" :header="$t('myFairs.columns.quantity')" />
        <Column field="category" :header="$t('myFairs.columns.category')">
          <template #body="{ data }">
            <span>{{ data.category.name || data.category }}</span>
          </template>
        </Column>
        <Column field="date" :header="$t('myFairs.columns.date')" />
        <Column field="location" :header="$t('myFairs.columns.location')" />

        <!-- Acciones -->
        <Column :header="$t('myFairs.columns.actions')">
          <template #body="{ data }">
            <Button
              :label="$t('myFairs.edit')"
              class="edit-btn"
              @click="editFair(data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Diálogo de edición -->
    <pv-dialog
      v-model:visible="showEditDialog"
      modal
      :draggable="false"
      :dismissableMask="false"
      class="dialog-custom"
    >
      <h3>{{ $t('myFairs.editDialog.title') }}</h3>
      
      <!-- Campos editables -->
      <div class="edit-form">
        <div class="org-name-container">
          <div class="field">
            <label>{{ $t('myFairs.columns.org') }}</label>
            <div class="edit-org">
              <pv-input-text v-model="selectedFair.org" />
            </div>
          </div>

          <div class="field">
            <label>{{ $t('myFairs.columns.name') }}</label>
            <div class="edit-title">
              <pv-input-text v-model="selectedFair.title" />
            </div>
          </div>
        </div>
        
        <label>{{ $t('createEvent.fields.description') }}</label>
        <div class="edit-description">
          <pv-textarea v-model="selectedFair.description" rows="3" />
        </div>

        <div class="price-quantity-category-container">
          <div class="field">
            <label>{{ $t('myFairs.columns.price') }}</label>
            <div class="edit-price">
              <pv-input-number
                v-model="selectedFair.price"
                mode="currency"
                currency="PEN"
                locale="en-US"
              />
            </div>
          </div>
          
          <div class="field">
            <label>{{ $t('myFairs.columns.quantity') }}</label>
            <div class="edit-quantity">
              <pv-input-number v-model="selectedFair.quantity" />            
            </div>
          </div>
          
          <div class="field">
            <label>{{ $t('myFairs.columns.category') }}</label>
            <div class="edit-cascade">
              <pv-cascade-select
                 v-model="selectedFair.category"  
                 :options="categories"
                 optionLabel="name" 
                 optionGroupLabel="name"
                 optionGroupChildren="subcategories"
                 placeholder="Selecciona una categoría"
                 class="category-select"
              />
            </div>
          </div>
        </div>
        
        <!-- Subir fotos -->
<div class="field">
  <label>{{ $t('createEvent.fields.photos') }}</label>
  <div class="upload-area" @dragover.prevent @drop.prevent="handleDrop">
    <i class="pi pi-images upload-icon"></i>
    <p>{{ $t('createEvent.fields.dragText') }}</p>

    <input
      type="file"
      accept="image/*"
      multiple
      @change="onFileChange"
      ref="fileInput"
      class="hidden-input"
    />

    <pv-button
      :label="$t('createEvent.buttons.selectPhotos')"
      icon="pi pi-upload"
      class="upload-button"
      @click="$refs.fileInput.click()"
    />
  </div>

  <div v-if="previewImages.length" class="preview-container">
    <div
      v-for="(img, index) in previewImages"
      :key="index"
      class="image-preview"
    >
      <img :src="img" alt="Preview" />
      <pv-button class="remove-btn" @click="removeImage(index)">
        <i class="pi pi-times"></i>
      </pv-button>
    </div>
  </div>
</div>


        <label>{{ $t('myFairs.columns.date') }}</label>
        <div class="edit-date">
          <pv-calendar
            v-model="selectedFair.dates"
            selectionMode="range"
            dateFormat="dd/mm/yy"
            placeholder="Selecciona las fechas"
          />
        </div>

        <label>{{ $t('myFairs.columns.location') }}</label>
        <div class="edit-location">
          <pv-input-text v-model="selectedFair.location" />
        </div>
      </div>

      <template #footer>

        <pv-button
          label="Save"
          icon="pi pi-check"
          class="dialog-ok"
          @click="saveEdit"
        />
      </template>
    </pv-dialog>
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
const showEditDialog = ref(false);
const selectedFair = ref({});
const previewImage = ref(null);
const fileInput = ref(null);

const categories = ref([
  { name: "Gastronomía" },
  { name: "Cultural" },
  { name: "Tecnología" },
]);

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

// === Abrir diálogo con datos del evento ===
const editFair = (fair) => {
  selectedFair.value = { ...fair }
  previewImages.value = fair.photos ? [...fair.photos] : []
  showEditDialog.value = true
}

// === Manejo de imágenes ===
const previewImages = ref([])

const onFileChange = (e) => {
  const files = Array.from(e.target.files)
  files.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      previewImages.value.push(event.target.result)
      if (!selectedFair.value.photos) selectedFair.value.photos = []
      selectedFair.value.photos.push(event.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const handleDrop = (e) => {
  const files = Array.from(e.dataTransfer.files)
  files.forEach((file) => {
    if (!selectedFair.value.photos) selectedFair.value.photos = []
    selectedFair.value.photos.push(file)
    const reader = new FileReader()
    reader.onload = (event) => previewImages.value.push(event.target.result)
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  previewImages.value.splice(index, 1)
  if (selectedFair.value.photos) {
    selectedFair.value.photos.splice(index, 1)
  }
}

// === Guardar cambios ===
const saveEdit = async () => {
  try {
    // Formatear fechas (si se usa calendario)
    if (Array.isArray(selectedFair.value.dates)) {
      selectedFair.value.date = selectedFair.value.dates
        .map((d) => new Date(d).toLocaleDateString("es-PE"))
        .join(" - ");
    }

    const res = await fetch(`${API_URL}/events/${selectedFair.value.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedFair.value),
    });

    if (!res.ok) throw new Error("Error updating fair");

    showEditDialog.value = false;
    await loadFairs(); // recargar lista
  } catch (err) {
    console.error("Error al guardar cambios:", err);
  }
};
</script>

<style scoped>
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
  box-shadow: none;
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

.dialog-custom {
  border: 2px solid #333 !important;
  background-color: #fff7ed !important;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2);
  padding: 3rem;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin-top: 1rem;
}

.preview-container {
  margin-top: 0.5rem;
}

.image-preview {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 1);
}

.hidden-input {
  display: none;
}

.dialog-ok {
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2);
  background-color: #ffcd00;
  font-weight: bold;
}

.dialog-ok:hover {
  background-color: #fff7ed;
  border-color: #f59e0b;
  color: #f59e0b;
  box-shadow: none;
  cursor: pointer;
}

.dialog-cancel {
  border: 2px solid #333;
  background-color: #d32f2f;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2);
  color: white;
  font-weight: bold;
  margin-right: 1rem;
}

.dialog-cancel:hover {
  background-color: #fff7ed;
  color: #d32f2f;
  border-color: #d32f2f;
  box-shadow: none;
  cursor: pointer;
}

.org-name-container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
}

.org-name-container .field {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.price-quantity-category-container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
}

/*cada subtitulo arriba del field*/ 
.price-quantity-category-container .field {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.upload-area {
  border: 2px dashed #ccc;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s;
  background-color: #fafafa;
  font-size: 15px;
  
}

.upload-area:hover {
  border-color: #fac738;
  background-color: #fff8e1;
}

.upload-icon {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.upload-button {
  border: 2px solid #333;
  height: 20px;
  font-weight: bold;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
  background-color: #ffcd00;
  margin-top: 0.5rem;
}

.upload-button:hover {
  background-color: #fff7ed;
  border-color: #f59e0b;
  color: #f59e0b;
  cursor: pointer;
  box-shadow: none;
}

.hidden-input {
  display: none;
}

.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.image-preview {
  position: relative;
  width: 60px;
  height: 60px;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}


:deep(.edit-cascade .p-cascadeselect){
  display: flex !important;
  align-items: center !important;
  width: 100% !important;
  border: 2px solid #333 !important;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2) !important;
  background-color: #fff !important;
  height: 22px !important;
  position: relative !important;
}

:deep(.edit-org .p-inputtext){
  display: flex !important;
  align-items: center !important;
  width: 100% !important;
  border: 2px solid #333 !important;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2) !important;
  background-color: #fff !important;
  height: 20px !important;
  position: relative !important;
}

:deep(.edit-title .p-inputtext){
  display: flex !important;
  align-items: center !important;
  width: 100% !important;
  border: 2px solid #333 !important;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2) !important;
  background-color: #fff !important;
  height: 20px !important;
  position: relative !important;
}

:deep(.edit-description .p-inputtext){
  display: flex !important;
  align-items: center !important;
  width: 100% !important;
  border: 2px solid #333 !important;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2) !important;
  background-color: #fff !important;
  height: 20px !important;
  position: relative !important;
  font-family: 'Inter', sans-serif;
}

:deep(.edit-price .p-inputnumber-input){
  display: flex !important;
  align-items: center !important;
  width: 100% !important;
  border: 2px solid #333 !important;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2) !important;
  background-color: #fff !important;
  height: 20px !important;
  position: relative !important;
}

:deep(.edit-quantity .p-inputnumber-input){
  display: flex !important;
  align-items: center !important;
  width: 100% !important;
  border: 2px solid #333 !important;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2) !important;
  background-color: #fff !important;
  height: 20px !important;
  position: relative !important;
}

:deep(.edit-date .p-inputtext){
  display: flex !important;
  align-items: center !important;
  width: 100% !important;
  border: 2px solid #333 !important;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2) !important;
  background-color: #fff !important;
  height: 20px !important;
  position: relative !important;
} 

:deep(.edit-location .p-inputtext){
  display: flex !important;
  align-items: center !important;
  width: 100% !important;
  border: 2px solid #333 !important;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2) !important;
  background-color: #fff !important;
  height: 20px !important;
  position: relative !important;
} 

</style>