import axios from '@/plugins/axios'

export default {
  getTeams() {
    return axios.get('/wp/v2/teams?per_page=100&orderby=title&order=asc')
  },
  getTeam(id) {
    return axios.get('/wp/v2/teams/' + id)
  },
  getTeamBySlug(slug) {
    return axios.get('/wp/v2/teams?slug=' + slug)
  },
  updateTeamData(id, data, headers) {
    return axios.post('/acf/v3/posts/' + id, data, headers)
  },
  addTeam(data, headers) {
    return axios.post('/wp/v2/teams', data, headers)
  }
}
