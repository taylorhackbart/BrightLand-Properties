import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { AiOutlineUserAdd } from "react-icons/ai";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const home = () => history.push("/home");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <nav className="auth-options">
      {userData.user ? (
        <div className="align-me">
          <div className="row-employee">
            <button className="employee-button" onClick={home}>
              {" "}
              Portal{" "}
            </button>
          </div>
          <div className="row-logout">
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="align-me">
            <button className="login-button" onClick={login}>
              L
            </button>
            <AiOutlineUserAdd
              className="register-button"
              style={{ display: "none" }}
              onClick={register}
            >
              Register
            </AiOutlineUserAdd>
          </div>
        </>
      )}
    </nav>
  );
}
