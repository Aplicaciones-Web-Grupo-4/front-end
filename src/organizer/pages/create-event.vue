<template>
  <div class="create-event-page">
    <h1 class="page-title">{{ $t('createEvent.titlePage') }}</h1>

    <div class="form-container">
      <!-- Nombre del organizador -->
      <div class="field">
        <label for="org">{{ $t('createEvent.fields.orgName') }}</label>
        <pv-input-text
          id="org"
          class="org-form"
          v-model="form.org"
          :placeholder="$t('createEvent.fields.orgPlaceholder')"
        />
      </div>

      <!-- Título -->
      <div class="field">
        <label for="title">{{ $t('createEvent.fields.title') }}</label>
        <pv-input-text
          id="title"
          class="title-form"
          v-model="form.title"
          :placeholder="$t('createEvent.fields.titlePlaceholder')"
        />
      </div>

      <!-- Descripción -->
      <div class="field">
        <label for="description">{{ $t('createEvent.fields.description') }}</label>
        <pv-textarea
          id="description"
          class="description-form"
          v-model="form.description"
          rows="4"
          :placeholder="$t('createEvent.fields.descriptionPlaceholder')"
          autoResize
        />
      </div>

      <!-- Precio / Cantidad / Categoría -->
      <div class="field">
        <div class="price-quantity-category">
          <!-- Precio -->
          <div class="input-group">
            <label for="price">{{ $t('createEvent.fields.price') }}</label>
            <pv-input-number
              id="price"
              v-model="form.price"
              :placeholder="$t('createEvent.fields.pricePlaceholder')"
              inputId="price_input"
              mode="currency"
              currency="PEN"
              locale="en-US"
              variant="filled"
            />
          </div>

          <!-- Cantidad -->
          <div class="input-group">
            <label for="quantity">{{ $t('createEvent.fields.quantity') }}</label>
            <pv-input-number
              id="quantity"
              v-model="form.quantity"
              :placeholder="$t('createEvent.fields.quantityPlaceholder')"
            />
          </div>

          <!-- Categoría -->
          <div class="input-group">
            <label for="category">{{ $t('createEvent.fields.category') }}</label>
            <pv-cascade-select
              id="category"
              v-model="form.category"
              :options="categories"
              optionLabel="name"
              optionGroupLabel="name"
              optionGroupChildren="subcategories"
              placeholder="Selecciona una categoría"
              class="category-select no-hover"
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

      <!-- Dirección -->
      <div class="field">
        <label for="address">{{ $t('createEvent.fields.address') }}</label>
        <div class="address-search">
          <pv-input-text
            id="address"
            class="address-form"
            v-model="form.address"
            :placeholder="$t('createEvent.fields.addressPlaceholder')"
            @keyup.enter="searchAddress"
          />
          <pv-button
            icon="pi pi-search"
            :label="$t('createEvent.buttons.search')"
            class="search-button"
            @click="searchAddress"
          />
        </div>
      </div>

      <!-- Mapa -->
      <div class="field">
        <label>{{ $t('createEvent.fields.location') }}</label>
        <div id="map" class="map"></div>
        <small v-if="form.location">
          {{ $t('createEvent.mapMarker') }} {{ form.location }}
        </small>
      </div>

      <!-- Fechas -->
      <div class="field">
        <label>{{ $t('createEvent.fields.dates') }}</label>
        <pv-calendar
          v-model="form.dates"
          selectionMode="range"
          dateFormat="dd/mm/yy"
          :placeholder="$t('createEvent.fields.dates')"
          class="calendar-custom"
        />
      </div>

      <!-- Botón Publicar -->
      <div class="button-container">
        <pv-button
          :label="$t('createEvent.buttons.publish')"
          icon="pi pi-check"
          class="publish-button"
          @click="publishEvent"
        />
      </div>
    </div>
    
    <!--Diálogo de éxito -->
    <pv-dialog
      v-model:visible="showSuccessDialog"
      modal
      :draggable="false"
      :closable="false"
      :dismissableMask="false"
      class="dialog-custom"
    >
      <h3>{{ $t('createEvent.messages.successTitle') }}</h3>
      <p>{{ $t('createEvent.messages.success') }}</p>

      <template #footer>
        <pv-button
          label="OK"
          icon="pi pi-check"
          @click="showSuccessDialog = false"
          class="dialog-ok"
        />
      </template>
    </pv-dialog>

    <!--Diálogo de error -->
    <pv-dialog
      v-model:visible="showErrorDialog"
      modal
      :draggable="false"
      :closable="false"
      :dismissableMask="false"
      class="dialog-custom"
    >
      <h3>{{ $t('createEvent.messages.errorTitle') }}</h3>
      <p>{{ $t('createEvent.messages.error') }}</p>
      <template #footer>
        <pv-button
          label="OK"
          icon="pi pi-times"
          @click="showErrorDialog = false"
          class="dialog-ok"
        />
      </template>
    </pv-dialog>

    <!-- Diálogo de campos faltantes -->
    <pv-dialog
      v-model:visible="showMissingFieldsDialog"
      modal
      :draggable="false"
      :closable="false"
      :dismissableMask="false"
      class="dialog-custom"
    >
      <h3>{{ $t('createEvent.messages.warningTitle') }}</h3>
      <p>{{ $t('createEvent.messages.missingFields') }}</p>
      <template #footer>
        <pv-button
          label="OK"
          icon="pi pi-exclamation-triangle"
          @click="showMissingFieldsDialog = false"
          class="dialog-ok"
        />
      </template>
    </pv-dialog>

    <pv-dialog
      v-model:visible="showAddressDialog"
      modal
      :draggable="false"
      :closable="false"
      :dismissableMask="false"
      class="dialog-custom"
    >
      <h3>{{ $t('createEvent.messages.addressErrorTitle') }}</h3>
      <p>{{ $t('createEvent.messages.addressNotFound') }}</p>
      <template #footer>
        <pv-button
          label="OK"
          icon="pi pi-map-marker"
          @click="showAddressDialog = false"
          class="dialog-ok"
        />
      </template>
    </pv-dialog>
  </div>
