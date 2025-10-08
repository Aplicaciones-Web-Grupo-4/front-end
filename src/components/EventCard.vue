<template>
  <div class="event-card">
    <div class="img-wrap">
      <img :src="event.img" alt=""/>
    </div>
    <div class="body">
      <h3 class="title">{{ event.title }}</h3>
      <p class="desc">{{ event.desc }}</p>
    </div>
    <button v-if="showSave" class="btn-save" @click="$emit('save', event.id)">Save</button>
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
  background:var(--card);
  border-radius:12px;
  border:1px solid rgba(0,0,0,0.04);
  position:relative;
}
.img-wrap{width:160px;height:120px;flex-shrink:0;overflow:hidden;border-radius:12px;background:#eee}
.img-wrap img{width:100%;height:100%;object-fit:cover;display:block}
.body{flex:1}
.title{font-size:22px;margin:0 0 8px;font-weight:800}
.desc{margin:0;color:var(--muted);line-height:1.35}
.btn-save{position:absolute;right:16px;top:16px;background:transparent;border:1px solid rgba(0,0,0,0.12);padding:8px 12px;border-radius:10px;font-weight:700;cursor:pointer}
.btn-save:hover{background:rgba(245,192,74,0.08)}
@media (max-width:640px){
  .event-card{flex-direction:column;align-items:flex-start}
  .img-wrap{width:100%;height:180px}
  .btn-save{position:static;margin-top:8px}
}
</style>
