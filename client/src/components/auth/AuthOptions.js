import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import {RiLoginCircleFill} from "react-icons/ri"
import { AiOutlineUserAdd } from "react-icons/ai"
import {RiLogoutCircleRLine} from "react-icons/ri"


export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/")
  };

  return (
    <nav className="auth-options footer-display">
      {userData.user ? (
        <div className="align-me">
        <RiLogoutCircleRLine className="logout-button" onClick={logout}>Log out</RiLogoutCircleRLine>
        </div>
      ) : (
        <>
        <div className="align-me">
          <RiLoginCircleFill className="login-button" onClick={login}></RiLoginCircleFill>
          <AiOutlineUserAdd className="register-button" 
          onClick={register}
          >Register</AiOutlineUserAdd>
          </div>
        </>
      )}
    </nav>
  );
}