<template>
  <div class="pdf-preview">
    <h3>{{ offer.destination }}</h3>
    <p><strong>Dates :</strong> {{ offer.dateStart }} au {{ offer.dateEnd }}</p>
    <p><strong>Agent :</strong> {{ selectedAgent?.name }} – {{ selectedAgent?.email }}</p>
    <p><strong>Adultes :</strong> {{ offer.adults }}</p>
    <p><strong>Enfants :</strong> {{ offer.children.join(', ') || 'Aucun' }}</p>
    <h4>Vol Aller</h4>
    <p>
      Départ : {{ offer.departureFlight.departure }} / Arrivée :
      {{ offer.departureFlight.arrival }}
    </p>
    <p>
      Compagnie : {{ offer.departureFlight.company }} – Bagage :
      {{ offer.departureFlight.baggage }}
    </p>

    <h4>Vol Retour</h4>
    <p>
      Départ : {{ offer.returnFlight.departure }} / Arrivée :
      {{ offer.returnFlight.arrival }}
    </p>
    <p>
      Compagnie : {{ offer.returnFlight.company }} – Bagage :
      {{ offer.returnFlight.baggage }}
    </p>

    <h4>Hôtels</h4>
    <div v-for="(hotel, index) in offer.hotels" :key="index">
      <p>
        <strong>{{ hotel.name }}</strong> ({{ hotel.roomType }}) – {{ hotel.nights }} nuits –
        {{ hotel.halfBoard ? 'Demi-pension' : 'Sans pension' }}
      </p>
      <img v-if="hotel.imageUrl" :src="hotel.imageUrl" alt="Image hôtel" style="max-width: 200px" />
    </div>

    <p><strong>Montant total :</strong> {{ offer.totalAmount }} €</p>
    <p><strong>Acompte :</strong> {{ offer.deposit }} €</p>
    <p><strong>Référence :</strong> {{ offer.reference }}</p>
  </div>
</template>

<script setup lang="ts">
import { agents } from '@/data/agent'
import type { Offer } from '@/types/agent'
import { computed } from 'vue'

const props = defineProps<{ offer: Offer }>()
const selectedAgent = computed(() => agents.find((agent) => agent.id === props.offer.agentId))
</script>

<style scoped>
.pdf-preview {
  width: 210mm;
  padding: 20mm;
  height: 100%;
  background: white;
  color: #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: auto;
}

.pdf-preview h3 {
  font-size: 24px;
  margin-bottom: 10px;
  border-bottom: 2px solid #42b983;
  padding-bottom: 5px;
}

.pdf-preview h4 {
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 5px;
  color: #42b983;
}

.pdf-preview p {
  margin: 5px 0;
  font-size: 14px;
}

.pdf-preview img {
  max-width: 100%;
  max-height: 200px;
  display: block;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
</style>
