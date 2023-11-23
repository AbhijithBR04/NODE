import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import instance from "./baseURL";
// import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  Name: yup.string().required("This field cannot be empty"),
});

function Update() {
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="formback mx-auto w-50 text-center ">
      <form
        className="formdata"
        onSubmit={handleSubmit(async (data) => {
          const id = localStorage.getItem("id");
          const token = localStorage.getItem("token");

          const body = {
            Name: data.Name,
            id: id,
            token: token,
          };
          console.log(body);

          const registerresponse = await instance.post("/update", body);

          alert(registerresponse.data.message);

          reset();
        })}
      >
        <div className="formback">
          <h2>Update your name here</h2>
          <input
            id="name"
            type="text"
            placeholder="Enter your Name"
            {...register("Name")}
          ></input>{" "}
          <br></br>
          <p className="error">{errors.Name?.message}</p>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Update;
