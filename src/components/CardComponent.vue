<template>
  <div class="item_wrapper">
    <div class="head">

     <auto-input :values="cityList" :default-value="city" v-if="!isFavorite" @choose-drop="chooseCity"/>

      <div v-if="!isFavorite">
        <button type="button" class="btn">В избранное</button>
        <button type="button" class="btn btn-remove" @click="openModal">Удалить</button>
      </div>
      <button type="button" v-else class="btn btn-remove">Удалить с избр.</button>
    </div>
    <div class="body"> 3423</div>
    <div class="chart">
      <Line :data="chartData" :options="chartOptions"/>
    </div>


    <modal-component :isActive="show" @closeModal="close">
      <template #default>
        <h2>Вы действительно хотите удалить этот город из списка?</h2>
      </template>
      <template #footer>
        <button class="btn btn-remove" type="button" @click="deleteItem">
          Удалить
        </button>
        <button class="btn" type="button" @click="close">
          Отмена
        </button>
      </template>
    </modal-component>


  </div>
</template>

<script>
// import axios from "axios";
import cities from 'cities.json';

import {Line} from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement);

import ModalComponent from "@/components/ModalComponent.vue";
import AutoInput from "@/components/AutoInput.vue";

export default {
  name: 'CardComponent',
  components: {
    ModalComponent,
    Line,
    AutoInput,
  },
  props: {
    isFavorite: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['deleteEl'],
  data() {
    return {
      show: false,
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] } ]
      },
      chartOptions: {
        responsive: true
      },
      city: '',
    }
  },
  computed: {
    cityList(){
      return cities.filter( city => city.country === 'UA');
    }
  },
  methods: {
    openModal() {
      this.show = true;
      this.$emit('removeEl')
    },
    close() {
      this.show = false;
    },
    deleteItem() {
      this.$emit('deleteEl');
      this.show = false;
    },
    chooseCity(e) {
      if (this.city === e) {
        this.city = '';
      } else {
        this.city = e;
        // axios.get('https://api.openweathermap.org/data/3.0/onecall?lat='+${this.city.lat}+'.&lon='+${this.city.lon}+'&exclude={part}&appid=878f5c89511795408b58621ecb3fbfdc')
      }
    },
  },
}
</script>

<style scoped>
.item_wrapper {
  width: 100%;
  margin: 10px 0;
}

.head {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  float: right;
}

.head *:not(:last-child) {
  margin-right: 15px;
}
</style>