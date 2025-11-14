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
        <Column field="organizer" :header="$t('myFairs.columns.org')" />
        <Column field="title" :header="$t('myFairs.columns.name')" />
        <Column field="price" :header="$t('myFairs.columns.price')" />
        <Column field="quantity" :header="$t('myFairs.columns.quantity')" />
        <Column field="category" :header="$t('myFairs.columns.category')">
          <template #body="{ data }">
            <span>{{ data.category.name || data.category }}</span>
          </template>
        </Column>
        <Column :header="$t('myFairs.columns.date')">  
          <template #body="{ data }">  
            <span>{{ formatDateRange(data.dates) }}</span>  
          </template>
        </Column>
        <Column field="location" :header="$t('myFairs.columns.location')" />

        <!-- Acciones -->
        <Column :header="$t('myFairs.columns.actions')">
          <template #body="{ data }">
            <div class="actions-container">

              <Button
                :label="$t('myFairs.edit')"
                class="edit-btn"
                @click="editFair(data)"
              />
  
              <Button
                :label="$t('myFairs.delete')"
                class="delete-btn"
                @click="deleteFair(data)"
              />
            </div>
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
              <pv-dropdown  
                v-model="selectedFair.category"
                :options="categories"
                optionLabel="name"
                optionValue="name"
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
import { ref, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Button from "primevue/button"

const { t } = useI18n()

// // ✅ Conexión al backend real
// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5038/api"

// const fairs = ref([])
// const showEditDialog = ref(false)
// const selectedFair = ref({})
// const previewImages = ref([])
// const fileInput = ref(null)

// // 📚 Categorías (solo referencia visual)
// const categories = [
//   { name: 'Gastronomía' },
//   { name: 'Cultural' },
//   { name: 'Tecnología' },
//   { name: 'Arte y Diseño' },
//   { name: 'Moda y Belleza' },
//   { name: 'Música y Conciertos' },
//   { name: 'Deportes y Aventura' },
//   { name: 'Emprendimiento' },
//   { name: 'Educación y Capacitación' },
//   { name: 'Salud y Bienestar' },
//   { name: 'Medio Ambiente' },
//   { name: 'Gaming y Esports' },
//   { name: 'Fotografía y Cine' },
//   { name: 'Ciencia e Innovación' },
//   { name: 'Literatura' },
//   { name: 'Mascotas' },
//   { name: 'Viajes y Turismo' },
//   { name: 'Autos y Motos' },
//   { name: 'Infantil y Familiar' },
//   { name: 'Networking y Negocios' }
// ];

// /* =======================================================
//    🔄 Cargar eventos desde tu API .NET
// ======================================================= */
// const loadFairs = async () => {
//   try {
//     const res = await fetch(`${API_URL}/events`);
//     if (!res.ok) throw new Error("Error al cargar los eventos");

//     const data = await res.json();

//     fairs.value = data.map((event) => ({
//       id: event.id,
//       organizer: event.organizer,
//       title: event.title,
//       description: event.description,
//       price: event.price,
//       quantity: event.quantity,
//       category: event.category,
//       address: event.address,
//       location: event.location,
//       photos: event.photos || [],
//       // ✅ Ahora tomamos las fechas correctamente
//       dates: event.dateRange
//         ? [new Date(event.dateRange.startDate), new Date(event.dateRange.endDate)]
//         : [],
//     }));
//   } catch (err) {
//     console.error("❌ Error al cargar ferias:", err);
//   }
// };

// onMounted(loadFairs)

// /* =======================================================
//    ✏️ Abrir diálogo de edición
// ======================================================= */
// const editFair = (fair) => {
//   selectedFair.value = { ...fair }
//   previewImages.value = fair.photos ? [...fair.photos] : []
//   showEditDialog.value = true
// }

// /* =======================================================
//    🖼️ Manejo de imágenes
// ======================================================= */
// const onFileChange = (e) => {
//   const files = Array.from(e.target.files)
//   files.forEach((file) => {
//     const reader = new FileReader()
//     reader.onload = (event) => {
//       previewImages.value.push(event.target.result)
//       if (!selectedFair.value.photos) selectedFair.value.photos = []
//       selectedFair.value.photos.push(event.target.result)
//     }
//     reader.readAsDataURL(file)
//   })
// }

// const handleDrop = (e) => {
//   const files = Array.from(e.dataTransfer.files)
//   files.forEach((file) => {
//     const reader = new FileReader()
//     reader.onload = (event) => {
//       previewImages.value.push(event.target.result)
//       if (!selectedFair.value.photos) selectedFair.value.photos = []
//       selectedFair.value.photos.push(event.target.result)
//     }
//     reader.readAsDataURL(file)
//   })
// }

// const removeImage = (index) => {
//   previewImages.value.splice(index, 1)
//   if (selectedFair.value.photos) selectedFair.value.photos.splice(index, 1)
// }

// /* =======================================================
//    💾 Guardar cambios (PUT /api/events/{id})
// ======================================================= */
// const saveEdit = async () => {
//   try {
//     const payload = { ...selectedFair.value };

//     // ----------------------------
//     // 🔥 1. Convertir fechas a formato backend
//     // ----------------------------
//     if (
//       Array.isArray(payload.dates) &&
//       payload.dates.length === 2 &&
//       payload.dates[0] &&
//       payload.dates[1]
//     ) {
//       payload.dateRange = {
//         startDate: new Date(payload.dates[0]).toISOString(),
//         endDate: new Date(payload.dates[1]).toISOString(),
//       };
//     }

//     delete payload.dates;

//     // ----------------------------
//     // 🔥 2. Convertir category a STRING si viene como objeto
//     // ----------------------------
//     if (typeof payload.category === "object" && payload.category !== null) {
//       payload.category = payload.category.name;
//     }

//     // ----------------------------
//     // 🔥 3. Convertir location a STRING si viene como objeto
//     // ----------------------------
//     if (typeof payload.location === "object" && payload.location !== null) {
//       payload.location = JSON.stringify(payload.location); 
//       // Si tu backend solo quiere una dirección:
//       // payload.location = `${payload.location.lat}, ${payload.location.lng}`
//     }

//     // ----------------------------
//     // PUT al backend .NET
//     // ----------------------------
//     const res = await fetch(`${API_URL}/events/${payload.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) throw new Error("Error updating fair");

//     showEditDialog.value = false;
//     await loadFairs();

//   } catch (err) {
//     console.error("❌ Error al guardar cambios:", err);
//   }
// };

// const formatDateRange = (dates) => {
//   if (!Array.isArray(dates) || dates.length !== 2) return "";

//   const format = (d) => {
//     const date = new Date(d);
//     return date.toLocaleDateString("es-PE", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//   };

//   return `${format(dates[0])} - ${format(dates[1])}`;
// };

// const deleteFair = async (fair) => {
//   try {
//     const res = await fetch(`${API_URL}/manage/events/${fair.id}`, {
//       method: "DELETE"
//     });

//     if (!res.ok) throw new Error("Error deleting fair");

//     await loadFairs();
//   } catch (err) {
//     console.error("❌ Error:", err);
//   }
// };

const API_URL = "https://db-server-1-66zf.onrender.com"

const fairs = ref([])
const showEditDialog = ref(false)
const selectedFair = ref({})
const previewImages = ref([])
const fileInput = ref(null)

// Categorías
const categories = [
  { name: 'Gastronomía' }, { name: 'Cultural' }, { name: 'Tecnología' },
  { name: 'Arte y Diseño' }, { name: 'Moda y Belleza' },
  { name: 'Música y Conciertos' }, { name: 'Deportes y Aventura' },
  { name: 'Emprendimiento' }, { name: 'Educación y Capacitación' },
  { name: 'Salud y Bienestar' }, { name: 'Medio Ambiente' },
  { name: 'Gaming y Esports' }, { name: 'Fotografía y Cine' },
  { name: 'Ciencia e Innovación' }, { name: 'Literatura' },
  { name: 'Mascotas' }, { name: 'Viajes y Turismo' },
  { name: 'Autos y Motos' }, { name: 'Infantil y Familiar' },
  { name: 'Networking y Negocios' }
]

/* =======================================================
   🔄 Cargar eventos desde JSON Server
======================================================= */
const loadFairs = async () => {
  try {
    const res = await fetch(`${API_URL}/events`)
    const data = await res.json()

    fairs.value = data.map((event) => ({
      ...event,
      dates: event.startDate && event.endDate
        ? [new Date(event.startDate), new Date(event.endDate)]
        : []
    }))
  } catch (err) {
    console.error("❌ Error al cargar:", err)
  }
}

onMounted(loadFairs)

/* =======================================================
   ✏️ Abrir diálogo para editar
======================================================= */
const editFair = (fair) => {
  selectedFair.value = { ...fair }
  previewImages.value = fair.photos ? [...fair.photos] : []
  showEditDialog.value = true
}

/* =======================================================
   🖼️ Manejo de imágenes
======================================================= */
const onFileChange = (e) => {
  const files = Array.from(e.target.files)
  files.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (ev) => {
      previewImages.value.push(ev.target.result)
      if (!selectedFair.value.photos) selectedFair.value.photos = []
      selectedFair.value.photos.push(ev.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const handleDrop = (e) => {
  const files = Array.from(e.dataTransfer.files)
  files.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (ev) => {
      previewImages.value.push(ev.target.result)
      if (!selectedFair.value.photos) selectedFair.value.photos = []
      selectedFair.value.photos.push(ev.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  previewImages.value.splice(index, 1)
  if (selectedFair.value.photos) selectedFair.value.photos.splice(index, 1)
}

/* =======================================================
   💾 Guardar edición (PUT /events/:id)
======================================================= */
const saveEdit = async () => {
  try {
    const payload = { ...selectedFair.value }

    // Convertir fechas para JSON Server
    if (Array.isArray(payload.dates) && payload.dates.length === 2) {
      payload.startDate = new Date(payload.dates[0]).toISOString()
      payload.endDate = new Date(payload.dates[1]).toISOString()
    }

    delete payload.dates

    // Asegurar que category sea string
    if (typeof payload.category === "object") {
      payload.category = payload.category.name
    }

    const res = await fetch(`${API_URL}/events/${payload.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error("Error al guardar cambios")

    showEditDialog.value = false
    await loadFairs()

  } catch (err) {
    console.error("❌ Error:", err)
  }
}

/* =======================================================
   🗑️ Eliminar feria (DELETE /events/:id)
======================================================= */
const deleteFair = async (fair) => {
  try {
    const res = await fetch(`${API_URL}/events/${fair.id}`, {
      method: "DELETE"
    })

    if (!res.ok) throw new Error("Error eliminando evento")

    await loadFairs()
  } catch (err) {
    console.error("❌ Error:", err)
  }
}

/* =======================================================
   📅 Mostrar rango de fechas
======================================================= */
const formatDateRange = (dates) => {
  if (!Array.isArray(dates) || dates.length !== 2) return ""
  const format = (d) =>
    new Date(d).toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })
  return `${format(dates[0])} - ${format(dates[1])}`
}
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

.delete-btn {
  border: 2px solid #333;
  height: 38px;
  background-color: #d32f2f;
  font-size: 0.95rem;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
  font-weight: bold;
}

.delete-btn:hover {
  background-color: #fff7ed;
  color: #d32f2f;
  border-color: #d32f2f;
  cursor: pointer;
  box-shadow: none;
}

.actions-container {
  display: flex;
  gap: 0.5rem;
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


:deep(.edit-cascade .p-dropdown){
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