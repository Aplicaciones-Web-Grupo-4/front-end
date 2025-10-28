<template>
  <div class="publishment-page" v-if="event">
    <h1>{{ event.title }}</h1>

    <p><strong>Fecha: </strong>{{ event.date }}</p>

    <div class="carousel-container">
      <div class="carousel" ref="carousel">
        <div
          v-for="(photo, i) in event.photos"
          :key="i"
          class="carousel-card"
        >
          <img :src="photo" :alt="`${event.title} ${i + 1}`" />
        </div>
      </div>

      <button
  v-if="event.photos && event.photos.length > 1"
  class="btn prev"
  @click="move(-1)"
>
  &#10094;
</button>

<button
  v-if="event.photos && event.photos.length > 1"
  class="btn next"
  @click="move(1)"
>
  &#10095;
</button>
    </div>

    <p class="desc">{{ event.description }}</p>
    <p><strong>Organizador:</strong> {{ event.org }}</p>
    <p><strong>Precio:</strong> S/. {{ event.price }}</p>

    <div class="actions">
      <pv-button
        label="Comprar entrada"
        icon="pi pi-ticket"
        class="btn-buy"
        @click="buyTicket"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const event = ref(null)
const carousel = ref(null)
let index = 0

const API_URL = import.meta.env.VITE_API_URL || 'https://db-server-1-66zf.onrender.com'

onMounted(async () => {
  const res = await axios.get(`${API_URL}/events/${route.params.id}`)
  event.value = res.data
  await nextTick()
  applyTransform()
})

function getCardWidth() {
  const first = carousel.value?.querySelector('.carousel-card')
  if (!first) return 0
  const rect = first.getBoundingClientRect()
  const style = getComputedStyle(first)
  const gap = parseFloat(style.marginRight) || 20
  return rect.width + gap
}

function applyTransform() {
  if (!carousel.value) return
  const shift = -index * getCardWidth()
  carousel.value.style.transform = `translateX(${shift}px)`
}

function clampIndex(idx) {
  const total = event.value?.photos?.length || 1
  const max = Math.max(0, total - getVisibleCount())
  return Math.min(Math.max(0, idx), max)
}

function getVisibleCount() {
  const width = window.innerWidth
  if (width < 600) return 1
  if (width < 1000) return 2
  return 3
}

function move(direction) {
  index = clampIndex(index + (direction === 1 ? 1 : -1))
  applyTransform()
}

async function buyTicket() {
  try {
    const ticketData = {
      eventId: event.value.id,
      title: event.value.title,
      price: event.value.price,
      date: new Date().toISOString()
    }
    await axios.post(`${API_URL}/tickets`, ticketData)
    alert('¡Compra realizada con éxito!')
  } catch (error) {
    console.error('Error al comprar entrada:', error)
    alert('Ocurrió un error al procesar la compra.')
  }
}
</script>

<style scoped>
/* ==== Carrusel con separación ==== */
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel {
  display: flex;
  gap: 20px;
  transition: transform 0.4s ease;
}

.carousel-card {
  flex: 0 0 calc(33.33% - 20px);
  background: #fff;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2);
  border-radius: 0;
  overflow: hidden;
}

.carousel-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Botones laterales */
.btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #ffcd00;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2);
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 5;
  width: 45px;
  height: 45px;
}

.btn:hover {
  background-color: #fff7ed;
  border-color: #f59e0b;
  color: #f59e0b;
  cursor: pointer;
  box-shadow: none;
}

.prev {
   left: 1.25rem;
}

.next {
   right: 1.25rem;
}

/* ==== Resto ==== */
.publishment-page {
  margin: 40px;
  font-family: "Inter", sans-serif;
}

.desc {
  font-size: 1.05rem;
  margin-bottom: 16px;
}

.actions {
  margin-top: 24px;
}

.btn-buy {
  background-color: #ffcd00;
  color: #333;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0,0,0,2);
  font-weight: bold;
  border-radius: 0;
}

:deep(.btn-buy:hover) {
  background-color: #333;
  color: #fff;
  box-shadow: none;
}

/* 📱 Responsivo */
@media (max-width: 1000px) {
  .carousel-card {
    flex: 0 0 calc(50% - 20px);
  }
}

@media (max-width: 600px) {
  .carousel-card {
    flex: 0 0 100%;
  }
}
</style>
