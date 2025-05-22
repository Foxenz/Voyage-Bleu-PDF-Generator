<script setup lang="ts">
import { agents } from '@/data/agent'
import html2pdf from 'html2pdf.js'
import { reactive } from 'vue'
import { type boardType, boardTypeTranslations, type Offer } from '@/types/offer'

const emit = defineEmits(['update'])
const props = defineProps<{ offer: Offer }>()
const form = reactive(props.offer)

const addChild = () => form.children.push('')
const removeChild = (index: number) => form.children.splice(index, 1)

const addDepartureFlight = () => {
  form.departureFlights.push({
    departure: '',
    arrival: '',
    baggage: '',
    company: '',
  })
}
const removeDepartureFlight = (index: number) => {
  if (form.departureFlights.length > 1) form.departureFlights.splice(index, 1)
}
const addReturnFlight = () => {
  form.returnFlights.push({
    departure: '',
    arrival: '',
    baggage: '',
    company: '',
  })
}
const removeReturnFlight = (index: number) => {
  if (form.returnFlights.length > 1) form.returnFlights.splice(index, 1)
}

const addHotel = () => {
  form.hotels.push({
    name: '',
    roomType: '',
    nights: 1,
    boardType: '',
    image: null,
    imageUrl: '',
  })
}
const removeHotel = (index: number) => form.hotels.splice(index, 1)
const handleHotelImage = (e: Event, index: number) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    form.hotels[index].image = file
    form.hotels[index].imageUrl = URL.createObjectURL(file)
  }
}

const boardTypes: boardType[] = [
  'selfCatering',
  'breakfast',
  'halfBoard',
  'fullBoard',
  'allInclusive',
]

