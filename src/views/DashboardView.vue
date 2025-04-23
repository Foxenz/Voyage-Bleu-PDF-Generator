<script setup lang="ts">
import OfferForm from '@/components/OfferForm.vue'
import OfferPreview from '@/components/OfferPreview.vue'
import type { Offer } from '@/types/offer.ts'
import { reactive } from 'vue'

const offer = reactive<Offer>({
  destination: '',
  agentId: '',
  dateStart: '',
  dateEnd: '',
  adults: 0,
  children: [],
  departureFlight: {
    departure: '',
    arrival: '',
    baggage: '',
    company: '',
  },
  returnFlight: {
    departure: '',
    arrival: '',
    baggage: '',
    company: '',
  },
  hotels: [
    {
      name: '',
      roomType: '',
      nights: 0,
      halfBoard: false,
      image: null,
      imageUrl: undefined,
    },
  ],
  totalAmount: '',
  deposit: '',
})
</script>

<template>
  <main class="container">
    <div class="form-container">
      <OfferForm :offer="offer" />
    </div>
    <div class="preview-container">
      <OfferPreview :offer="offer" />
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-family: 'Arial', sans-serif;
  height: 100vh;

  .form-container {
    flex: 1;
    max-width: 500px;
    overflow-y: auto;
  }

  .preview-container {
    flex: 1;
    background-color: #f9f9f9;
    padding: 20px;
    overflow: auto;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
}
</style>
