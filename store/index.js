import UserService from '@/services/UserService.js'
import StatsService from '@/services/StatsService.js'
import TeamsService from '~/services/TeamsService'

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  loggedInUser(state) {
    return state.auth.user
  },
  sortUploadedStats(state) {
    const items = [...state.stats.stats].sort(function(a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date)
    })
    return items
  },
  getUserAverageCloseRate(state) {
    return user_id => {
      const items = [...state.stats.all].flatMap((stat, index) =>
        parseInt(stat.user_id) === parseInt(user_id)
          ? state.stats.all[index]
          : []
      )
      let total = 0
      for (let i = 0; i < items.length; i++) {
        total +=
          (parseInt(items[i].accepted) / parseInt(items[i].presented)) * 100
      }
      return (total / items.length).toFixed(2)
    }
  },
  getGraphStatsForUser(state) {
    let items = state.stats.stats
    let arrLength = state.stats.stats.length
    let presented = []
    let accepted = []
    for (let i = 0; i < arrLength; i++) {
      presented.push(items[i].presented)
      accepted.push(items[i].accepted)
    }

    return [
      {
        name: 'Presented',
        data: presented.reverse()
      },
      {
        name: 'Accepted',
        data: accepted.reverse()
      }
    ]
  },
  sortedStats(state) {
    const items = [...state.stats.all].sort((a, b) => {
      return parseInt((a.accepted / a.presented) * 100) <
        parseInt((b.accepted / b.presented) * 100)
        ? 1
        : -1
    })
    return items
  },
  getCurrentMonthStats(state, getters) {
    const items = [...state.stats.all].flatMap((stat, index) =>
      parseInt(new Date(stat.date).getMonth()) ===
      parseInt(new Date().getMonth() - 1)
        ? state.stats.all[index]
        : []
    )
    return items.sort((a, b) => {
      return parseInt((a.accepted / a.presented) * 100) <
        parseInt((b.accepted / b.presented) * 100)
        ? 1
        : -1
    })
    // return [...state.stats.all].filter(stat => {
    //   let date1 = new Date(stat.date).getMonth()
    //   let date2 = new Date().getMonth() - 1
    //   date1 == date2
    // })
    // let date1 = new Date('2019-09-13 13:34:40').getMonth()
    // let date2 = new Date().getMonth() - 1
  },
  getUserById(state) {
    return user_id => {
      let index = state.users.all.findIndex(user => {
        return parseInt(user.id) === parseInt(user_id)
      })
      return state.users.all[index]
    }
  },
  getTeamCoordinators(state) {
    return team_id => {
      return [...state.users.all].flatMap((user, index) =>
        parseInt(user.acf.team.ID) === parseInt(team_id)
          ? state.users.all[index]
          : []
      )
    }
  },
  getTotalTeamCoordinators(state, getters) {
    return team_id => {
      return getters.getTeamCoordinators(team_id).length
    }
  },
  getTeamStats(state, getters) {
    return team_id => {
      const coordinators = getters.getTeamCoordinators(team_id)
      return [...state.stats.all].filter(stat => {
        return coordinators.some(
          coordinator => parseInt(coordinator.id) === parseInt(stat.user_id)
        )
      })
    }
  },
  getUserStats(state) {
    return user_id => {
      return [...state.stats.all].flatMap((stat, index) =>
        parseInt(stat.user_id) === parseInt(user_id)
          ? state.stats.all[index]
          : []
      )
    }
  },
  getTeamAverageCloseRate(state, getters) {
    return team_id => {
      const coordinators = getters.getTeamCoordinators(team_id)
      let items = [...state.stats.all].filter(stat => {
        return coordinators.some(
          coordinator => parseInt(coordinator.id) === parseInt(stat.user_id)
        )
      })
      let total = 0
      for (let i = 0; i < items.length; i++) {
        total +=
          (parseInt(items[i].accepted) / parseInt(items[i].presented)) * 100
      }
      return (total / items.length).toFixed(2)
    }
  },
  getTeamAverageTotalSales(state, getters) {
    return team_id => {
      const coordinators = getters.getTeamCoordinators(team_id)
      let items = [...state.stats.all].filter(stat => {
        return coordinators.some(
          coordinator => parseInt(coordinator.id) === parseInt(stat.user_id)
        )
      })
      let total = 0
      for (let i = 0; i < items.length; i++) {
        total += parseInt(items[i].accepted)
      }
      return (total / items.length).toFixed(0)
    }
  },
  getUserAverageTotalSales(state, getters) {
    return user_id => {
      const items = [...state.stats.all].flatMap((stat, index) =>
        parseInt(stat.user_id) === parseInt(user_id)
          ? state.stats.all[index]
          : []
      )
      let total = 0
      for (let i = 0; i < items.length; i++) {
        total += parseInt(items[i].accepted)
      }
      return (total / items.length).toFixed(0)
    }
  },
  getGraphStatsForTeam(state, getters) {
    let items = getters.getTeamStats(state.teams.team.id)
    let arrLength = items.length
    let presented = []
    let accepted = []
    for (let i = 0; i < arrLength; i++) {
      presented.push(items[i].presented)
      accepted.push(items[i].accepted)
    }
    return [
      {
        name: 'Presented',
        data: presented.reverse()
      },
      {
        name: 'Accepted',
        data: accepted.reverse()
      }
    ]
  }
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('usersLoad')
    await dispatch('statsLoad')
    await dispatch('teamsLoad')
  },
  statsLoad({ commit }) {
    return StatsService.getStats().then(response => {
      commit('stats/SET_STATS', response.data)
    })
  },
  usersLoad({ commit }) {
    return UserService.getUsers().then(response => {
      commit('users/SET_USERS', response.data)
    })
  },
  teamsLoad({ commit }) {
    return TeamsService.getTeams().then(response => {
      commit('teams/SET_TEAMS', response.data)
    })
  }
}
