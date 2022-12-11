import axios from "axios";
const state = () => ({
    cities: [],
})

const mutations = {
    addCity(state, resp) {
        state.data.push(resp);
    },
    delCity(state, i) {
        state.data.splice(i, 1);
    },
}

const actions = {
    getWeather(context, {lat, lon}) {
        axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=a73b2280087c6d0d7f910c35afe3f75c&lang=uk&units=metric`)
            .then(({data}) => {
                context.commit('addCity', data);
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