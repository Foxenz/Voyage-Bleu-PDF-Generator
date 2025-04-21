<script setup lang="ts">
import { agents } from '@/data/agent'
import type { Offer } from '@/types/agent'
import { computed } from 'vue'

const props = defineProps<{ offer: Offer }>()
const selectedAgent = computed(() => agents.find((agent) => agent.id === props.offer.agentId))

const formatDate = (date: string): string => {
  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) {
    return '...'
  }
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
  return parsedDate.toLocaleDateString('fr-FR', options)
}
</script>

<template>
  <div class="pdf-preview">
    <img src="@/assets/images/logo.png" alt="Logo" class="logo" />

    <section class="general-info">
      <div class="left-side">
        <h3>{{ offer.destination }}</h3>

        <div class="section-container">
          <div class="icon-container">
            <font-awesome-icon :icon="['fas', 'calendar-days']" class="icon" />
            <p>Date</p>
          </div>
          <p>{{ formatDate(offer.dateStart) }} au {{ formatDate(offer.dateEnd) }}</p>
        </div>

        <div class="section-container">
          <div class="icon-container">
            <font-awesome-icon :icon="['fas', 'user-group']" class="icon" />
            <p>Nombre de personne</p>
          </div>
          <p>{{ offer.adults }} adulte(s) - {{ offer.children.length }} enfant(s)</p>
          <div v-if="offer.children.length > 0">
            <p>Age de chaque enfant :</p>

            <ul>
              <li v-for="(child, index) in offer.children" :key="index">
                {{ child ? child + ' ans' : '... ans' }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="right-side">
        <img src="@/assets/images/agentCard.png" alt="agentCard" class="agent-card" />
        <!--        <p><strong>Agent :</strong> {{ selectedAgent?.name }} – {{ selectedAgent?.email }}</p>-->
      </div>
    </section>

    <!--  SECTION TABLEUR  -->
    <!--    <section>-->
    <!--      <h4>Vol Aller</h4>-->
    <!--      <p>-->
    <!--        Départ : {{ offer.departureFlight.departure }} / Arrivée :-->
    <!--        {{ offer.departureFlight.arrival }}-->
    <!--      </p>-->
    <!--      <p>-->
    <!--        Compagnie : {{ offer.departureFlight.company }} – Bagage :-->
    <!--        {{ offer.departureFlight.baggage }}-->
    <!--      </p>-->

    <!--      <h4>Vol Retour</h4>-->
    <!--      <p>-->
    <!--        Départ : {{ offer.returnFlight.departure }} / Arrivée :-->
    <!--        {{ offer.returnFlight.arrival }}-->
    <!--      </p>-->
    <!--      <p>-->
    <!--        Compagnie : {{ offer.returnFlight.company }} – Bagage :-->
    <!--        {{ offer.returnFlight.baggage }}-->
    <!--      </p>-->
    <!--    </section>-->

    <!--    <section>-->
    <!--      <h4>Hôtels</h4>-->
    <!--      <div v-for="(hotel, index) in offer.hotels" :key="index">-->
    <!--        <p>-->
    <!--          <strong>{{ hotel.name }}</strong> ({{ hotel.roomType }}) – {{ hotel.nights }} nuits –-->
    <!--          {{ hotel.halfBoard ? 'Demi-pension' : 'Sans pension' }}-->
    <!--        </p>-->
    <!--        <img v-if="hotel.imageUrl" :src="hotel.imageUrl" alt="Image hôtel" class="hotel-image" />-->
    <!--      </div>-->
    <!--    </section>-->

    <!--    <section>-->
    <!--      <p><strong>Montant total :</strong> {{ offer.totalAmount }} €</p>-->
    <!--      <p><strong>Acompte :</strong> {{ offer.deposit }} €</p>-->
    <!--      <p><strong>Référence :</strong> {{ offer.reference }}</p>-->
    <!--    </section>-->
  </div>
</template>

<style scoped>
.pdf-preview {
  width: 210mm;
  padding: 20mm;
  height: 100%;
  background: white;
  color: #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: auto;

  .general-info {
    display: flex;
    justify-content: space-between;

    .left-side {
      flex: 2;

      .section-container {
        margin-bottom: 30px;

        .icon-container {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: #2e3092;
          padding: 5px;
          clip-path: polygon(75% 0%, 85% 50%, 75% 100%, 0% 100%, 0 50%, 0% 0%);
          width: 75%;
          margin-bottom: 10px;
          border-radius: 5px;

          p {
            color: white;
            font-weight: 600;
            margin: 0;
            font-size: 16px;
          }

          .icon {
            color: white;
            font-size: 16px;
          }
        }
      }
    }

    .right-side {
      flex: 1;
    }

    h3 {
      margin-bottom: 20px;
      color: #2e3092;
    }

    .agent-card {
      width: 200px;
      height: auto;
    }

    ul {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      li {
        border: 1px solid #ccc;
        background-color: #f0f0f0;
        color: #333;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 14px;
      }
    }
  }

  .logo {
    width: 275px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  h4 {
    font-size: 22px;
    margin-top: 20px;
    margin-bottom: 5px;
    color: #2e3092;
  }

  p {
    margin: 5px 0;
    font-size: 16px;
  }

  .hotel-image {
    max-width: 200px;
    height: auto;
    margin-top: 10px;
    border-radius: 5px;
  }
}
</style>
