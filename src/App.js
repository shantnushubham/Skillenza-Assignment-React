import React, { useState } from "react";
import "./css/style.css";
import skillenza from "./assets/skillenza.png";
import Axios from "axios";

const App = () => {
  const [userCredentials, setUserCredentials] = useState({});
  const [showMessage, setShowMessage] = useState({});

  const isEmpty = (val) => {
    return typeof val === "undefined" || val === null || val === "";
  };

  const validateEmail = (mail) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    return false;
  };

  const onButtonClick = async (e) => {
    e.preventDefault();
    if (
      isEmpty(userCredentials.email) ||
      isEmpty(userCredentials.password) ||
      isEmpty(userCredentials.confirmPassword)
    ) {
      setShowMessage({ success: false, message: "All fields are mandatory" });
    } else if (userCredentials.password !== userCredentials.confirmPassword) {
      setShowMessage({ success: false, message: "Passwords do not match!" });
    } else {
      console.log("Success");
      await Axios.post("http://localhost:8080/user/signup", userCredentials)
        .then(({ data: addedUser }) => {
          console.info(addedUser);
          setShowMessage({ success: true, message: "User successfully added." });
        })
        .catch((error) => {
          if (error.response.status === 406) {
            setShowMessage({ success: false, message: "User already exists." });
          }
        });
    }
  };

  return (
    <div className="section">
      <div className={"auth-box"}>
        <div>
          <img
            src={skillenza}
            className={"skillenza-logo"}
            alt={"Skillenza"}
            title={"Skillenza"}
          />
        </div>
        <form>
          <input
            type={"email"}
            placeholder={"Email"}
            value={userCredentials.email}
            onChange={(e) =>
              setUserCredentials({ ...userCredentials, email: e.target.value })
            }
          />
          <input
            type={"password"}
            placeholder={"Password"}
            value={userCredentials.password}
            onChange={(e) =>
              setUserCredentials({
                ...userCredentials,
                password: e.target.value,
              })
            }
          />
          <input
            type={"password"}
            placeholder={"Confirm Password"}
            onChange={(e) =>
              setUserCredentials({
                ...userCredentials,
                confirmPassword: e.target.value,
              })
            }
          />
          <div className={"button-box"}>
            <button
              className={"auth-button"}
              disabled={
                isEmpty(userCredentials.email) ||
                isEmpty(userCredentials.password) ||
                isEmpty(userCredentials.confirmPassword) ||
                userCredentials.password !== userCredentials.confirmPassword ||
                !validateEmail(userCredentials.email)
              }
              onClick={(e) => onButtonClick(e)}
            >
              Sign Up
            </button>
            {(() => {
              if (Object.keys(showMessage).length > 0) {
                if (showMessage.success) {
                  return (
                    <legend className={"msg success"}>
                      {showMessage.message}
                    </legend>
                  );
                }
                return (
                  <legend className={"msg error"}>{showMessage.message}</legend>
                );
              }
            })()}
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
