import React, {useEffect, useState, useContext} from "react"
import API from "../../utils/API"
import UserContext from "../../contexts/UserContext";

function ViewAll () {
const [employees, setEmployees] = useState()
const { userData } = useContext(UserContext);
const { setUserData } = useContext(UserContext);

useEffect( async () => {
  // e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.get(
        "http://localhost:3001/users/login",
        loginUser
      );
      // const loginRes = 
      console.log(loginRes)
      // setUserData({
      //   token: loginRes.data.token,
      //   user: loginRes.data.user,

      // });
      // localStorage.setItem("auth-token", loginRes.data.token);
      // history.push("/home");
    } catch (err) {
      // err.response.data.msg && setError(err.response.data.msg);
      console.log(err)
    }
  loadEmployees()
}, [])

const loadEmployees = () => {
  API.getUsers()
  .then(res => {
    console.log(res)
  })
}
  return(
    <>
    {userData.user.jobType === "admin" &&
<>
<h1> All Employees :</h1>
</>
  }
    </>
  )
}
export default ViewAll;