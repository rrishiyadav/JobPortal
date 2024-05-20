import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate,  } from "react-router-dom"
import CandidateApi, { candiUrl } from "../../WebService/CandidateApi"
import { jobByCateListReducer } from "../../reduxData/JobSlice"


export default function MyJobs()
{
    const myjoblist = useSelector(state => state.jobInfo.value)
    console.log(myjoblist)

    const user =useSelector(state => state.authInfo.value)

    const [msg,setMsg]=useState(" ")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const myJobs =async()=>{

        try{

            const response = await  CandidateApi.GetApiCall(candiUrl.MY_JOBS, user.token);
            console.log("SOS : ",response)

            console.log("List ",response.data.data)
            if(response.status){

                setMsg(response.data.data)
                console.log(dispatch(jobByCateListReducer (response.data.data)))

            }

        }catch(error){
            setMsg("Netwrok Error")
        }
            
    }

    // const formateData = (datestr) =>{
    //     const date = new Date(datestr)
    //     return date.toLocalDateString()
    // }

    useEffect(() => {
        myJobs()
    }, [])

    return<>
      <section className="featured-job-area">
            <div className="container">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-tittle text-center">
                            <span>Recent Job</span>
                            <h2>Jobs Applied By Me</h2>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-10">
                    {myjoblist.map(ob=>{
                        return<div className="single-job-items mb-30">
                        <div className="job-items">
                            <div className="company-img">
                                <Link to="job_details.html"><img src="assets\img\icon\2936630.png" alt=""  height={100} width={100}/></Link>
                            </div>
                            <div className="job-tittle">
                                <Link to="job_details.html">
                                    <h4>{ob?.jobs?.title}</h4>
                                </Link>
                                <ul>
                                    <li>{ob?.jobs?.companyName}</li>
                                    <li><i className="fas fa-map-marker-alt"></i>{ob?.companyAddress}-{ob?.jobtype}</li>
                                    <li>&#8377;8000 - &#8377;{ob?.jobs?.salary}</li>
                                    {/* <li>Min Exp-{ob.jobs.}</li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    })}
                    </div>
                </div>
            </div>
        </section>
    </>
}