</template>


<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const API_URL = import.meta.env.VITE_API_URL || 'https://db-server-1-66zf.onrender.com'

const form = ref({
  org: '',
  title: '',
  description: '',
  price: '',
  quantity: '',
  category: '',
  photos: [],
  address: '',
  location: '',
  dates: null,
  lat: null,
  lng: null
})

const categories = ref([
  { name: 'Gastronomía' },
  { name: 'Cultural' },
  { name: 'Tecnología' }
])

const previewImages = ref([])
const fileInput = ref(null)

//Estados de los diálogos
const showSuccessDialog = ref(false)
const showErrorDialog = ref(false)
const showMissingFieldsDialog = ref(false)
const showAddressDialog = ref(false)

let map, marker, geocoder
const GOOGLE_API_KEY = 'AIzaSyDLpIMi-V6G67TcGLcx9Z8ofJp896aYhq0'

// === Manejo de imágenes ===
const onFileChange = (e) => {
  const files = Array.from(e.target.files)
  files.forEach((file) => {
    form.value.photos.push(file)
    const reader = new FileReader()
    reader.onload = (event) => previewImages.value.push(event.target.result)
    reader.readAsDataURL(file)
  })
}

const handleDrop = (e) => {
  const files = Array.from(e.dataTransfer.files)
  files.forEach((file) => {
    form.value.photos.push(file)
    const reader = new FileReader()
    reader.onload = (event) => previewImages.value.push(event.target.result)
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  form.value.photos.splice(index, 1)
  previewImages.value.splice(index, 1)
}

// === Publicar evento ===
const publishEvent = async () => {
  if (!form.value.title || !form.value.dates || !form.value.location) {
    showMissingFieldsDialog.value = true
    return
  }

  const formattedDates = Array.isArray(form.value.dates)
    ? form.value.dates.map((d) => new Date(d).toLocaleDateString('es-PE')).join(' - ')
    : new Date(form.value.dates).toLocaleDateString('es-PE')

  const newEvent = {
    org: form.value.org,
    title: form.value.title,
    description: form.value.description,
    price: form.value.price,
    quantity: form.value.quantity,
    category: form.value.category,
    date: formattedDates,
    location: form.value.location,
    photos: previewImages.value
  }

  try {
    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent)
    })

    if (!res.ok) throw new Error('Error al guardar el evento')

    showSuccessDialog.value = true

    // limpiar formulario
    form.value = {
      org: '',
      title: '',
      description: '',
      price: '',
      quantity: '',
      category: '',
      photos: [],
      address: '',
      location: '',
      dates: null,
      lat: null,
      lng: null
    }
    previewImages.value = []
  } catch (err) {
    console.error('Error al publicar el evento:', err)
    showErrorDialog.value = true
  }
}

