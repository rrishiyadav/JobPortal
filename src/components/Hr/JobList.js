import { useEffect, useState } from "react"
import AdminApi, { url } from "../../WebService/AdminApi"
import { useDispatch, useSelector } from 'react-redux'
import { JobListReducer, StatusReducer } from "../../reduxData/JobSlice"
import HrApi, { hrurl } from "../../WebService/HrApi"
import { useNavigate } from "react-router-dom"
import { editJobReducer } from "../../reduxData/UpdateSlice"


export default function JobList() 
{
    const user = useSelector(state => state.authInfo.value)
    const joblist = useSelector(state => state.jobInfo.value)
    // const State = useSelector(state => state.)

    const [msg, setMsg] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const list = async () => {

        try {
            const response = await AdminApi.GetApi(url.JOB_LIST)
            console.log(response)
            if (response.status) {
                dispatch(JobListReducer(response.data.data))
            }
        } catch (error) {
            setMsg("Network Error")
        }
    }

    const deactivebtn = async(id)=> {

        var ob= {data : null}
    try{
        const deActiveUrl = hrurl.DEACTIVE_API + id;
        console.log(deActiveUrl)
        const res = await HrApi.PutApiCall(deActiveUrl, ob, user.token )
        console.log(res)


        if(res.status){
            var statusUpdateList = joblist.filter(id => id !== res.data.data.id)
            dispatch(StatusReducer(statusUpdateList))
        }

        }catch(error){
            setMsg("Network Error...")
        }
    };

    const activebtn = async(id)=>{
        var ob = {data : null}
         
    try{
        const ActiveUrl = hrurl.ACTIVE_API + id;
        console.log(ActiveUrl)
        const res = await HrApi.PutApiCall(ActiveUrl, ob, user.token )
        console.log(res)
        if(res.status){
            var statusUpdateList = joblist.filter(id =>id !== res.data.data.id)
            dispatch(StatusReducer(statusUpdateList))
        }
    }catch(error){
            setMsg("Network Error...")
        }
    }

    const updateJob=(ob)=>{
        dispatch(editJobReducer(ob))
        navigate("/jobUpdate")
    }


    useEffect(() => {
        list()
    }, [joblist])
    return <>
    <section className="featured-job-area ">
            <div className="container">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-tittle text-center">
                            <span></span>
                            <h2>Job Details</h2>

                            <span></span>

                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mb-3">
                    <div className="col-xl-10 table-responsive">

                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Sr.no</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Job Title</th>
                                    <th scope="col">Company Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Salary</th>
                                    <th scope="col">Qualification</th>
                                    <th scope="col">Experience</th>
                                    <th scope="col">Skills</th>
                                    <th scope="col">Job Type</th>
                                    <th scope="col">Post Date</th>
                                    <th scope="col">Expiry date</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">Desc</th>
                                    <th scope="col">status</th>
                                    <th scope="col">Edit</th>

                                </tr>
                            </thead>
                            <tbody>
                                {joblist.map((ob, index) => <tr>
                                    <td>{index + 1}</td>
                                    <td>{ob?.categories?.title}</td>
                                    <td>{ob?.title}</td>
                                    <td>{ob?.companyName}</td>
                                    <td>{ob?.companyAddress}</td>
                                    <td>{ob?.salary}</td>
                                    <td>{ob?.qualification}</td>
                                    <td>{ob?.experience}</td>
                                    <td>{ob?.skills}</td>
                                    <td>{ob?.jobtype}</td>
                                    <td>{ob?.postdate}</td>
                                    <td>{ob?.expirydate}</td>
                                    <td>{ob?.email}</td>
                                    <td>{ob?.contact}</td>
                                    <td>{ob?.description}</td>
                                    <td>
                                        {ob.status ? <><button onClick={()=> deactivebtn(ob.id)} className="btn">Deactive</button> </> : <> <button className="btn" onClick={()=> activebtn(ob.id)} >Active</button></>}
                                    </td>

                                    <td><button className="btn btn-primary btn-sm" onClick={() => updateJob(ob)}>Edit</button></td>
                                </tr>)}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </>
}