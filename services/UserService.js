import axios from '@/plugins/axios'

export default {
  getUserByUsername(username) {
    return axios.get('/procommunity/v1/users/' + username)
  },
  getUsers() {
    return axios.get('/procommunity/v1/users')
  },
  addUser(data, headers) {
    return axios.post('/wp/v2/users', data, headers)
  }
}
