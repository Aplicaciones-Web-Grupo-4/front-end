<template>
  <div class="flex gap-2">
    <pv-button
        label="ES"
        :class="isEs ? 'p-button' : 'p-button-outlined'"
        size="small"
        @click="set('es')"
    />
    <pv-button
        label="EN"
        :class="!isEs ? 'p-button' : 'p-button-outlined'"
        size="small"
        @click="set('en')"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();

const isEs = computed(() => locale.value === 'es');
function set(lang) {
  locale.value = lang;
  localStorage.setItem('nh-locale', lang);
}
</script>
