<template>
  <div class="new-stand">
    <h3 class="h-title mb-3">{{ isEdit ? $t('stands.editTitle') : $t('stands.newTitle') }}</h3>

    <div class="grid">
      <div class="col-12 md:col-6">
        <label class="block mb-1">{{ $t('stands.name') }}</label>
        <pv-input-text
            v-model.trim="form.name"
            required
            class="form-name"
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
      <pv-button class="save-button" :label="isEdit ? $t('common.update') : $t('common.save')" icon="pi pi-check" @click="onSubmit" />
      <router-link :to="{ name: 'org-register-stands' }">
        <pv-button :label="$t('common.cancel')" class="cancel-button" />
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

<style scoped>
.new-stand {
  max-width: 80rem;
  margin: 2rem auto;
  padding: 2rem;
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 1);
}

.form-name {
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 1);
  height: 38px;
  width: 100%;
  font-family: 'Inter', sans-serif; 
}

.save-button {
  border: 2px solid #333;
  height: 38px;
  background-color: #ffcd00;
  font-size: 0.95rem;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 20);
  font-weight: bold;
}

.save-button:hover {
  background-color: #fff7ed;
  border-color: #f59e0b;
  color: #f59e0b;
  cursor: pointer;
  box-shadow: none;
}

.cancel-button {
  border: 2px solid #333;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 2);
  background-color: #d32f2f;
  height: 38px;
  font-size: 0.95rem;
  font-weight: bold;
}

.cancel-button:hover {
  border: 2px solid #d32f2f;
  box-shadow: none;
  color: #d32f2f;
  background-color: #fff7ed;
  cursor: pointer;
}
</style>