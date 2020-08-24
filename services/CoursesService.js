import axios from '@/plugins/axios'

export default {
  getCourses(headers) {
    return axios.get('/sensei/v1/courses', headers)
  },
  getCourse(id) {
    return axios.get('/sensei/v1/courses/' + id)
  }
}
