import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CandidateApi, { candiUrl } from "../../WebService/CandidateApi";

export default function ApplyJob()
{
    const user =  useSelector(state=>state.authInfo.value);
    const applyJob= useSelector(state=>state.appliedJobInfo.value);
    console.log(applyJob)

    const [msg,setMsg] = useState("")
    const resumeBox = useRef()

    const save=async(event)=>{
        event.preventDefault()

        var formData = new FormData()
        formData.append("resume", resumeBox.current.files[0]);
        formData.append("jobId", applyJob.id);

        try{
            const response = await CandidateApi.PostApiCall(candiUrl.RESUME_UPLOAD, formData, user.token)
            console.log(response)
            if(response.status){
                setMsg(response.data.message)
            }else{
                setMsg(response.data.message)
            }
        }catch(error){
            setMsg("Network Error !")
        }
    }
    return<>
    <section className="contact-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="contact-title">Upload your Updated Resume</h2>
                    </div>
                    <div className="col-lg-8">

                        <form onSubmit={save} className="form-contact contact_form" id="contactForm" novalidate="novalidate">
                            <div className="row">
                                <div className="col-sm-12 ">
                                    <div className="form-group">
                                        <input ref={resumeBox} className="form-control valid" name="resume" id="resume" type="file" placeholder="Select your Resume " />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <button type="submit" className="button button-contactForm boxed-btn">Apply</button>
                            </div>
                            {/* <b>{msg}</b> */}
                        </form>
                    </div>

                    <div className="col-lg-3 offset-lg-1">
                        <div className="media contact-info">
                            <span className="contact-info__icon"><i className="ti-user"></i></span>
                            <div className="media-body">
                                <h3><Link to="/hrlist">Hr Details </Link></h3>

                            </div>
                        </div>

                        <div className="media contact-info">
                            <span className="contact-info__icon"><i className="ti-user"></i></span>
                            <div className="media-body">
                                <h3><Link to="">Jobs Details</Link></h3>

                            </div>
                        </div>
                        <div className="media contact-info">
                            <span className="contact-info__icon"><i className="ti-user"></i></span>
                            <div className="media-body">
                                <h3><Link to="">Candidates Details</Link></h3>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </>
}