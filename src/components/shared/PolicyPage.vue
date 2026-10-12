<script setup>
import { computed } from 'vue';
import PageHero from './PageHero.vue';
import LegalContent from './LegalContent.vue';
import policies from '../../data/policies.json';
import { SITE_NAME, SITE_PHONE, SITE_PHONE_RAW, SITE_EMAIL, SITE_ADDRESS_ONE_LINE, SITE_ADDRESS_LINE1, SITE_ADDRESS_LINE2, SITE_URL } from '../../config/siteInfo.js';

const props = defineProps({
  policyKey: { type: String, required: true }
});
function resolveSiteInfo(value) {
  if (typeof value === 'string') {
    return value
      .replaceAll('ONE 10 GLOBAL LLC', SITE_NAME)
      .replaceAll('ONE 10 GLOBAL', SITE_NAME.replace(/ LLC$/, ''))
      .replaceAll('support@one10globalllc.com', SITE_EMAIL)
      .replaceAll('(236) 506-1948', SITE_PHONE)
      .replaceAll('+12365061948', SITE_PHONE_RAW)
      .replaceAll('10228 E Northwest Hwy', SITE_ADDRESS_LINE1)
      .replaceAll('Dallas, TX 75238, United States', SITE_ADDRESS_LINE2)
      .replaceAll('10228 E Northwest Hwy, Dallas, TX 75238', SITE_ADDRESS_ONE_LINE.replace(', United States', ''))
      .replaceAll('https://www.one10globalllc.com', SITE_URL)
      .replaceAll('www.one10globalllc.com', new URL(SITE_URL).host)
      .replaceAll('one10globalllc.com', new URL(SITE_URL).hostname);
  }
  if (Array.isArray(value)) return value.map(resolveSiteInfo);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, resolveSiteInfo(child)]));
  }
  return value;
}
const policy = computed(() => resolveSiteInfo(policies[props.policyKey]));
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
