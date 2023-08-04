import axios from 'axios'
const axiosRefresh = axios.create()
const refreshtoken = {
  state: {
  },
  mutations: {
  },
  actions: {
    async refreshtt (dispatch) {
      await axiosRefresh
        .post('https://www.rollthun.site/accounts/token/refresh/',{}, { withCredentials : true}) // 로그인 URL로 ID, PW를 보냄
        .then((response) => {
          const newToken = response.data.access
          localStorage.setItem('access_token', newToken)
        })
    }
  }
}
export default refreshtoken
