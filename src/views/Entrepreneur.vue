<template>
  <div class="p-6">
    <!-- Título y resumen -->
    <h1 class="text-3xl font-bold mb-2">{{ $t('entrepreneur.title') }}</h1>
    <p class="text-gray-600 mb-6">{{ $t('entrepreneur.summary') }}</p>

    <!-- Fila principal: tarjeta de feria (izquierda) + bloque acciones/espacio (derecha) -->
    <div class="grid">
      <div class="col-12 md:col-6">
        <div class="surface-card p-4 border-1 border-200 border-round">
          <h3 class="text-xl font-semibold mb-1">{{ $t('entrepreneur.fairTitle') }}</h3>
          <p class="text-gray-600 mb-3">{{ $t('entrepreneur.fairDates') }}</p>

          <div class="flex align-items-center justify-content-between">
            <div class="text-gray-600">
              <span class="mr-1">{{ $t('entrepreneur.views') }}:</span>
              <span class="font-medium">1,240</span>
            </div>
            <pv-button class="nh-btn" :label="$t('entrepreneur.create')" icon="pi pi-plus" />
          </div>
        </div>
      </div>

      <div class="col-12 md:col-6">
        <!-- espacio reservado para futuras tarjetas/acciones; vacío para conservar layout -->
      </div>
    </div>

    <!-- Métricas básicas -->
    <h2 class="text-2xl font-semibold mt-6 mb-3">Métricas básicas</h2>
    <div class="grid">
      <div class="col-12 md:col-6">
        <div class="surface-card p-4 border-1 border-200 border-round">
          <div class="text-gray-600 mb-2">{{ $t('entrepreneur.views') }}</div>
          <div class="text-4xl font-bold leading-none">1,234</div>
        </div>
      </div>
      <div class="col-12 md:col-6">
        <div class="surface-card p-4 border-1 border-200 border-round">
          <div class="text-gray-600 mb-2">{{ $t('entrepreneur.saved') }}</div>
          <div class="text-4xl font-bold leading-none">567</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No logic needed here; solo usamos $t en template.
</script>
