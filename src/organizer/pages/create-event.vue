<template>
  <div class="create-event-page">
    <h1 class="page-title">Publicar Feria</h1>

    <div class="form-container">
      <!-- Título -->
      <div class="field">
        <label for="title">Título</label>
        <InputText id="title" v-model="form.title" placeholder="Nombre de la feria" />
      </div>

      <!-- Descripción -->
      <div class="field">
        <label for="description">Descripción</label>
        <Textarea
            id="description"
            v-model="form.description"
            rows="4"
            placeholder="Describe brevemente la feria"
            autoResize
        />
      </div>

      <!-- Subir fotos -->
      <div class="field">
        <label>Fotos</label>
        <div class="upload-area" @dragover.prevent @drop.prevent="handleDrop">
          <i class="pi pi-images upload-icon"></i>
          <p>Arrastra tus fotos aquí o haz clic para seleccionarlas</p>
          <input
              type="file"
              accept="image/*"
              multiple
              @change="onFileChange"
              ref="fileInput"
              class="hidden-input"
          />
          <Button
              label="Seleccionar Fotos"
              icon="pi pi-upload"
              class="upload-button"
              @click="$refs.fileInput.click()"
          />
        </div>

        <!-- Vista previa -->
        <div v-if="previewImages.length" class="preview-container">
          <div
              v-for="(img, index) in previewImages"
              :key="index"
              class="image-preview"
          >
            <img :src="img" alt="Preview" />
            <button class="remove-btn" @click="removeImage(index)">
              <i class="pi pi-times"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Buscar dirección -->
      <div class="field">
        <label for="address">Buscar dirección</label>
        <div class="address-search">
          <InputText
              id="address"
              v-model="form.address"
              placeholder="Ej: Av. Arequipa 1234, Lima"
              @keyup.enter="searchAddress"
          />
          <Button
              icon="pi pi-search"
              label="Buscar"
              class="search-button"
              @click="searchAddress"
          />
        </div>
      </div>

      <!-- Mapa -->
      <div class="field">
        <label>Ubicación</label>
        <div id="map" class="map"></div>
        <small v-if="form.location">📍 {{ form.location }}</small>
      </div>

      <!-- Fechas -->
      <div class="field">
        <label>Fechas</label>
        <Calendar
            v-model="form.dates"
            selectionMode="range"
            showIcon
            dateFormat="dd/mm/yy"
            placeholder="Selecciona un rango o una sola fecha"
            class="calendar-custom"
        />
      </div>

      <!-- Botón -->
      <div class="button-container">
        <Button
            label="Publicar"
            icon="pi pi-check"
            class="publish-button"
            @click="publishEvent"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Calendar from "primevue/calendar";
import Button from "primevue/button";

// 🧾 Datos del formulario
const form = ref({
  title: "",
  description: "",
  photos: [],
  address: "",
  location: "",
  dates: null,
  lat: null,
  lng: null,
});

const previewImages = ref([]);
const fileInput = ref(null);

let map, marker, geocoder;
const GOOGLE_API_KEY = "AIzaSyDLpIMi-V6G67TcGLcx9Z8ofJp896aYhq0";

// 🖼️ Manejo de imágenes
const onFileChange = (e) => {
  const files = Array.from(e.target.files);
  files.forEach((file) => {
    form.value.photos.push(file);
    const reader = new FileReader();
    reader.onload = (event) => previewImages.value.push(event.target.result);
    reader.readAsDataURL(file);
  });
};

const handleDrop = (e) => {
  const files = Array.from(e.dataTransfer.files);
  files.forEach((file) => {
    form.value.photos.push(file);
    const reader = new FileReader();
    reader.onload = (event) => previewImages.value.push(event.target.result);
    reader.readAsDataURL(file);
  });
};

const removeImage = (index) => {
  form.value.photos.splice(index, 1);
  previewImages.value.splice(index, 1);
};

// 🚀 Publicar evento en db.json
const publishEvent = async () => {
  if (!form.value.title || !form.value.dates || !form.value.location) {
    alert("Por favor completa todos los campos obligatorios.");
    return;
  }

  const formattedDates = Array.isArray(form.value.dates)
      ? form.value.dates
          .map((d) => new Date(d).toLocaleDateString("es-PE"))
          .join(" - ")
      : new Date(form.value.dates).toLocaleDateString("es-PE");

  const newEvent = {
    title: form.value.title,
    description: form.value.description,
    status: "En vivo",
    date: formattedDates,
    location: form.value.location,
    photos: previewImages.value, // URLs base64
  };

  try {
    const res = await fetch("http://localhost:3001/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    if (!res.ok) throw new Error("Error al guardar el evento");

    alert("✅ Evento publicado correctamente");
    form.value = {
      title: "",
      description: "",
      photos: [],
      address: "",
      location: "",
      dates: null,
      lat: null,
      lng: null,
    };
    previewImages.value = [];
  } catch (err) {
    console.error("❌ Error al publicar el evento:", err);
    alert("Ocurrió un error al guardar el evento.");
  }
};

// 🗺️ Google Maps
const searchAddress = async () => {
  if (!form.value.address) {
    alert("Por favor, ingresa una dirección.");
    return;
  }

  geocoder.geocode({ address: form.value.address }, (results, status) => {
    if (status === "OK" && results.length > 0) {
      const result = results[0];
      const location = result.geometry.location;

      map.setCenter(location);
      map.setZoom(17);

      if (marker) marker.setMap(null);
      marker = new google.maps.Marker({
        position: location,
        map: map,
        draggable: true,
      });

      form.value.lat = location.lat();
      form.value.lng = location.lng();
      form.value.location = result.formatted_address;
    } else {
      alert("No se encontró la dirección. Intenta con más detalle.");
    }
  });
};

const initMap = () => {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -12.0464, lng: -77.0428 },
    zoom: 12,
  });
};

onMounted(() => {
  nextTick(() => {
    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  });
});
</script>

<style>
/* 🧱 Estilos generales */
.create-event-page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
}

.page-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* 📍 Dirección */
.address-search {
  display: flex;
  gap: 0.5rem;
}

.address-search input,
.address-search .p-inputtext {
  flex-grow: 1;
}

/* 🗺️ Mapa */
#map {
  height: 350px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #ddd;
}

/* 🟡 Botones */
.publish-button {
  color: black;
  background-color: #fac738;
  border: none;
  font-weight: bold;
}
.search-button {
  color: black;
  background-color: #fac738;
  border: none;
  font-weight: bold;
}

/* 📅 Calendario */
.calendar-custom .p-calendar .p-button {
  background-color: #fac738;
  border: none;
  color: black;
}

/* 🖼️ Subida de fotos */
.upload-area {
  border: 2px dashed #ccc;
  border-radius: 12px;
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
  color: #fac738;
  margin-bottom: 0.5rem;
}
.hidden-input {
  display: none;
}
.upload-button {
  margin-top: 0.5rem;
  background-color: #fac738;
  color: black;
  border: none;
  font-weight: bold;
}

/* 🖼️ Vista previa */
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
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #eee;
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

/* 🟡 Input focus */
.p-inputtext:focus,
.p-inputtextarea:focus,
textarea:focus,
input:focus {
  outline: none !important;
  border-color: #fac738 !important;
  box-shadow: 0 0 0 0.15rem rgba(250, 199, 56, 0.35) !important;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.p-inputtext:hover,
.p-inputtextarea:hover,
textarea:hover,
input:hover {
  border-color: #fac738 !important;
}
</style>
