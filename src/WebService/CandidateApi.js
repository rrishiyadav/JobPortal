import axios from 'axios'

class CandidateApi {

    PostApiCall(url, data, token) {
        return axios.post(url, data, {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": "multipart/form-data"
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
                
                "content-type": "application/json"
            }
        })
    }

    GetApi(url) {
        return axios.get(url)
    }
}

const SERVER = 'http://tutorials.codebetter.in:7082/cbjobportal'

export const candiUrl = {
    RESUME_UPLOAD : `${SERVER}/applyjob/apply`,
    JOB_BY_CATE : `${SERVER}/jobs/list/`,
    MY_JOBS : `${SERVER}/applyjob/applied-jobs`,
    CANDIDATE_UPDATE : `${SERVER}/candidate/update`, //candidate update url
    CANDIDATE_PROFILE : `${SERVER}/candidate//mydetail`,
}

export default new CandidateApi