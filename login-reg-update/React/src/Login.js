import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import instance from "./baseURL";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  Email: yup.string().required("Tinvalid input"),
  Password: yup.string().required("invalid"),
});
function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="App">
      <form
        className="formdata"
        onSubmit={handleSubmit(async (data) => {
          

          console.log(data);
          const body = data;

          const registerresponse = await instance.post("/login", body);
          console.log(registerresponse);
          alert(registerresponse.data.message);

          if (registerresponse.data.message === "Login Successfull") {
            localStorage.setItem("token", `${registerresponse.data.token}`);
            localStorage.setItem("id", `${registerresponse.data.user._id}`);
            navigate("/update");
          }

          reset();
        })}
      >
        <div className="formback mx-auto w-50 text-center ">
          <h2 className="heading">Login</h2>

          <div className="d-flex" style={{ flexDirection: "column" }}>
            <label>Enter Your Email</label>
            <input
              id="email"
              className="w-50 mx-auto"
              type="text"
              placeholder="Enter your Email"
              {...register("Email")}
            ></input>{" "}
            <br></br>
            <p className="error">{errors.Email?.message}</p>
          </div>

          <div className="d-flex" style={{ flexDirection: "column" }}>
            <label>Set Your Password</label>
            <input
              id="password"
              className="w-50 mx-auto"
              type="password"
              placeholder="Enter your Email"
              {...register("Password")}
            ></input>{" "}
            <br></br>
            <p className="error">{errors.Password?.message}</p>
          </div>
          <button type="submit btn btn-success w-25">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
