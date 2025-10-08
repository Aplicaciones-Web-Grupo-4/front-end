<template>
  <div class="lang-switch-text">
    <span @click="set('es')" :class="{ active: isEs }">ES</span> |
    <span @click="set('en')" :class="{ active: !isEs }">EN</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isEs = computed(() => locale.value === 'es')

function toggleLang() {
  const lang = isEs.value ? 'en' : 'es'
  locale.value = lang
  localStorage.setItem('nh-locale', lang)
}

function set(lang) {
  locale.value = lang;
  localStorage.setItem('nh-locale', lang);
}
</script>

<style scoped>
.lang-switch-text {
  cursor: pointer;
  font-weight: 600;
  color: #666;
  font-size: 0.9rem;
  user-select: none;
}
.lang-switch-text span {
  transition: color 0.2s, border-bottom 0.2s;
}
.lang-switch-text span.active {
  color: #f59e0b;
  border-bottom: 2px solid #f59e0b;
}
.lang-switch-text span:hover {
  color: #fbbf24;
}
</style>
