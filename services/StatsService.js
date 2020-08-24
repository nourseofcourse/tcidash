import axios from '@/plugins/axios'

export default {
  getStats() {
    return axios.get('/procommunity/v1/userstats')
  },
  getUserStats(id) {
    return axios.get('/procommunity/v1/userstats/' + id)
  },
  uploadStats(data, headers) {
    return axios.post('procommunity/v1/userstats', data, headers)
  }
}
