import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import instance from "./baseURL";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  Name: yup.string().required("This field cannot be empty"),
  Email: yup.string().required("This field cannot be empty"),
  Password: yup.string().required("This fielld cannot be empty "),
});

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [Name, setName] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();

  return (
    <div className="App">
      <form
        className="formdata"
        onSubmit={handleSubmit(async (data) => {
          setName(data.Name);
          setEmail(data.Email);
          setPassword(data.Password);
          console.log(data);
          const body = data;

          try {
            const registerresponse = await instance.post("/register", body);
            alert(registerresponse.data.message);
            navigate("login");

            reset();
          } catch (error) {
            alert(error.response.data);
            console.log(error.response.data);
          }
        })}
      >
        <div className="formback mx-auto w-50 text-center ">
          <h2 className="heading">Register form</h2>
          <input
            {...register("Name")}
            type="text"
            placeholder="Enter your name..."
            id="name"
          ></input>{" "}
          <br></br>
          <p className="error">{errors.Name?.message}</p>
          <input
            id="email"
            type="text"
            placeholder="Enter your Email..."
            {...register("Email")}
          ></input>{" "}
          <br></br>
          <p className="error">{errors.Email?.message}</p>
          <input
            id="password"
            type="password"
            placeholder="Enter your password..."
            {...register("Password")}
          ></input>{" "}
          <br></br>
          <p className="error">{errors.Password?.message}</p>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
