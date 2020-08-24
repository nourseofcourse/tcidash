import StatsService from '@/services/StatsService.js'

export const mutations = {
  SET_STATS(state, stats) {
    state.all = stats
  },
  SET_USER_STATS(state, stats) {
    state.stats = stats
  }
}

export const actions = {
  fetchStats({ commit }) {
    return StatsService.getStats().then(response => {
      commit('SET_STATS', response.data)
    })
  },
  fetchUserStats({ commit }, id) {
    return StatsService.getUserStats(id).then(response => {
      commit('SET_USER_STATS', response.data)
    })
  }
}
