<template>
<div class="main-wrapper"
     :class="{ 'open-dropdown': shown }"
>
<div class="select-wrapper">
  <div class="select" readonly="readonly" @click.stop="show">
    <div class="drop_item" v-if="defaultValue">
      {{ defaultValue.name }}
    </div>
    <input type="text"
           placeholder="Введіть назву транслітом"
           class="search-input"
           v-model="search"
           v-if="defaultValue.length === 0"
    />
  </div>
</div>
<div class="droped">
  <ul class="droplist">
    <li v-for="(item, i) in filteredList"
        :key="i" @click="choose(item)"
    >
      <span> {{ item.name }} </span>
    </li>
    <li class="no_matches" v-if="filteredList?.length === 0">
      <span>Не знайдено</span>
    </li>
  </ul>
</div>
</div>
</template>
<script>
export default {
  name: 'AutoInput',
  props: {
    defaultValue: Object,
    values: Array,
  },
  data() {
    return {
      shown: false,
      search: '',
    }
  },
  methods: {
    choose(e) {
      this.show();
      this.$emit("choose-drop", e);
      this.search = '';
    },
    show() {
      this.shown = !this.shown;
    },
  },
  computed: {
    filteredList() {
      return this.values?.filter( item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  created() {
    document.addEventListener('click', this.hide);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.hide);
  }
};
</script>

<style scoped>
.main-wrapper.open-dropdown .droped {
  border: 1px solid #fff;
  height: auto;
}
.main-wrapper .droped{
  border: none;
  position: absolute;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  margin: 5px 0 0 0;
  width: auto;
  left: 0;
  right: 0;
  height: 0;
  z-index: 5;
}
.main-wrapper ul {
  border: none;
  list-style: none;
  background-color: #fff;
  border-radius: 4px;
  padding: 0;
  overflow: hidden;
  width: auto;
  left: 0;
  right: 0;
  margin: 0;
}
.main-wrapper ul li {
  line-height: 16px;
  font-size: 16px;
  padding: 10px 15px;
  color: #000;
}
.main-wrapper ul li:hover {
  background-color: #0d6efd;
}
.main-wrapper {
  position: relative;
  cursor: default;
  width: 220px;
}
.select {
  display: flex;
  flex-wrap: wrap;
  min-height: 46px;
  border-radius: 4px;
}
.drop_item{
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 3px;
  background: #fff;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
}

.search-input{
  width: 100%;
}

.no_matches{
  color: #a9a9a9;
}
.main-wrapper ul li.no_matches:hover{
  background-color: transparent;
}
</style>
