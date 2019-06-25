import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        playerCount: 5,
        timer: 0,
        stage: 0,
        drawings: [],
        images: [],
        status: 0,
        words: []
    },
    getters: {
        lastWord(state) {
            if (state.words.length === 0)
                return null

            return state.words[state.words.length - 1]
        },
        isFinished(state) {
            return state.stage >= state.playerCount - 1
        },
        isStart(state) {
            return state.status === 0
        },
        isGame(state) {
            return state.status === 1
        },
        isResult(state) {
            return state.status === 2
        },
        result(state) {
            if (state.words.length <= 0)
                return []

            return state.words.map(function (v, i) {
                let r = [v];
                let d = state.images[i]
                if (!!d)
                    r.push(d)
                return r;
            }).reduce(function (a, b) {
                return a.concat(b);
            });
        },

    },
    mutations: {
        addImage(state, payload) {
            state.images = [...state.images, payload]
        },
        addWord(state, word) {
            state.words = [...state.words, word];
        },
        nextStage(state,) {
            state.stage = state.stage + 1;
        },
        setStatus(state, status) {
            state.status = status;
        },
        reset(state) {
            state.stage = 0;
            state.images = [];
            state.status = 0;
            state.words = [];
        }
    },
    actions: {
        addImage({commit}, payload) {
            commit('addImage', payload);
        },
        addWord({commit}, word) {
            commit('addWord', word);
        },
        nextStage({commit}) {
            commit('nextStage');
        },
        start({commit}) {
            commit('setStatus', 0);
            commit('reset');
        },
        game({commit}) {
            commit('setStatus', 1);
        },
        result({commit}) {
            commit('setStatus', 2);
        },
    }
})
