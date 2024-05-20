import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import HrApi, { hrurl } from "../../WebService/HrApi";

export default function HrProfile()
{

  const user = useSelector(state => state.authInfo.value)
  console.log(user)

  const [msg, setMsg]=useState([])

  

  const profileUpdate = async()=>{
    
    const res = await HrApi.GetApiCall(hrurl.HR_PROFILE, user.token);
    console.log("response",res);

    if(res.data.data){
      setMsg(res.data.data)
    }
  
  }

  useEffect( ()=>{
    profileUpdate()
  },[])
  return<>
    <div className="apply-process-area apply-bg pb-130"  >
        <div className="container">
          
          <div className="row">
            <div className="col-lg-12 ">
              <div className="text-white  text-center">
                <h2> My Profile</h2>
              </div>
            </div>
          </div>
          
          <div className="row align-items-center  justify-content-center mt-35">
            <div className="  col-lg-6 col-md-8 ">
              <div className="bg-danger text-center mb-30 pt-40 pb-40" style={{borderRadius:"10px",boxShadow:"0px 0px 15px lightgrey"}}>
                <div className="process-ion">
                  
                </div>
                <div className="process-cap">
                  <h4 className=" text-white ">My Profile</h4>
                  <hr/>
                    {/* <div className="col col-sm-6 " >
                    </div> */}
                    
                    <div className=" row mb-3 ">
                        <div className="col col-sm-6 " >
                            <h4 style={{fontSize:"18px",color:"white"}}>Id : {msg.id}</h4>
                            <p> </p>
                        </div>
                        <div className="col col-sm-6" >
                        <h4 style={{fontSize:"18px",color:"white"}}>Name : {msg.fullname}</h4>
                        <p>  </p>
                        </div>
                    </div>

                    <div className=" row mb-3">
                        <div className="col col-sm-6" >
                        <h4 style={{fontSize:"18px",color:"white"}}>Email : {msg.email}</h4>
                        <p> </p>
                        </div> 
                        <div className="col col-sm-6" >
                        <h4 style={{fontSize:"18px",color:"white"}}>Number : {msg.phone}</h4>
                        <p> </p>
                        </div>  
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
}