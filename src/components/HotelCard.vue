<script setup lang="ts">
import defaultImage from '@/assets/images/hotelPlaceholder.png'
import type { Hotel } from '@/types/agent'

const props = defineProps<{
  hotel: Hotel
}>()
</script>

<template>
  <div class="hotel-card">
    <img
      :src="props.hotel.imageUrl ? props.hotel.imageUrl : defaultImage"
      alt="Hotel Image"
      class="hotel-image"
    />
    <div class="hotel-info">
      <h4>{{ hotel.name }}</h4>
      <p>Type de chambre : {{ hotel.roomType }}</p>
      <p>Nombre de nuits : {{ hotel.nights }}</p>
      <p>Demi-pension : {{ hotel.halfBoard ? 'Oui' : 'Non' }}</p>
    </div>
  </div>
</template>

<style scoped>
.hotel-card {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f9f9f9;
  padding: 10px;
  align-items: center;

  .hotel-image {
    width: 250px;
    height: 140px;
    object-fit: cover;
    border-radius: 8px;
    flex-shrink: 0;
  }

  .hotel-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h4 {
      margin: 0 0 8px;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
