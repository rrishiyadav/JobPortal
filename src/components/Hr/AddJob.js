import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
import HrApi, { hrurl } from "../../WebService/HrApi";
import { useDispatch, useSelector } from "react-redux";

export default function AddJob() 
{
    const user= useSelector(state => state.authInfo.value)
    const [msg, setMsg] = useState("")
    const [cate,setCate] = useState([])
    const dispatch = useDispatch()

    const cateBox = useRef();
    const titleBox = useRef();
    const jobdesBox = useRef();
    const comNameBox = useRef();
    const compAddBox =  useRef();
    const contactBox = useRef();
    const emailBox = useRef();
    const qualificationBox = useRef();
    const expBox = useRef();
    const skillsBox = useRef();
    const locationBox = useRef();
    const typeBox = useRef();
    const salaryBox = useRef();
    const expiryBox = useRef();

    const saveList = async(event)=>{
        event.preventDefault()

        var obj = {
            category : cateBox.current.value,
            title : titleBox.current.value,
            description : jobdesBox.current.value,
            companyName : comNameBox.current.value,
            companyAddress : compAddBox.current.value,
            contact : contactBox.current.value,
            email : emailBox.current.value,
            qualification : qualificationBox.current.value,
            experience : expBox.current.value,
            skills :skillsBox.current.value,
            salary :salaryBox.current.value,
            jobtype :typeBox.current.value,
            joblocation :locationBox.current.value,
            expirydate : expiryBox.current.value,
            postdate : Date.now()
        }

        try{
            const response = await HrApi.PostApiCall(hrurl.JOB_SAVE, obj, user.token)
            console.log(response)
            if(response.status){
                setMsg(response.data.message)
            }
            else{
                setMsg(response.data.message)
            }
        }
        catch(error){
            setMsg("Error")
        }
    }

    const CategoryList =async ()=>{
        try{
            const response = await HrApi.GetApi(hrurl.CATEGORY)
        console.log(response)
        if(response.status){
            setCate(response.data.data)

        }
    }
        catch(error){
            setCate("Error")
        }
    }


    useEffect(()=>{
        CategoryList()
    }, [ ])
    return <>
        <section className="contact-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="contact-title">Post New Job</h2>
                    </div>
                    <div className="col-lg-12">
                        <form onSubmit={saveList} className="form-contact contact_form" id="contactForm" novalidate="novalidate">
                            <div className="row">

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select ref={cateBox} className="form-control form-select valid" type="text">
                                            <option>Select Category</option>
                                            {cate.map(obj=><option value={obj.id}>{obj.title}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Job Title</label>
                                        <input ref={titleBox} className="form-control valid" name="name" id="name" type="text" placeholder="Enter Job Title" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Job description</label>
                                        <input ref={jobdesBox} className="form-control valid" name="name" id="name" type="text" placeholder="Enter Job Description" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Company Name</label>
                                        <input  ref={comNameBox} className="form-control valid" name="name" id="name" type="text" placeholder="Enter Company Name" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Company Address</label>
                                        <input ref={compAddBox} className="form-control valid" name="name" id="name" type="text" placeholder="Enter Company Address" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Contact</label>
                                        <input ref={contactBox} className="form-control valid" name="phone" id="phone" type="number" placeholder="Enter Phone Number" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input ref={emailBox} className="form-control valid" name="email" id="email" type="email" placeholder="Enter Username / email" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Qualification</label>
                                        <input ref={qualificationBox} className="form-control valid" name="password" id="phone" type="text" placeholder="Enter Qualification" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Experiecne</label>
                                        <input ref={expBox} className="form-control valid" name="exp" id="phone" type="text" placeholder="Enter Experience" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Skills</label>
                                        <input ref={skillsBox} className="form-control valid" name="skills" id="phone" type="text" placeholder="Enter Required Skills" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Job Location</label>
                                        <select ref={locationBox} className="form-control form-select valid" type="text">
                                            <option value=" ">Select Type</option>
                                            <option value="OnSite">OnSite</option>
                                            <option value="Remote">Remote</option>
                                            <option value="Hybrid">Hybrid</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Job Type</label>
                                        <select ref={typeBox} className="form-control form-select valid" type="text">
                                            <option value=" ">Select Type</option>
                                            <option value="FullTime">Full Time</option>
                                            <option value="PartTime">Part Time</option>
                                            <option value="Intership">Intership</option>
                                            <option value="ContractBased">Contract Based</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Salary</label>
                                        <input ref={salaryBox} className="form-control valid" name="skills" id="phone" type="number" placeholder="Enter Salary" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Expiry Date</label>
                                        <input ref={expiryBox} className="form-control valid" name="skills" id="date" type="date" />
                                    </div>
                                </div>

                            </div>
                            <div className="form-group mt-3">
                                <button type="submit" className="button button-contactForm boxed-btn">Save</button>
                            </div>
                            <b >{msg}</b>
                        </form>
                    </div>
                </div>
            </div>
        </section>


    </>
}