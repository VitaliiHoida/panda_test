<template>
  <div class="item_wrapper">
    <div class="head">
      <button type="button" class="btn btn-remove" @click="openModalLocal">Видалити</button>
    </div>

    <div class="body">
      <div class="table">
        <div><h3> {{ item.name }} </h3></div>
        <div><h4> {{ localCities[index]?.current?.weather[0].description }} </h4></div>
        <div>Температура: {{ localCities[index]?.current?.temp }} °C</div>
        <div>Відчувається як: {{ localCities[index]?.current?.feels_like }} °C</div>
        <div>Вологість: {{ localCities[index]?.current?.humidity }} %</div>
        <div>УФ: {{ localCities[index]?.current?.uvi }}</div>
        <div>Точка роси: {{ localCities[index]?.current?.dew_point }}°C</div>
        <div>Видимість: {{ localCities[index]?.current?.visibility / 1000 }} км</div>
        <div>Тиск: {{ localCities[index]?.current?.pressure }} гПа</div>
        <div>Швидкість вітру: {{ localCities[index]?.current?.wind_speed }} м/с</div>
      </div>
      <div class="chart">
        <Line :data="chartData" :options="chartOptions"/>
      </div>
    </div>


    <modal-component :isActive="show" @closeModal="close">
      <template #default>
        <h2 class="modal_text">Видалити місто {{ item.name }} зі списку обраного?</h2>
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

import {mapActions, mapState} from "vuex";

export default {
  name: 'CardFavorite',
  components: {
    ModalComponent,
    Line,
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true,
    }
  },
  emits: ['removeElLocal'],
  data() {
    return {
      show: false,
      chartOptions: {
        responsive: true
      },
    }
  },
  computed: {
    ...mapState('weather', ['localCities']),
    chartData() {
      let arrLabels = [];
      let points = [];
      this.localCities[this.index]?.hourly?.forEach(item => {
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
    ...mapActions('weather', ['getLocalWeather']),
    openModalLocal() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    deleteItem() {
      this.$emit('removeElLocal');
      this.show = false;
    },
  },
  mounted() {
    this.getLocalWeather({lat: this.item.lat, lon: this.item.lng})
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

}

</style>