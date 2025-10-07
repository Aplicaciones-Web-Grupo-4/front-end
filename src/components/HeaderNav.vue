<template>
  <div class="surface-card shadow-1 px-3 py-2">
    <div class="flex align-items-center justify-content-between">
      <div class="flex align-items-center gap-2">
        <i class="pi pi-bolt text-primary"></i>
        <router-link to="/" class="font-bold">NextHappen</router-link>
      </div>

      <pv-menubar :model="items" class="border-none shadow-none bg-transparent" />

      <div class="flex align-items-center gap-3">
        <LanguageSwitcher />
        <pv-avatar icon="pi pi-user" shape="circle" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import LanguageSwitcher from './LanguageSwitcher.vue';

const router = useRouter();
const { t } = useI18n();

const items = computed(() => ([
  { label: t('nav.dashboard'), icon: 'pi pi-home',  command: () => router.push({ name: 'entrepreneur' }) },
  { label: t('nav.stands'),    icon: 'pi pi-table', command: () => router.push({ name: 'register-stands' }) },
  { label: t('nav.events'),    icon: 'pi pi-calendar', command: () => router.push({ name: 'events' }) }
]));
</script>
