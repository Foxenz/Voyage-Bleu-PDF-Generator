<script setup lang="ts">
import HotelCard from '@/components/HotelCard.vue'
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

const formatDateTime = (date: string): string => {
  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) {
    return '...'
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }

  const hours = parsedDate.getHours().toString().padStart(2, '0')
  const minutes = parsedDate.getMinutes().toString().padStart(2, '0')

  return `${parsedDate.toLocaleDateString('fr-FR', dateOptions)} à ${hours}h${minutes}`
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

    <section class="flight">
      <h4>Vol Aller</h4>

      <table>
        <thead>
          <tr>
            <th>Départ</th>
            <th>Arrivée</th>
            <th>Bagage</th>
            <th>Compagnie</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ formatDateTime(offer.departureFlight.departure) }}</td>
            <td>{{ formatDateTime(offer.departureFlight.arrival) }}</td>
            <td>{{ offer.departureFlight.baggage }}</td>
            <td>{{ offer.departureFlight.company }}</td>
          </tr>
        </tbody>
      </table>

      <h4>Vol Retour</h4>

      <table>
        <thead>
          <tr>
            <th>Départ</th>
            <th>Arrivée</th>
            <th>Bagage</th>
            <th>Compagnie</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ formatDateTime(offer.returnFlight.departure) }}</td>
            <td>{{ formatDateTime(offer.returnFlight.arrival) }}</td>
            <td>{{ offer.returnFlight.baggage }}</td>
            <td>{{ offer.returnFlight.company }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="hotels">
      <div class="icon-container">
        <font-awesome-icon :icon="['fas', 'bed']" class="icon" />
        <p>Hôtel</p>
      </div>

      <HotelCard v-for="(hotel, index) in offer.hotels" :key="index" :hotel="hotel" />
    </section>

    <section class="price">
      <div class="deposit-container">
        <div class="icon-container">
          <font-awesome-icon :icon="['fas', 'wallet']" class="icon" />
          <p>Acompte</p>
        </div>
        <p>{{ offer.deposit }} €</p>
      </div>

      <div class="price-container">
        <div class="icon-container">
          <font-awesome-icon :icon="['fas', 'money-bill']" class="icon" />
          <p>Prix Total</p>
        </div>
        <p>{{ offer.totalAmount }} €</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pdf-preview {
  width: 210mm;
  min-height: 297mm;
  padding: 20mm;
  height: 100%;
  background: white;
  color: #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: auto;

  .logo {
    width: 275px;
    margin-bottom: 20px;
  }

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

  .flight {
    margin-top: 20px;

    h4 {
      margin-bottom: 10px;
      color: #2e3092;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;

      th,
      td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
        word-break: break-word;
        white-space: normal;
        vertical-align: top;
      }

      th {
        background-color: #2e3092;
        color: white;
        font-weight: 600;
      }

      td {
        height: 40px;
        vertical-align: middle;
      }

      th:nth-child(1),
      td:nth-child(1),
      th:nth-child(2),
      td:nth-child(2) {
        width: 30%;
      }

      th:nth-child(3),
      td:nth-child(3),
      th:nth-child(4),
      td:nth-child(4) {
        width: 20%;
      }
    }
  }

  .hotels {
    margin-top: 20px;

    h4 {
      margin-bottom: 10px;
      color: #2e3092;
    }

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

  .price {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;

    .deposit-container,
    .price-container {
      width: 48%; /* Un petit espace entre les deux */
    }

    .deposit-container p:last-child,
    .price-container p:last-child {
      text-align: right;
      margin: 0;
    }

    .deposit-container p:last-child {
      text-align: left;
    }

    .icon-container {
      display: flex;
      align-items: center;
      gap: 10px;
      background-color: #2e3092;
      padding: 5px;
      margin-bottom: 10px;
      border-radius: 5px;
      width: 100%;

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
</style>
