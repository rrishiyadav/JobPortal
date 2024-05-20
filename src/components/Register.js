import { useRef, useState } from "react"
import AuthApi, { urls } from "../WebService/AuthApi"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
// import { canProfileReducer } from "../reduxData/CanProfile"

export default function Register() 
{
    const navigate =useNavigate()
    const [msg,setMsg] = useState("")
    const dispatch = useDispatch()
    

    const nameBox =useRef()
    const phoneBox =useRef()
    const emailBox =useRef()
    const passBox =useRef()
    const eduBox =useRef()
    const passoutBox =useRef()

    const handleRegister = async(event) =>{
        event.preventDefault()

        var ob = {
            fullname : nameBox.current.value,
            email : emailBox.current.value,
            password : passBox.current.value,
            education : eduBox.current.value,
            phone : phoneBox.current.value,
            passoutyear : passoutBox.current.value
        }
        try {
            const response = await AuthApi.PostApiCall(urls.REGISTER, ob)
            console.log("register ",response)
            if(response.data.status){
                navigate('/')

                // dispatch(canProfileReducer(ob))
                setMsg("Register Successfully...")
            }else{
                setMsg("Register Failed...")
            }
            
        }catch (error) {
            console.log("APi not working.....")
            setMsg("Network Error...")
        }
    }
    
    return <>
    <section className="contact-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="contact-title">Register Here!</h2>
                    </div>
                    <div className="col-lg-12">
                        <form onSubmit={handleRegister} className="form-contact contact_form" id="contactForm" novalidate="novalidate">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input ref={nameBox} className="form-control valid"  name="name" id="name" type="text" placeholder="Enter Username" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input   ref={phoneBox} className="form-control valid"  name="Phone" id="Phone" type="Number" placeholder="Enter Phone" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input  ref={emailBox} className="form-control valid" name="email"  id="email" type="email" placeholder="Enter email" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input  ref={passBox} className="form-control valid" name="password"  id="password" type="password" placeholder="Enter Password" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input ref={eduBox} className="form-control valid" name="password"  id="education" type="text" placeholder="Enter education" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input ref={passoutBox} className="form-control valid" name="password"  id="Passout" type="text" placeholder="Enter Pass out Years" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <button type="submit" className="button button-contactForm boxed-btn">Register</button>
                            </div>
                            <b>{msg}</b>
                        </form>
                    </div>

                </div>
            </div>
            <span></span>
        </section>
    </>
}