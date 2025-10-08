<template>
  <div class="page container">
    <h1 class="page-title">Saved Events</h1>
    <div class="card">
      <div v-if="savedList.length === 0" class="empty">
        <img src="/src/assets/mascot.png" class="mascot" alt=""/>
        <div class="empty-title">Saved Events</div>
        <div class="empty-sub">Aquí verás los eventos que guardes</div>
      </div>
      <div v-else class="saved-list">
        <EventCard v-for="s in savedList" :key="s.id" :event="s" :showSave="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import EventCard from '../components/EventCard.vue'
import { ref, onMounted } from 'vue'

const all = [
  { id: 1, title: 'RetroFair', desc: 'A nostagical trip back in time with vintage goods and classic games.', img: '/src/assets/event1.png' },
  { id: 2, title: 'Food Truck Fiesta', desc: 'A culinary adventure with a variety of gourmet food trucks.', img: '/src/assets/event2.png' },
  { id: 3, title: 'Artisanal Market', desc: 'Discover unique handmade crafts and  meet local artisans.', img: '/src/assets/event3.png' },
  { id: 4, title: 'Pop-up Shop', desc: 'Exclusive pop-up shops features limited- edition items.', img: '/src/assets/event3.png' }
]

const savedList = ref([])

onMounted(()=>{
  const raw = localStorage.getItem('nh_saved')
  const ids = raw ? JSON.parse(raw) : []
  savedList.value = all.filter(a=> ids.includes(a.id))
})
</script>

