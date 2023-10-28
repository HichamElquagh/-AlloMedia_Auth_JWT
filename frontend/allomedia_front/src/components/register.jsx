import React, { useState } from "react";
// import front from "../assets/front.jpg"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

export default function Register() {
  const [formData, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();


  // const handleInputChange = (e) => {
  //   setData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const onSubmit = async (data) => {
    try {
      // console.log(formData);
      const response = await axios.post(
        "http://localhost:3001/api/register",
        data
      );
      const responseData = response.data; 

      
      if (responseData.message) {
        console.log(responseData);
        toast.success(responseData.message, {
          position: toast.POSITION.TOP_RIGHT, 
          style: {
            marginTop: "4rem",
            background: "#007bff", 
            color: "#fff", 
            borderRadius: "10px", 
            padding: "15px 25px", 
            fontSize: "18px", 
            textAlign: "center", 
          },
        });
      }

    } catch (error) {
      if(error.response){

        toast.success(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT, // Position en haut à droite
            style: {
              marginTop: "4rem",
              background: "#007bff", // Couleur de fond bleue
              color: "#fff", // Couleur du texte blanc
              borderRadius: "10px", // Coins arrondis
              padding: "15px 25px", // Espacement interne
              fontSize: "18px", // Taille du texte
              textAlign: "center", // Centrer le texte horizontalement
            },
          });


      }
      // Gérez les erreurs d'API ici
    }
  };

  return (
    <div className="grid grid-cols-1  h-[90vh] w-full">
      <div className="flex flex-col justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[400px] w-full mx-auto bg-gray-900 backdrop-blur-sm bg-white/30 p-8 px-8 rounded-lg"
          action=""
        >
          <h2 className="text-4xl dark:text-white font-bold text-center">
            Register
          </h2>
          <div className=" flex flex-col text-gray-400 py-2">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor=""

            >
              First Name
            </label>
            <input
            {...register("first_name", {required: "first_name is required" })}
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:blue-500 focus:bg-gray-800 focus:outline-none "
              type="text"
                     />
            <span className="text-red-500 text-sm">{errors.first_name?.message}</span>
          </div>
          <div className=" flex flex-col text-gray-400 py-2">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor=""
            >
              Last Name
            </label>
            <input
             {...register("last_name", {required: "last_name is required" })}

              className="rounded-lg bg-gray-700 mt-2 p-2 focus:blue-500 focus:bg-gray-800 focus:outline-none "
              type="text"
                    />
            <span className="text-red-500 text-sm">{errors.last_name?.message}</span>
          </div>
          <div className=" flex flex-col text-gray-400 py-2">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor=""
            >
              Email
            </label>
            <input
             {...register("email", {required: "Email is required" })}

              className="rounded-lg bg-gray-700 mt-2 p-2 focus:blue-500 focus:bg-gray-800 focus:outline-none "
              type="email"
                />
            <span className="text-red-500 text-sm">{errors.email?.message}</span>
          </div>
          <div className="flex flex-col text-gray-400 py-2">
                <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="countries"
                >
                    Select an option
                </label>
                <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("role", { required: "Role is required" })}
                >
                    <option value="">Choisissez votre rôle</option>
                    <option value="livreur">Livreur</option>
                    <option value="client">Client</option>
                </select>
                <span className="text-red-500 text-sm">{errors.role?.message}</span>
            </div>
          <div className=" flex flex-col text-gray-400 py-2 ">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor=""
            >
              Password
            </label>
            <input
             {...register("password", {required: "password is required" })}

              className="rounded-lg bg-gray-700 mt-2 p-2 focus:blue-500 focus:bg-gray-800 focus:outline-none "
              type="password"
                   />
            <span className="text-red-500 text-sm">{errors.password?.message}</span>
          </div>

          <div className=" flex flex-col text-gray-400 py-2 ">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor=""
            >
              Confirm Password
            </label>
            <input
             {...register("confirm_password", {required: "confirm_password is required" })}

              className="rounded-lg bg-gray-700 mt-2 p-2 focus:blue-500 focus:bg-gray-800 focus:outline-none "
              type="password"

              
            />
            <span className="text-red-500 text-sm">{errors.confirm_password?.message}</span>
          </div>
          {/* <div className=" flex justify-between text-gray-400 py-2" >
                        <p className=" flex items-center"><input className="mr-2" type="checkbox" /> Remember me</p>
                        <p>Forgot Password </p>
                    </div> */}
          <button
            type="submit"
            className=" w-full my-5 py-2 bg-orange-900 shadow-lg shadow-orange-500/50 hover:shadow-orange-500/40 text-white font-semiblod rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
