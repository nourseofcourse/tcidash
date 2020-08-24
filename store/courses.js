import CoursesService from '@/services/CoursesService.js'

export const mutations = {
  SET_COURSES(state, courses) {
    state.all = courses
  },
  SET_COURSE(state, course) {
    state.course = course
  }
}

export const actions = {
  fetchCourses({ commit }, headers) {
    return CoursesService.getCourses(headers).then(response => {
      commit('SET_COURSES', response.data)
    })
  },
  fetchCourse({ commit }, id) {
    return CoursesService.getCourse(id).then(response => {
      commit('SET_COURSE', response.data)
    })
  }
}
