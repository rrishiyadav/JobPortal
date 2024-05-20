import axios from 'axios'

class AuthApi {

    PostApiCall(url, data) {
        return axios.post(url, data)
    } 
   
}


const SERVER = 'http://tutorials.codebetter.in:7082/cbjobportal'

export const urls = {
    LOGIN: `${SERVER}/auth/login`,
    REGISTER: `${SERVER}/candidate/save`,

}

export default new AuthApi