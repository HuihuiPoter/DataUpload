import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        username: "小平",
        password: "",
        loginState: false,
        base_color: "rgba(10, 194, 126, 1)",
        list: []     
    },
    mutations: {
        // loginMain(state){
        //     state.loginState = false
        // }
        returnList(state, payload){
            state.list = payload.list
        },
        audioState(state, payload){
            //state.list.splice(payload.handleIndex, 1, {content: payload.content, audio_exist: true, photo_exist: true})
            Vue.set(state.list[payload.handleIndex], 'audio_exist', payload.audio_exist)
        },
        imgState(state, payload) {
            Vue.set(state.list[payload.handleIndex], 'photo_exist', payload.image_exist)
        }
    }
})

export default store