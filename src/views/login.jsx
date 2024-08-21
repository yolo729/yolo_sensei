import React, { useState } from "react";
import AuthLayout from "../layouts/auth";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens } = useAuth();

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const setEmail = (e) => {
    const { name, value } = e.target;

    setInputs((inputs) => ({ ...inputs, [name]: value }));
    console.log(inputs);
  };

  const setPassword = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    console.log(inputs);
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(inputs.email)) {
      setError("Email is invalid");
    } else {
      setError(null);
      axios
        .post("http://localhost:5000/api/login/verify", { email: inputs.email })
        .then((response) => {
          if (response.data.length > 0) {
            if (inputs.password !== response.data[0].password) {
              setError("Password is not correct");
            } else {
              console.log("Login Succeed");
              setLoggedIn(true);
              setAuthTokens({ isLoggedIn: 1, email: inputs.email });
              if (
                response.data[0].client_secret !== null &&
                response.data[0].subscription_id !== null
              ) {
                window.localStorage.setItem(
                  "sub_scription",
                  JSON.stringify({
                    cs: response.data[0].client_secret,
                    ss: response.data[0].subscription_id,
                    email: inputs.email,
                  })
                );
                navigate("/main");
              } else {
                navigate("/");
              }
            }
          } else {
            setError("Email is not exist");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const project = () => {
    return (
      <AuthLayout r={"/graphic/auth/g1.svg"}>
        <form onSubmit={handleSubmit}>
          <div className="w-[100%] h-[100vh] py-[100px] mobile:px-[25px] laptop:px-[80px]">
            <div className=" mobile:w-[100%] laptop:w-[500px] h-[100%] flex flex-col justify-center">
              <h1 className="text-[35px] font-extrabold">
                Login with Email and Password
              </h1>
              <div className="w-[100%] border-[1px] overflow-hidden mobile:mt-[10px] laptop:mt-[40px] rounded-[4px] border-[#0000006B] flex ">
                <div className="w-[50px] h-[60px] flex items-center justify-center shrink-0">
                  <img src="/graphic/auth/mail.svg" alt="" />
                </div>
                <input
                  type="email"
                  className="w-[100%] h-[100%] text-[16px] font-medium px-[12px] outline-none"
                  placeholder="Email Address"
                  name="email"
                  onChange={(e) => setEmail(e)}
                />
              </div>
              <div className="w-[100%] border-[1px] overflow-hidden mt-[20px] rounded-[4px] border-[#0000006B] flex ">
                <div className="w-[50px] h-[60px] flex items-center justify-center shrink-0">
                  <img src="/graphic/auth/lock.svg" alt="" />
                </div>
                <input
                  type="password"
                  className="w-[100%] h-[100%] text-[16px] font-medium px-[12px] outline-none"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => setPassword(e)}
                />
              </div>
              {error && <p>{error}</p>}
              <button className="w-[100%] h-[50px] mt-[20px] bg-[#E14857] rounded-[3px] text-[#fff] font-bold tracking-wide cursor-pointer flex items-center justify-center">
                Log in
              </button>
              <div className="d-flex justify-content-center">
                <p>
                  Don’t have an account?{" "}
                  <Link
                    to="/signUp"
                    style={{ color: "blue", fontStyle: "italic" }}
                  >
                    <u>Sign up</u>
                  </Link>
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <p>
                  Go Home?{" "}
                  <Link to="/" style={{ color: "blue", fontStyle: "italic" }}>
                    <u>Home</u>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </AuthLayout>
    );
  };

  return <div>{project()}</div>;
};

export default Login;
