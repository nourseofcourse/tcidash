import TeamsService from '@/services/TeamsService.js'

export const mutations = {
  SET_TEAMS(state, teams) {
    state.all = teams
  },
  SET_TEAM(state, team) {
    state.team = team
  }
}

export const actions = {
  fetchTeams({ commit }) {
    return TeamsService.getTeams().then(response => {
      commit('SET_TEAMS', response.data)
    })
  },
  fetchTeam({ commit }, id) {
    return TeamsService.getTeam(id).then(response => {
      commit('SET_TEAM', response.data)
    })
  },
  fetchTeamBySlug({ commit }, slug) {
    return TeamsService.getTeamBySlug(slug).then(response => {
      const team = response.data.pop()
      commit('SET_TEAM', team)
    })
  }
}
