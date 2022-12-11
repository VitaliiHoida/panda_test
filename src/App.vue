<template>
  <div class="wrapper">
    <div class="container">
      <div class="logo">
        <img src="https://cdn.abo.media/upload/article/jzjv9rf5khmrx9xamxgc.jpg" alt="logo">
      </div>
      <div class="content">

        <button type="button" class="btn" :class="{active: isMain}" @click="isMain = true">Главная</button>
        <button type="button" class="btn" :class="{active: !isMain}" @click="isMain = false">Избранное</button>

        <div class="cards_wrapper" v-if="isMain">
          <button type="button" class="btn" @click="addCard" :disabled="!(cards.length < 5)">+</button>
          <card-component v-for="(items, i) in cards" :key="i" @deleteEl="remove(i)"/>
        </div>

        <div class="cards_wrapper" v-else>
          <card-component is-favorite v-for="(item, i) in 1" :key="i"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardComponent from "@/components/CardComponent.vue";

export default {
  name: 'App',
  components: {
    CardComponent,
  },
  data() {
    return {
      isMain: true,
      cards: [{id: 0}],
      confirmRemove: false,
      modalIsShown: false,
      i: 0
    }
  },
  methods: {
    addCard(){
      this.i ++;
      this.cards.push({id: this.i});
    },
    remove(i) {
      this.cards.splice(i, 1);

    }
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
  padding: 5px 10px;
  width: 25%;
}

.chart canvas {
  max-height: 250px;
}

@media screen and (max-width: 768px) {
  .btn {
    font-size: 10px;
    padding: 5px 10px;
  }
}
</style>
