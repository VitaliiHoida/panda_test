import axios from "axios";

const state = () => ({
    cities: [],
    localCities: [],
})

const mutations = {
    addCity(state, {index, ...resp}) {
        state.cities[index] = resp;
    },
    addEmpty(state) {
        state.cities.push(null);
    },
    delCity(state, i) {
        state.cities.splice(i, 1);
    },
    addLocalCity(state, resp) {
        state.localCities.push(resp);
    },
}

const actions = {
    getWeather(context, {lat, lon, index, city}) {
        axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=a73b2280087c6d0d7f910c35afe3f75c&lang=uk&units=metric`)
            .then(({data}) => {
                context.commit('addCity', {index, city, ...data});
            })
            .catch(error => {
                if (error?.response?.data?.errors) {
                    console.error(error.response.data.errors)
                } else {
                    console.error(error)
                }
            })
    },
    getLocalWeather(context, {lat, lon}) {
        axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=a73b2280087c6d0d7f910c35afe3f75c&lang=uk&units=metric`)
            .then(({data}) => {
                context.commit('addLocalCity', data);
            })
            .catch(error => {
                if (error?.response?.data?.errors) {
                    console.error(error.response.data.errors)
                } else {
                    console.error(error)
                }
            })
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}