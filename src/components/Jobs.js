import { Link, useNavigate } from "react-router-dom";
import AdminApi, { url } from "../WebService/AdminApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { JobListReducer } from "../reduxData/JobSlice";
import { jobDetailsReducer } from "../reduxData/AppliedJobsSlice";

export default function Jobs() 
{
    const user = useSelector(state => state.authInfo.value);
    const joblist = useSelector(state => state.jobInfo.value);

    console.log(joblist);


    const search = useRef();
    const [msg, setMsg] = useState("");
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const [fdata,setfdata] = useState(undefined);



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

    const ApplyJob=(ob)=>{
        if(user.login == false){
            navigate("/login")
        }else{
            navigate("/apply-job")
            dispatch(jobDetailsReducer(ob));
        }
    }

    useEffect(() => {
        list()
    }, [])

    const Handleselect= () =>{
        const value = search.current.value
        console.log(search);

        if(value == " "){
            setfdata(joblist)
        }else{

            var newList = joblist.filter((data) => {
            const tMatch = data.title.toLowerCase().includes(value.toLowerCase());
            const cNameMatch = data.companyName.toLowerCase().includes(value.toLowerCase());
            const cAddMatch = data.companyAddress.toLowerCase().includes(value.toLowerCase());
            const typeMatch = data.jobtype.toLowerCase().includes(value.toLowerCase());
            const locationMatch = data.joblocation.toLowerCase().includes(value.toLowerCase());

            return tMatch || cNameMatch || cAddMatch || typeMatch || locationMatch
        });
        setfdata(newList);
        console.log(newList)
        }
    }

    // var HandleClicked =()=>{
    //     setPagination()
    //     setStartValue(startValue + 1)
    // }

    return <>
        <section className="featured-job-area">
            <div className="container">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-tittle text-center">
                            <span>Recent Job</span>
                            <h2>Featured Jobs</h2>
                        </div>
                    </div>
                </div>
                <div className="row pd-8">
                    <h3 >
                        <span>Search Box</span>
                    </h3>
                    <div className="col-lg-5">
                        <input type="search" ref={search} name="search" className="form-control" placeholder="Search Jobs Company Name / Address / Type" onChange ={Handleselect}/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-10">
                    {fdata ? fdata.map(ob => {
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
                    }) :
                    
                    joblist.map(ob=>{
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
                    }) 
                    }
                    </div>
                   <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end">
                        {/* { pagination.map((data)=>{
                            return<><li class="page-item" onClick={HandleClicked}><a class="page-link" href="#">{data}</a></li></>
                            })
                        } */}
                    </ul> 
                </nav>
                
                </div>
                
                    {/* <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>     */}
            </div>
        </section>
    </>
}