<template>
  <div class="wrapper">

    <div class="logo">
      <img src="https://cdn.abo.media/upload/article/jzjv9rf5khmrx9xamxgc.jpg" alt="logo">
    </div>

    <div class="container">

      <div class="content">

        <button type="button" class="btn" :class="{active: isMain}" @click="isMain = true">Головна</button>
        <button type="button" class="btn" :class="{active: !isMain}" @click="isMain = false">Обране</button>

        <div class="cards_wrapper" v-if="isMain">
          <button type="button" class="btn" @click="addCard" :disabled="!(cards.length < 5)">+</button>
          <card-component v-for="(items, i) in cards" :key="i"  @deleteEl="remove(i)"  :index="i"/>
        </div>

        <div class="cards_wrapper" v-else>
          <card-favorite v-for="(item, i) in localCities"
                         @removeElLocal="removeLocal(i)"
                         @refresh="renewLocal"
                         :item="item"
                         :index="i"
                         :key="i"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardComponent from "@/components/CardComponent.vue";
import CardFavorite from "@/components/CardFavorite.vue";
import {mapMutations} from "vuex";

export default {
  name: 'App',
  components: {
    CardComponent,
    CardFavorite,
  },
  data() {
    return {
      isMain: true,
      cards: [{id: 0}],
      confirmRemove: false,
      modalIsShown: false,
      i: 0,
      localCities: JSON.parse(localStorage.getItem('localCities')),
    }
  },
  computed: {},
  methods: {
    ...mapMutations('weather', ['delCity']),
    addCard(){
      this.i ++;
      this.cards.push({id: this.i});
    },
    remove(i) {
      console.log(i);
      this.cards.splice(i, 1);
      this.delCity(i);
    },
    removeLocal(index){
      this.localCities.splice(index, 1);
      localStorage.setItem('localCities', JSON.stringify(this.localCities));
    },
  },
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

.wrapper {
  width: 100%;
  max-width: 1200px;
  min-width: 360px;
  margin: 0 auto;
}

.container {
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
}

.logo {
  text-align: center;
  margin-bottom: 20px;
}

.logo img {
  width:100%;
  max-height: 150px;
  object-fit: cover;
  object-position: top;
}

.btn {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  text-transform: uppercase;
  color: #fff;
  background: #1a73e8;
  border: none;
  border-radius: 5px;
  transition: 0.3s ease-in;
}

.btn:hover,
.btn.active {
  background: mediumblue;
  transition: 0.3s ease-in;
}

.btn-remove {
  background: indianred;
}

.btn-remove:hover {
  background: darkred;
}

.btn:disabled {
  background: gray;
  cursor: default;
}

.content .btn:first-child {
  margin-right: 20px;
}

.cards_wrapper {
  margin-top: 20px;
}

input {
  font-size: 16px;
  padding: 4px 8px;
}

.chart canvas {
  width: 100% !important;
  height: auto !important;
}

.modal_text {
  text-align: center;
  margin: 0;
}

@media screen and (max-width: 768px) {
  .btn {
    font-size: 10px;
    padding: 5px 10px;
  }
}
</style>