// === Buscar dirección y marcar en mapa ===
const searchAddress = async () => {
  if (!form.value.address) {
    showMissingFieldsDialog.value = true
    return
  }

  geocoder.geocode({ address: form.value.address }, (results, status) => {
    if (status === 'OK' && results.length > 0) {
      const result = results[0]
      const location = result.geometry.location

      map.setCenter(location)
      map.setZoom(17)

      if (marker) marker.setMap(null)
      marker = new google.maps.Marker({
        position: location,
        map: map,
        draggable: true
      })

      form.value.lat = location.lat()
      form.value.lng = location.lng()
      form.value.location = result.formatted_address
    } else {
      showAddressDialog.value = true
    }
  })
}

// === Inicializar mapa ===
const initMap = () => {
  geocoder = new google.maps.Geocoder()
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -12.0464, lng: -77.0428 },
    zoom: 12
  })
}

onMounted(() => {
  nextTick(() => {
    if (!window.google || !window.google.maps) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initMap
      document.head.appendChild(script)
    } else {
      initMap()
    }
  })
})
</script>

<style scoped>
.create-event-page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
}

.form-container{
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  font-weight: bold;
}

.org-form {
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
  height: 30px;
  font-size: 0.95rem;
}

.title-form{
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
  height: 30px;
  font-size: 0.95rem;
}

.price-quantity-form{
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
  height: 30px;
  font-size: 0.95rem;
}

.description-form{
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
  font-family: sans-serif;
  font-size: 0.95rem;
}

.address-search {
  display: flex;
  gap: 0.5rem;
}

.address-form{
  flex: 1;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
  height: 30px;
  font-size: 0.95rem;
}

.search-button{
  border: 2px solid #333;
  height: 38px;
  background-color: #ffcd00;
  font-size: 0.95rem;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
  font-weight: bold;
}

.search-button:hover{
  background-color: #fff7ed;
  border-color: #f59e0b;
  color: #f59e0b;
  cursor: pointer;
  box-shadow: 3px 3px 0 rgba(245, 158, 11, 1);
}

#map {
  height: 350px;
  width: 100%;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
}

.upload-area {
  border: 2px dashed #ccc;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s;
  background-color: #fafafa;
}

.upload-area:hover {
  border-color: #fac738;
  background-color: #fff8e1;
}

.upload-icon {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.upload-button {
  border: 2px solid #333;
  height: 40px;
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
  box-shadow: 3px 3px 0 rgba(245, 158, 11, 1);
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
  width: 120px;
  height: 120px;
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

.remove-btn:hover {
  background-color: #ccc;
}

.remove-btn i {
  color: #d32f2f;
  font-size: 0.9rem;
}

:deep(.p-calendar) {
  width: 100%;
  border: 2px solid #333 !important;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2) !important;
  background-color: #fff;
  height: 38px;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
}

:deep(.p-calendar .p-inputtext) {
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 100%;
  background: transparent !important;
  color: #111;
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
}

:deep(.p-calendar .p-button) {
  border: none !important;
  background: transparent !important;
  color: #333 !important;
  transition: all 0.2s ease;
}

:deep(.p-calendar:hover),
:deep(.p-calendar:focus-within) {
  border-color: #333 !important;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2) !important;
  outline: none !important;
}
.publish-button{
  border: 2px solid #333;
  height: 40px;
  font-size: 1rem;
  background-color: #ffcd00;
  font-weight: bold;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
  cursor: pointer;
}

.publish-button:hover {
  background-color: #fff7ed;
  border-color: #f59e0b;
  color: #f59e0b;
  cursor: pointer;
  box-shadow: 3px 3px 0 rgba(245, 158, 11, 1);
}

.page-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.price-quantity-category {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
}

.category-form {
  border: 2px solid #333 !important;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2) !important;
  height: 38px !important;
  font-size: 0.95rem !important;
}

.price-quantity-category .input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.dialog-ok {
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2);
  background-color: #ffcd00;
}

.dialog-ok:hover {
  background-color: #fff7ed;
  border-color: #f59e0b;
  color: #f59e0b;
  cursor: pointer;
  box-shadow: 3px 3px 0 rgba(245, 158, 11, 1);
}
</style>