<template>
  <div class="wrapper">
    <div class="container">
      <div class="logo">
        <img src="@/assets/logo.png" alt="logo">
      </div>
      <div class="content">
        <button type="button" class="active">Главная</button>
        <button type="button">Избранное</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
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

.content button {
  padding: 10px 15px;
  font-size: 16px;
  line-height: 1;
  font-weight: 500;
  cursor: pointer;
  text-transform: uppercase;
  color: #fff;
  background: #1a73e8;
  border: none;
  border-radius: 5px;
  transition: 0.3s ease-in;
}

.content button:hover,
.content button:active {
  background: #4285f4;
  transition: 0.3s ease-in;
}

.content button.active {
  border: 1px solid black;
}

.content button:first-child {
  margin-right: 20px;
}
</style>