const getBase64ImageWithDimensions = async (
  url: string,
): Promise<{
  src: string
  width: number
  height: number
}> => {
  const response = await fetch(url)
  const blob = await response.blob()

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const img = new Image()
      img.onload = () => {
        resolve({
          src: reader.result as string,
          width: img.width,
          height: img.height,
        })
      }
      img.onerror = reject
      img.src = reader.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

const onSubmit = async () => {
  emit('update')

  // Chemin vers votre image
  const header = new URL('../assets/images/header.PNG', import.meta.url).href
  const footer = new URL('../assets/images/footer.PNG', import.meta.url).href

  const headerImg = await getBase64ImageWithDimensions(header)
  const footerImg = await getBase64ImageWithDimensions(footer)

  const opt = {
    filename: `${form.destination || 'offre-voyage'}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
  }

  try {
    const element = document.querySelector('.pdf-preview')

    await html2pdf()
      .from(element)
      .set(opt)
      .toPdf()
      .get('pdf')
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages()
        const pageWidth = pdf.internal.pageSize.getWidth()
        const headerHeight = (headerImg.height / headerImg.width) * pageWidth
        const footerHeight = (footerImg.height / footerImg.width) * pageWidth

        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i)

          pdf.addImage(headerImg.src, 'PNG', 0, 0, pageWidth, headerHeight)

          pdf.addImage(
            footerImg.src,
            'PNG',
            0,
            pdf.internal.pageSize.getHeight() - footerHeight,
            pageWidth,
            footerHeight,
          )
        }
      })
      .save()
  } catch (error) {
    console.error('Erreur génération PDF:', error)
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="form-container">
    <section>
      <h2>Informations générales</h2>
      <div class="form-group">
        <label>Destination</label>
        <input v-model="form.destination" type="text" placeholder="Titre de la destination" />
      </div>

      <div class="form-group">
        <label>Agent de voyage</label>
        <select v-model="form.agentId">
          <option disabled value="">Sélectionner un agent</option>
          <option v-for="agent in agents" :key="agent.id" :value="agent.id">
            {{ agent.name }}
          </option>
        </select>
      </div>

      <div class="form-group form-dates">
        <label>Dates</label>
        <input v-model="form.dateStart" type="date" />
        <input v-model="form.dateEnd" type="date" />
      </div>
    </section>

    <section>
      <h2>Voyageurs</h2>
      <div class="form-group">
        <label>Nombre d'adultes</label>
        <input v-model="form.adults" type="number" min="1" />
      </div>

      <div class="form-group">
        <label>Enfants</label>
        <div class="child-list">
          <div class="child-input" v-for="(child, index) in form.children" :key="index">
            <input v-model="form.children[index]" type="number" placeholder="Âge de l'enfant" />
            <button type="button" class="remove" @click="removeChild(index)">✕</button>
          </div>
          <button type="button" class="add" @click="addChild">Ajouter un enfant</button>
        </div>
      </div>
    </section>

    <section>
      <h2>Vols aller</h2>
      <div class="form-group">
        <div v-for="(flight, index) in form.departureFlights" :key="index" class="form-group">
          <input v-model="flight.departure" type="datetime-local" placeholder="Départ" />
          <input v-model="flight.arrival" type="datetime-local" placeholder="Arrivée" />
          <input v-model="flight.baggage" type="text" placeholder="Bagage" />
          <input v-model="flight.company" type="text" placeholder="Compagnie" />
          <button
            type="button"
            class="remove"
            @click="removeDepartureFlight(index)"
            v-if="form.departureFlights.length > 1"
          >
            Supprimer le vol
          </button>
        </div>
        <button type="button" class="add" @click="addDepartureFlight">Ajouter un vol</button>
      </div>

      <h2>Vols retour</h2>
      <div class="form-group">
        <div v-for="(flight, index) in form.returnFlights" :key="index" class="form-group">
          <input v-model="flight.departure" type="datetime-local" placeholder="Départ" />
          <input v-model="flight.arrival" type="datetime-local" placeholder="Arrivée" />
          <input v-model="flight.baggage" type="text" placeholder="Bagage" />
          <input v-model="flight.company" type="text" placeholder="Compagnie" />
          <button
            type="button"
            class="remove"
            @click="removeReturnFlight(index)"
            v-if="form.returnFlights.length > 1"
          >
            Supprimer le vol
          </button>
        </div>
        <button type="button" class="add" @click="addReturnFlight">Ajouter un vol</button>
      </div>
    </section>

    <section>
      <h2>Hôtels</h2>
      <div class="form-group">
        <div v-for="(hotel, index) in form.hotels" :key="index" class="form-group">
          <input v-model="hotel.name" type="text" placeholder="Nom de l'hôtel" />
          <input v-model="hotel.roomType" type="text" placeholder="Type de chambre" />
          <input v-model="hotel.nights" type="number" placeholder="Nombre de nuits" />
          <select v-model="hotel.boardType">
            <option disabled value="">Sélectionner le type de pension</option>
            <option v-for="type in boardTypes" :key="type" :value="type">
              {{ boardTypeTranslations[type] }}
            </option>
          </select>
          <input type="file" @change="(e) => handleHotelImage(e, index)" />
          <button type="button" class="remove" @click="removeHotel(index)">
            Supprimer l'hôtel
          </button>
        </div>
        <button type="button" class="add" @click="addHotel">Ajouter un hôtel</button>
      </div>
    </section>

    <section>
      <h2>Tarifs</h2>
      <div class="form-group">
        <label>Montant total (€)</label>
        <input v-model="form.totalAmount" type="number" />
      </div>
      <div class="form-group">
        <label>Acompte (€)</label>
        <input v-model="form.deposit" type="number" />
      </div>
    </section>

    <button class="submit-btn" type="submit">📄 Générer le PDF</button>
  </form>
</template>

<style scoped>
.form-container {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;

  h2 {
    font-size: 1.4rem;
    color: #2c3e50;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
  }

  .form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    input,
    select {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
    }

    select {
      appearance: none;
      background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>')
        no-repeat right 10px center;
      background-size: 18px;
      cursor: pointer;
    }

    input[type='file'] {
      padding: 4px;
    }

    .remove {
      background: #e74c3c;
      border: none;
      color: white;
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
    }

    .add {
      background-color: #2e3092;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 10px;

      &:hover {
        background-color: #11138d;
      }
    }

    .child-list .child-input {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      input {
        flex-grow: 1;
        margin-right: 10px;
      }
    }
  }

  .form-dates {
    display: flex;
    gap: 10px;
  }
}

.submit-btn {
  display: block;
  width: 100%;
  background-color: #2ecc71;
  border: none;
  padding: 15px;
  font-size: 1.1rem;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #27ae60;
  }
}
</style>
