<script setup lang="ts">
import HotelCard from '@/components/HotelCard.vue'
import { agents } from '@/data/agent'
import type { Agent, Offer } from '@/types/agent'
import { computed, type ComputedRef } from 'vue'
import { formatDate, formatDateTime, formatPrice } from '@/utils/format'

const props = defineProps<{ offer: Offer }>()
const selectedAgent: ComputedRef<Agent> = computed(
  () =>
    agents.find((agent) => agent.id === props.offer.agentId) || {
      id: '0',
      name: "Nom de l'agent",
      phone: "Numéro de de l'agent",
      email: "Email de l'agent",
    },
)
</script>

<template>
  <div class="pdf-preview">
    <section class="general-info">
      <div class="left-side">
        <h3>{{ offer.destination ? offer.destination : 'Entrez un titre de destination' }}</h3>

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
          <div class="child-container" v-if="offer.children.length > 0">
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
        <div class="circle-profil">
          <div class="agent">
            <p>Agent en charge :</p>
            <p class="name">
              {{ selectedAgent.name }}
            </p>

            <div class="icon-text">
              <p class="phone">
                {{ selectedAgent.phone }}
              </p>
              <font-awesome-icon :icon="['fas', 'phone']" class="icon" />
            </div>

            <div class="icon-text">
              <p class="email">
                {{ selectedAgent.email }}
              </p>
              <font-awesome-icon :icon="['fas', 'envelope']" class="icon" />
            </div>

            <hr class="underline" />
          </div>
        </div>
      </div>
    </section>

    <section class="flight">
      <h4>Vols Aller</h4>
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
          <tr v-for="(flight, index) in offer.departureFlights" :key="index">
            <td>{{ formatDateTime(flight.departure) }}</td>
            <td>{{ formatDateTime(flight.arrival) }}</td>
            <td>{{ flight.baggage || '...' }}</td>
            <td>{{ flight.company || '...' }}</td>
          </tr>
        </tbody>
      </table>

      <h4>Vols Retour</h4>
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
          <tr v-for="(flight, index) in offer.returnFlights" :key="index">
            <td>{{ formatDateTime(flight.departure) }}</td>
            <td>{{ formatDateTime(flight.arrival) }}</td>
            <td>{{ flight.baggage || '...' }}</td>
            <td>{{ flight.company || '...' }}</td>
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
        <p>{{ formatPrice(offer.deposit) }}</p>
      </div>

      <div class="price-container">
        <div class="icon-container">
          <font-awesome-icon :icon="['fas', 'money-bill']" class="icon" />
          <p>Prix Total</p>
        </div>
        <p>{{ formatPrice(offer.totalAmount) }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pdf-preview {
  width: 210mm;
  min-height: 297mm;
  padding: 20mm;
  color: #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: auto;

  .general-info {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;

    h3 {
      margin-bottom: 20px;
      color: #2e3092;
      font-weight: 600;
      font-size: 24px;
    }

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
      display: flex;
      align-items: center;

      .circle-profil {
        background-color: #bfe5e3;
        border: 1px solid #ccc;
        border-radius: 15px;
        padding: 20px;
        width: 100%;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

        .agent {
          display: flex;
          flex-direction: column;
          align-items: self-end;
          justify-content: center;
          gap: 5px;

          .name {
            font-weight: 600;
            margin: 0;
            font-size: 16px;
          }

          .icon-text {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 5px;

            .icon {
              color: black;
              font-size: 16px;
            }

            .email {
              border-bottom: 2px solid white;
              padding-bottom: 3px;
            }
          }
        }

        p {
          color: black;
          margin: 0;
          font-size: 14px;
          text-align: center;
        }
      }
    }

    .child-container {
      margin-top: 10px;

      ul {
        margin-top: 6px;
        list-style-type: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        li {
          border: 1px solid #ccc;
          background-color: #bfe5e3;
          color: #333;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 14px;
        }
      }
    }
  }

  .flight {
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
      width: 48%;
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
