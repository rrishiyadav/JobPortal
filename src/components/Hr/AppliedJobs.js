import { useDispatch, useSelector } from "react-redux"
// import AdminApi, { url } from "../../WebService/AdminApi"
// import { JobListReducer } from "../../reduxData/JobSlice"
import HrApi, { hrurl } from "../../WebService/HrApi"
import { AppliedJobListReducer } from "../../reduxData/AppliedJobsSlice"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AppliedJobs()
{

    const appliedJobList = useSelector(state => state.appliedJobInfo.value);
    console.log("Objects ", appliedJobList);

    const [msg, setMsg] = useState()

    const dispatch = useDispatch()

    const list = async() => {

        try {
            const response = await HrApi.GetApi(hrurl.APPLIED_JOB)
            console.log("Response is : ",response)

            if (response.status) {
                dispatch(AppliedJobListReducer(response.data.data))
            }
        } catch (error) {
            setMsg("Network Error")
        }
    }

    useEffect(() => {
        list()
    }, [])

    return<>
    <section className="featured-job-area ">
            <div className="container">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-tittle text-center">
                            <span></span>
                            <h2>Details Of Appied Jobs</h2>

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
                                    <th scope="col">Applied Date</th>
                                    <th scope="col">Candidate Name</th>
                                    <th scope="col">Education </th>
                                    <th scope="col">Passout year</th>
                                    <th scope="col">Job Title</th>
                                    <th scope="col">Company Name</th>
                                    <th scope="col">Job Type</th>
                                    <th scope="col">Job Location</th>
                                    <th scope="col">Salary</th>
                                    <th scope="col">Desc</th>
                                    <th scope="col">Post Date</th>
                                    <th scope="col">Expiry date</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {appliedJobList.map((ob, index) => <tr>
                                    <td>{index + 1}</td>
                                    <td>{ob.applydate}</td>
                                    <td>{ob.candidateDetails.username.fullname}</td>
                                    <td>{ob.candidateDetails.education}</td>
                                    <td>{ob.candidateDetails.passoutyear}</td>
                                    <td>{ob.jobs.title}</td>
                                    <td>{ob.jobs.companyName}</td>
                                    <td>{ob.jobs.jobtype}</td>
                                    <td>{ob.jobs.joblocation}</td>
                                    <td>{ob.jobs.salary}</td>
                                    <td>{ob.jobs.description}</td>
                                    <td>{ob.jobs.postdate}</td>
                                    <td>{ob.jobs.expirydate}</td>
                                    <td>{ob.state ? <><b>Active</b></> : <><b>Deactive</b>
                                    </>}</td>
                                    <td>
                                        <Link to={ob.resume}><button className="btn">Resume</button></Link>
                                    </td>
                                    
                                </tr>)}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </>
}