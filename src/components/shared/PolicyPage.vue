<script setup>
import { computed } from 'vue';
import PageHero from './PageHero.vue';
import LegalContent from './LegalContent.vue';
import policies from '../../data/policies.json';

const props = defineProps({
  policyKey: { type: String, required: true }
});
const policy = computed(() => policies[props.policyKey]);
</script>

<template>
  <main v-if="policy">
    <PageHero :title="policy.title" :description="policy.description" :breadcrumbs="[{ label: policy.title }]" />
    <section class="sec">
      <div class="wrap">
        <LegalContent :blocks="policy.blocks" />
      </div>
    </section>
  </main>
</template>
<style scoped>
/* Page typography and policy copy are encapsulated by LegalContent.vue. */
</style>
