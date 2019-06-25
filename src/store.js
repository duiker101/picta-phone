import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        playerCount: 5,
        timer: 0,
        stage: 0,
        drawings: [],
        status: 0,
        words: []
    },
    getters: {
        lastDrawing(state) {
            if (state.drawings.length === 0)
                return null

            return state.drawings[state.drawings.length - 1]
        },
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
                let d = state.drawings[i]
                if (!!d)
                    r.push(d)
                return r;
            }).reduce(function (a, b) {
                return a.concat(b);
            });
        },

    },
    mutations: {
        addDrawing(state, payload) {
            state.drawings = [...state.drawings, payload]
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
            state.drawings = [];
            state.status = 0;
            state.words = [];
        }
    },
    actions: {
        addDrawing({commit}, payload) {
            commit('addDrawing', payload);
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
