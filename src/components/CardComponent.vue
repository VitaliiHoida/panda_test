<template>
  <div class="item_wrapper" :class="{'fav' : isFav}">
    <div class="head">

      <div class="inputDiv">
        <h3>Місто: &nbsp;</h3>
        <auto-input :values="cityList" :default-value="curCity?.city ? curCity?.city : city" @choose-drop="chooseCity"/>
      </div>
      <div class="head-btns">
        <button type="button" class="btn" @click="addToFavorites" v-if="!isFav">До обраного</button>
        <button type="button" class="btn btn-remove" @click="openModal">Видалити</button>
      </div>


    </div>

    <div class="body">
      <div class="table">
        <div><h3> {{ curCity?.city.name }} </h3></div>
        <div><h4> {{ curCity?.current?.weather[0].description }} </h4></div>
        <div>Температура: {{ curCity?.current?.temp }} °C</div>
        <div>Відчувається як: {{ curCity?.current?.feels_like }} °C</div>
        <div>Вологість: {{ curCity?.current?.humidity }} %</div>
        <div>УФ: {{ curCity?.current?.uvi }}</div>
        <div>Точка роси: {{ curCity?.current?.dew_point }}°C</div>
        <div>Видимість: {{ curCity?.current?.visibility / 1000 }} км</div>
        <div>Тиск: {{ curCity?.current?.pressure }} гПа</div>
        <div>Швидкість вітру: {{ curCity?.current?.wind_speed }} м/с</div>
      </div>
      <div class="chart">
        <Line :data="chartData" :options="chartOptions"/>
      </div>
    </div>


    <modal-component :isActive="show" @closeModal="close">
      <template #default>
        <h2 class="modal_text">Видалити місто {{ curCity?.city.name }} з цього списку?</h2>
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

    <modal-component :isActive="showFav" @closeModal="closeFav">
      <template #default>
        <h2 class="modal_text">Максимальна кількість обраних міст - 5</h2>
        <p>Видаліть 1 місто зі списку для додавання нового</p>
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
  emits: ['deleteEl', 'refresh'],
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      show: false,

      chartOptions: {
        responsive: true
      },
      city: '',
      localLength: '',
      showFav: false,
    }
  },
  computed: {
    ...mapState('weather', ['cities']),
    isFav() {
      let arr = localStorage.getItem('localCities');
      return arr?.includes(JSON.stringify(this.curCity?.city))
    },
    curCity() {
      return this.cities[this.index];
    },
    cityList() {
      return cities.filter(city => city.country === 'UA');
    },
    chartData() {
      let arrLabels = [];
      let points = [];
      this.cities[this.index]?.hourly?.forEach(item => {
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
    },
    close() {
      this.show = false;
    },
    closeFav() {
      this.showFav = false;
    },
    deleteItem() {
      this.$emit('deleteEl');
      this.show = false;
    },
    chooseCity(e) {
      this.city = e;
      this.getWeather({lat: e.lat, lon: e.lng, index: this.index, city: this.city})
    },
    addToFavorites() {
      if (this.curCity?.city) {
        let localCities = JSON.parse(localStorage.getItem('localCities')) || [];
        if (localCities.length === 5) {
          this.showFav = true;
          return;
        } else {
          if (localCities.includes(this.curCity?.city)) {
            return;
          } else {
            localCities.push(this.city);
            localStorage.setItem('localCities', JSON.stringify(localCities));
          }
        }
      }
    }
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

.item_wrapper.fav {
  border: 2px solid darkgoldenrod;
}

.head {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  float: right;
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