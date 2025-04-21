import './assets/main.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import {
  faBed,
  faCalendarDays,
  faMoneyBill,
  faUserGroup,
  faWallet,
} from '@fortawesome/free-solid-svg-icons'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* add icons to the library */
library.add(faCalendarDays, faUserGroup, faBed, faMoneyBill, faWallet)

const app = createApp(App)

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
