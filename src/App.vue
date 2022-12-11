<template>
  <div class="wrapper">
    <div class="container">
      <div class="logo">
        <img src="@/assets/logo.png" alt="logo">
      </div>
      <div class="content">

        <button type="button" class="btn" :class="{active: isMain}" @click="isMain = true">Главная</button>
        <button type="button" class="btn" :class="{active: !isMain}" @click="isMain = false">Избранное</button>

        <div class="cards_wrapper" v-if="isMain">
          <button type="button" class="btn" @click="cards.push('')" :disabled="!(cards.length < 5)">+</button>
          <card-component v-for="(items, i) in cards" :key="i" @deleteEl="remove(i)"/>
        </div>

        <div class="cards_wrapper" v-else>
          <card-component is-favorite/>
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
      cards: [""],
      confirmRemove: false,
      modalIsShown: false,
    }
  },
  methods: {
    remove(i) {
      this.cards.splice(i, 1);
    }
  },
}
</script>

<style>
* {
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
  padding: 20px 10px 0 10px;
  width: 100%;
}

.logo {
  text-align: center;
  margin-bottom: 40px;
}

.logo img {
  max-height: 100px;
  object-fit: contain;
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
  padding: 10px 0;
}

input {
  font-size: 16px;
  padding: 5px 10px;
  width: 25%;
}

@media screen and (max-width: 768px) {
  .btn {
    font-size: 10px;
    padding: 5px 10px;
  }
}
</style>
