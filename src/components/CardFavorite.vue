<template>
  <div class="item_wrapper">
    <div class="head">
      <button type="button" class="btn btn-remove" @click="openModalLocal">Видалити</button>
    </div>

    <div class="body">
      <div class="table">
        <div ><h3> {{ item.name }} </h3></div>
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
        <h2 class="modal_text">Видалити місто {{}} з цього списку?</h2>
      </template>
      <template #footer>
        <button class="btn btn-remove" type="button" @click="deleteItem">
          Так
        </button>
        <button class="btn" type="button" @click="close">
          Ні
        </button>
      </template>
    </modal-component>


  </div>
</template>

<script>

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

import {mapActions} from "vuex";

export default {
  name: 'CardComponent',
  components: {
    ModalComponent,
    Line,
  },
  props: {
    item: {
      type: Object,
      required: true
    },
  },
  emits: ['deleteEl', 'removeElLocal', 'refresh'],
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
      return {
        labels: arrLabels,
        datasets: [
          {
            label: 'Графік температури до кінця доби',
            data: points,
            backgroundColor: 'rgb(255, 165, 0)',
            borderColor: 'rgb(255, 165, 0)'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions('weather', ['getWeather']),
    openModal() {
      this.show = true;
      this.$emit('removeEl')
    },
    openModalLocal() {
      this.show = true;
      this.$emit('removeElLocal')
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

    },
    addToFavorites() {
      if (this.city) {
        let localCities = JSON.parse(localStorage.getItem('localCities')) || [];
        localCities.push(this.city);
        localStorage.setItem('localCities', JSON.stringify(localCities));
        this.$emit('refresh');
      }
    }
  },
  created() {
    this.getWeather({lat: this.item.lat, lon: this.item.lng})
  }
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
  flex-wrap: wrap;
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
  flex-wrap: wrap;
  width: 100%;
}

.body .table, .chart {
  width: 50%;
}

.body .table {
  display: flex;
  flex-direction: column;
}

.body .table div {
  padding: 5px 0;
}

.body .table div h4 {
  margin: 0;
  text-transform: uppercase;
}

@media screen and (max-width: 768px) {
  .table, .chart {
    width: 100%;
  }

  .head-btns {
    margin-top: 10px;
  }
}

</style>