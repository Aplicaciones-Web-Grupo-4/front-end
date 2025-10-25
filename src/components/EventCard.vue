<template>
  <div class="event-card">
    <div class="img-wrap">
      <img :src="event.image" :alt="event.title" />
    </div>
    <div class="body">
      <h3 class="title">{{ event.title }}</h3>
      <p class="desc">{{ event.description }}</p>
    </div>
    <pv-button
        v-if="showSave"
        class="btn-save"
        @click="$emit('save', event.id)"
        icon="pi pi-heart"
    />
  </div>
</template>

<script setup>
defineProps({
  event: Object,
  showSave: { type: Boolean, default: true }
})
</script>


<style scoped>
.event-card{
  display:flex;
  gap:20px;
  align-items:center;
  padding:16px;
  border-radius:12px;
  border:1px solid rgba(0,0,0,0.04);
  position:relative;
}

.btn-save {
  width: 45px;
  height: 45px;
  box-shadow: 3px 3px 0 rgba(0,0,0,2);
  border-radius: 0;
}

:deep(.p-button-icon){
  margin: 0 !important;
  font-size: 1.5rem;
  font-weight: 300;
  color: #333;
}

:deep(.p-button:hover){
  border: 2px solid red;
  box-shadow: none;
  cursor: pointer;
}

:deep(.p-button:hover .p-button-icon){
  color:red;
}

.img-wrap{
  height: 10%;
  width: 10%;
  flex-shrink: 0;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0,0,0,2);
}

.img-wrap img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block
}

.body{
  flex:1
}

.title{
  font-size:22px;
  margin:0 0 8px;
  font-weight:800
}

@media (max-width:640px){  
  .event-card{
    flex-direction:column;align-items:flex-start
  }

  .img-wrap{
    width:100%;height:180px
  }

  .btn-save{
    position:static;margin-top:8px
  }
}
</style>
