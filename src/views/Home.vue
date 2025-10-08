<template>
  <div class="page container">
    <div class="search-container">
      <input
           v-model="query"
          @input="filterEvents"
          placeholder="Search for events, locations, or keywords"
          class="search-input"
      />
      <div class="events-grid">
        <EventCard
            v-for="event in filteredEvents"
            :key="event.id"
            :event="event"
        />
      </div>
    </div>
    <h1 class="page-title">Featured Events</h1>
    <section class="events">
      <EventCard v-for="e in events" :key="e.id" :event="e" @save="onSave" :showSave="true" />
    </section>
  </div>
</template>

<script setup>
import EventCard from '../components/EventCard.vue'
import { ref } from 'vue'

const events = ref([
  { id: 1, title: 'RetroFair', desc: 'A nostagical trip back in time with vintage goods and classic games.', img: '/src/assets/event1.png' },
  { id: 2, title: 'Food Truck Fiesta', desc: 'A culinary adventure with a variety of gourmet food trucks.', img: '/src/assets/event2.png' },
  { id: 3, title: 'Artisanal Market', desc: 'Discover unique handmade crafts and  meet local artisans.', img: '/src/assets/event3.png' },
  { id: 4, title: 'Pop-up Shop', desc: 'Exclusive pop-up shops features limited- edition items.', img: '/src/assets/event3.png' }
])

function onSave(id){
  const key = 'nh_saved'
  const raw = localStorage.getItem(key)
  const arr = raw ? JSON.parse(raw) : []
  if(!arr.includes(id)) arr.push(id)
  localStorage.setItem(key, JSON.stringify(arr))
  alert('Evento guardado')
}
</script>


