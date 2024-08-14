import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm();
  const err = ""
  const onSubmit = (data) => {}
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-center flex flex-col gap-5 bg-black text-black rounded w-6/12 max-w-80 py-6">
      <h3 className=" text-red-600 text-center text-sm absolute -bottom-10">
        {err.split(":")[1]}
      </h3>
      <h1 className=" text-blue-200 font-bold text-2xl">Login</h1>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-10/12"
      >
        <Input
          label="Email"
          placeholder="Enter email.."
          className = "bg-blue-500/10"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        <Input
          label="Password"
          type="password"
          className = "bg-blue-500/10"
          placeholder="Enter Password.."
          {...register("password", { required: true })}
        />
        <Button className="rounded hover:bg-blue-600">Login</Button>

        <span className="flex gap-2 text-gray-600">
          You don't have an account{" "}
          <Link to="/register">
            <p className=" underline text-blue-600">register</p>
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
