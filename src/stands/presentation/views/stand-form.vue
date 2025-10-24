<template>
  <div class="p-4 nh-card">
    <h3 class="h-title mb-3">{{ isEdit ? $t('stands.editTitle') : $t('stands.newTitle') }}</h3>

    <div class="grid">
      <div class="col-12 md:col-6">
        <label class="block mb-1">{{ $t('stands.name') }}</label>
        <input
            v-model.trim="form.name"
            required
            class="p-inputtext p-component w-full border-round border-1 p-2"
            :placeholder="$t('stands.name')"
        />
      </div>

      <div class="col-12 md:col-6">
        <label class="block mb-1">{{ $t('stands.category') }}</label>
        <pv-dropdown
            v-model="form.category"
            :options="categories"
            class="w-full"
            :placeholder="$t('stands.category')"
        />
      </div>
    </div>

    <div class="mt-3 flex gap-2">
      <pv-button class="nh-btn" :label="isEdit ? $t('common.update') : $t('common.save')" icon="pi pi-check" @click="onSubmit" />
      <router-link :to="{ name: 'org-register-stands' }">
        <pv-button :label="$t('common.cancel')" class="p-button-text" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useStandsStore } from '../../application/stands.store.js';

const { t } = useI18n();
const store = useStandsStore();
const route = useRoute();
const useRoutes = useRouter();

const isEdit = computed(() => Boolean(route.params.id));
const categories = computed(() => {
  const set = new Set(store.stands.map(s => s.category).filter(Boolean));
  return Array.from(set).sort((a,b) => a.localeCompare(b));
});

const form = reactive({ id: null, name: '', category: '', fairId: null});

onMounted(async () => {
  if (!store.stands?.length) await store.fetchStands();
  if (!store.fairs?.length)  await store.fetchFairs();

  if (isEdit.value) {
    const current = store.getById(Number(route.params.id));
    if (!current) {
      alert(t('stands.errors.notFound') || 'Registro no encontrado');
      organizerRoutes.push({ name: 'register-stands' });
      return;
    }
    Object.assign(form, { id: current.id, name: current.name, category: current.category });
  } else if (!form.category && categories.value.length) {
    form.category = categories.value[0];
  }
});

function inferFairIdByCategory(category) {
  const matches = store.stands.filter(s => s.category === category);
  if (!matches.length) return null;
  const freq = matches.reduce((acc, s) => {
    acc[s.fairId] = (acc[s.fairId] || 0) + 1;
    return acc;
  }, {});
  const fairId = Number(Object.entries(freq).sort((a,b) => b[1]-a[1])[0][0]);
  return fairId || null;
}

async function onSubmit() {
  if (!form.name?.trim()) { alert(t('stands.errors.nameRequired')); return; }
  if (!form.category) { alert(t('stands.errors.categoryRequired')); return; }

  const fairId = inferFairIdByCategory(form.category);
  if (!fairId) { alert(t('stands.errors.noFairForCategory')); return; }

  if (isEdit.value) {
    await store.update({ id: form.id, name: form.name.trim(), category: form.category, fairId });
  } else {
    await store.add({ name: form.name.trim(), category: form.category, fairId: selectFair.value?.id || null });
  }
  organizerRoutes.push({ name: 'register-stands' });
}
</script>
