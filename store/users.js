import UserService from '@/services/UserService.js'

export const mutations = {
  SET_USERS(state, users) {
    state.all = users
  },
  SET_USER(state, user) {
    state.user = user
  }
}

export const actions = {
  fetchUsers({ commit }) {
    return UserService.getUsers().then(response => {
      commit('SET_USERS', response.data)
    })
  },
  fetchUserByUsername({ commit }, slug) {
    return UserService.getUserByUsername(slug).then(response => {
      let user = response.data.pop()
      commit('SET_USER', user)
    })
  }
}
