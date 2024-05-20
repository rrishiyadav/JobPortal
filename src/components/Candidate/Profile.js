import { useEffect, useRef,  } from "react"
import { useDispatch, useSelector } from "react-redux"

// import AdminApi, { url } from "../../WebService/AdminApi";
import CandidateApi, { candiUrl } from "../../WebService/CandidateApi";
import { canProfileReducer } from "../../reduxData/CanProfile";


export default function Profile()
{

    const user =  useSelector(state=>state.authInfo.value);
    const userData = useSelector(state => state.canproinfo.value)

    console.log(userData)

    const dispatch = useDispatch()
   


    const Profile = async()=>{

        const response = await CandidateApi.GetApiCall(candiUrl.CANDIDATE_PROFILE , user.token)
        console.log("data ",response);

        var dis = dispatch(canProfileReducer(response.data.data))
        
        console.log("disss" ,dis)
    }

    useEffect(()=>{
        Profile();
    }, [])

    return<>
    <div className="container "  >
        <div className="row">
            <div className="col-lg-12">
                <div className="section-tittle text-center">
                    <h2>My Profile</h2>
                </div>
            </div>
        </div>

    <div className=" row align-items-center  justify-content-center ">
        <div className="col-lg-4 col-md-30 bg-danger  mb-50 "  style={{borderRadius:"10px",boxShadow:"0px 0px 15px lightgrey"}}>
            <div className="single-process text-center mb-50 " >
              <div className="services-ion"  >
                <span className="flaticon-tour fa-3x" ></span>
              </div>
              <div className=" text-left"> 
                <p><b style={{fontSize:"18px",color:"white"}}> Name :  </b> </p> 
                <p><b style={{fontSize:"18px",color:"white"}}> Phone : </b> </p>
                <p><b style={{fontSize:"18px",color:"white"}}> Email : </b> 
                </p> <p><b style={{fontSize:"18px",color:"white"}}> Education :  </b> </p>
              </div>
            </div>
        </div>
        <div className="col col-lg-7 col-sm-12 col-md-12  mb-20  pt-5 pb-3 " style={{borderRadius:"10px",boxShadow:"0px 0px 10px lightgrey"}}>
            <form onSubmit={Profile}>
            <div className="col col-sm-6 mt-2" >
            </div>
            <div className=" row mb-3 ">
                <div className="col col-sm-6 " >
                <h4 style={{fontSize:"18px",color:"Black"}}>Name : </h4>
                <p>  </p>
                    {/* <label style={{fontSize:"18px",color:"black"}}>Name</label>
                    <input  type="text" className="form-control" ref={nameBox} placeholder="Enter Name" required/> */}
                </div>
                <div className="col col-sm-6" >
                <h4 style={{fontSize:"18px",color:"Black"}}>Number :  </h4>
                        <p>  </p>
                </div>
            </div>

            <div className=" row mb-3">
                <div className="col col-sm-6" >
                <h4 style={{fontSize:"18px",color:"Black"}}>Email :</h4>
                <p>  </p>
                </div>
                <div className="col col-sm-6" >
                    <h4 style={{fontSize:"18px",color:"Black"}}>Passout Year: </h4>
                        <p>  </p>
                </div>  
            </div>

            <div className=" row mb-3">
                <div className="col col-sm-6" >
                    <h4 style={{fontSize:"18px",color:"Black"}}>Education : </h4>
                    <p>  </p>
                </div>
            </div>

            <div className=" row m-3">
            <div className="col col-sm-6 " >
            </div>
                <div className="col col-sm-6 " >
                    <button className="btn btn-info" type="submit">Update Profile</button>
                </div>
            </div>
            </form>
        </div>
    </div>  
    </div>
    </>
}