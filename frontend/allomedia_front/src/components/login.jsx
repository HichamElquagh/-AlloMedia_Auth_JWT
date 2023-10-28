import React, { useState } from "react";
// import front from "../assets/front.jpg"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

 





export default function Login(){

const [formData , setData] = useState({
    email: "",
    password: "",
});


const handleInputChange = (e) => {
    setData({
        ...formData,
        [e.target.name]: e.target.value
    });
};
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
        // Faites la requête POST vers votre API d'enregistrement
        const response = await axios.post("http://localhost:3001/api/login", formData);
          if (response.data.message){

            toast.success(response.data.message, {
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
    } catch (error) {
        if (error.response) {
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
        <div className='grid grid-cols-1 sm:grid-cols-2 h-[90vh] w-full' >
            
            <div className="flex flex-col justify-center">
                <form onSubmit={handleSubmit}
                className="max-w-[400px] w-full mx-auto bg-gray-900 backdrop-blur-sm bg-white/20 p-8 px-8 rounded-lg" action="">
                    <h2 className="text-4xl dark:text-white font-bold text-center">Login</h2>
                  
                    <div className=" flex flex-col text-gray-400 py-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="">
                            Email
                        </label>
                        <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:blue-500 focus:bg-gray-800 focus:outline-none " type="email"
                        name="email"
                        onChange={handleInputChange}
                        
                        />
                    </div>
                   
                    <div className=" flex flex-col text-gray-400 py-2 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="">
                            Password
                        </label>
                        <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:blue-500 focus:bg-gray-800 focus:outline-none " type="password" 
                         name="password"
                         onChange={handleInputChange}
                        />
                    </div>
               
                    <div className=" flex justify-between text-gray-400 py-2" >
                        <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><input className="mr-2" type="checkbox" /> Remember me</p>
                        <Link className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" to={"/forgot-password"}>Forgot Password </Link>
                    </div>

                    <button type="submit" className=" w-full my-5 py-2 bg-orange-900 shadow-lg shadow-orange-500/50 hover:shadow-orange-500/40 text-white font-semiblod rounded-lg">
                        Login 
                    </button>
                </form>
            </div>



        </div>

    )
}