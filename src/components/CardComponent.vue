<template>
  <div class="item_wrapper">
    <div class="head">

      <div class="inputDiv" v-if="!isFavorite">
        <h3>Місто: &nbsp;</h3>
        <auto-input :values="cityList" :default-value="city" v-if="!isFavorite" @choose-drop="chooseCity"/>
      </div>
      <div v-if="!isFavorite">
        <button type="button" class="btn">В избранное</button>
        <button type="button" class="btn btn-remove" @click="openModal">Удалить</button>
      </div>
      <button type="button" v-else class="btn btn-remove">Удалить с избр.</button>
    </div>
    <div class="body">
      <div>
        <div v-if="isFavorite"><h3> {{ weather?.name }} </h3></div>
        <div><h4> {{ weather?.current?.weather[0].description }} </h4></div>
        <div>Температура: {{ weather?.current?.temp }} °C</div>
        <div>Відчувається як: {{ weather?.current?.feels_like }} °C</div>
        <div>Вологість: {{ weather?.current?.humidity }} %</div>
        <div>УФ: {{ weather?.current?.uvi }}</div>
        <div>Точка роси: {{ weather?.current?.dew_point }}°C</div>
        <div>Видимість: {{ weather?.current?.visibility / 1000 }} км</div>
        <div>Тиск: {{ weather?.current?.pressure }} гПа</div>
        <div>Швидкість вітру: {{ weather?.current?.wind_speed }} м/с</div>
      </div>
      <div class="chart">
        <Line :data="chartData" :options="chartOptions"/>
      </div>
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
import cities from 'cities.json'; // список всех городов

import {Line} from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement);

import ModalComponent from "@/components/ModalComponent.vue";
import AutoInput from "@/components/AutoInput.vue";

import {mapState, mapActions} from "vuex";

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

      chartOptions: {
        responsive: true
      },
      city: '',
    }
  },
  computed: {
    ...mapState('weather', ['data']),
    weather() {
      return this.data;
    },
    cityList() {
      return cities.filter(city => city.country === 'UA');
    },
    chartData() {
      let arrLabels = [];
      let points = [];
      this.weather?.hourly?.forEach(item => {
        let date = new Date(item.dt * 1000);
        let hrs = date.getHours();
        let dates = date.getDate();
        let current = new Date();
        let curDate = current.getDate()
        if (Math.abs(curDate - dates) === 0) {
          arrLabels.push(hrs + 'г');
          points.push(item.temp)
        }
      });
      return {labels: arrLabels, datasets: [{label: 'Графік температури до кінця доби', data: points}]}
    }
  },
  methods: {
    ...mapActions('weather', ['getWeather']),
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
      this.city = e;
      this.getWeather({lat: e.lat, lon: e.lng})
    },
  },
}
</script>

<style scoped>
.item_wrapper {
  width: 100%;
  margin-top: 10px;
  border: 1px solid gray;
  padding: 15px 10px 0;
  box-sizing: border-box;
  background: #f3f3f3;
}

.head {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  float: right;
}

.inputDiv {
  display: flex;
  align-items: center;
}

.head *:not(:last-child) {
  margin-right: 15px;
}

.body {
  padding: 20px 0;
  display: flex;
  width: 100%;
}

.body > div, .chart {
  width: 50%;
}

.body > div {
  display: flex;
  flex-direction: column;
}

.body > div div {
  padding: 5px 0;
}

.body > div div h4 {
  margin: 0;
  text-transform: uppercase;
}

</style>