<template>
  <div class="p-4">
    <h2 class="h-title mb-2">{{ $t('entrepreneur.title') }}</h2>
    <p class="mb-4 p-muted">{{ $t('entrepreneur.summary') }}</p>

    <div class="grid">
      <div class="col-12 md:col-6">
        <pv-card>
          <template #title>{{ $t('entrepreneur.fairTitle') }}</template>
          <template #content>
            <p class="p-muted">{{ $t('entrepreneur.fairDates') }}</p>
          </template>
        </pv-card>
      </div>

      <div class="col-12 md:col-6">
        <div class="grid">
          <div class="col-6">
            <div class="nh-stat">
              <div class="nh-stat__label">{{ $t('entrepreneur.views') }}</div>
              <div class="nh-stat__value">1,240</div>
            </div>
          </div>
          <div class="col-6">
            <div class="nh-stat">
              <div class="nh-stat__label">{{ $t('entrepreneur.saved') }}</div>
              <div class="nh-stat__value">312</div>
            </div>
          </div>
        </div>
        <pv-button class="mt-3 nh-btn" :label="$t('entrepreneur.create')" icon="pi pi-plus" />
      </div>
    </div>
  </div>
</template>

<script setup>
// si no usabas todavía i18n en este componente, no necesitas importar nada extra: $t está disponible
</script>
