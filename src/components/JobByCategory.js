import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import CandidateApi, { candiUrl } from "../WebService/CandidateApi"
import { jobByCateListReducer } from "../reduxData/JobSlice"
import { jobDetailsReducer } from "../reduxData/AppliedJobsSlice"

export default function JobByCategory()
{
    const joblist = useSelector(state => state.jobInfo.value)
    const user =useSelector(state => state.authInfo.value)

    const [msg,setMsg]=useState(" ")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {categoryId} = useParams() //it is use to get id from url

    const listByCate =async()=>{

        try{

            const url = candiUrl.JOB_BY_CATE + categoryId
            const response = await CandidateApi.GetApiCall(url)
            console.log(response)
            if (response.status) {
                dispatch(jobByCateListReducer(response.data.data))
            }
        }catch(error){
            setMsg("Network Error...")
        }
    }

    const ApplyJob=(ob)=>{
        if(user.login == false){
            navigate("/login")
        }else{
            navigate("/apply-job")
            dispatch(jobDetailsReducer(ob));
        }
    }

    useEffect(() => {
        listByCate(categoryId)
    }, [categoryId])

    return<>
      <section className="featured-job-area">
            <div className="container">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-tittle text-center">
                            <span>Recent Job</span>
                            {/* <h2>{joblist[0]?.categories.title}</h2> */}
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-10">
                    {joblist.map(ob=>{
                        return<div className="single-job-items mb-30">
                        <div className="job-items">
                            <div className="company-img">
                                <Link to="job_details.html"><img src="assets\img\icon\2936630.png" alt=""  height={100} width={100}/></Link>
                            </div>
                            <div className="job-tittle">
                                <Link to="job_details.html">
                                    <h4>{ob.title}</h4>
                                </Link>
                                <ul>
                                    <li>{ob.companyName}</li>
                                    <li><i className="fas fa-map-marker-alt"></i>{ob.companyAddress}-{ob.jobtype}</li>
                                    <li>&#8377;8000 - &#8377;{ob.salary}</li>
                                    <li>Min Exp-{ob.experience}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="items-link f-right">
                            <button className="btn" onClick={()=>ApplyJob(ob)}>Apply Now</button>
                            <span>{ob.jobtype}</span>
                        </div>
                    </div>
                    })}
                        

                    </div>
                </div>
            </div>
        </section>
    </>
}