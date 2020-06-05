import axios from 'axios'
import qs from 'qs'


axios.interceptors.request.use(function (config) {

})
//配置请求
const request = {
  get(api){
    return axios.get(api)
  },
  post(api,para={}){
    return axios.post(api+'?version=v2',qs.stringify(para))
  }
}
//版本加上version=v2
export default  request
