import axios from 'axios'

class HrApi {

    PostApiCall(url, data, token) {
        return axios.post(url, data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }

    GetApiCall(url, token) {
        return axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }

    PutApiCall(url, data, token) {
        return axios.put(url, data, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    }

    // PutApi(url, token) {
    //     return axios.put(url, {
    //         headers: {
    //             Authorization: 'Bearer ' + token,
    //             "content-type" : "application/json"
    //         }
    //     })
    // }

    GetApi(url) {
        return axios.get(url)
    }
}

const SERVER = 'http://tutorials.codebetter.in:7082/cbjobportal'

export const hrurl = {
    JOB_SAVE: `${SERVER}/detail/job/save`,
    CATEGORY: `${SERVER}/categories/list`,
    ACTIVE_API : `${SERVER}/detail/job/active/`,
    DEACTIVE_API : `${SERVER}/detail/job/deactive/`,
    UPDATE_API: `${SERVER}/detail/job/update/`,
    
    APPLIED_JOB:  `${SERVER}/jobs/applied/list`,

    HR_PROFILE : `${SERVER}/detail/hr/profile`,
}

export default new HrApi