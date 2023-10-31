import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: "",
    });

    const ifregister = useAuth();
    const navigate = useNavigate();
  
    useEffect(()=>{

        if (ifregister){
           navigate('/home')
        }
    }, [ifregister, navigate])

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/api/forgotpassword", formData);
            console.log(response.data);
            const responseData = response.data;
            if(responseData){

            
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
            // Handle success, show a success message, or redirect the user
        } catch (error) {
            console.error("Error occurred:", error);
            // Handle error, show an error message to the user
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="max-w-[400px] w-full bg-gray-900 bg-opacity-30 p-8 rounded-lg"
            >
                <h2 className="text-4xl text-white font-bold text-center mb-8">Forgot Password</h2>

                <div className="mb-4">
                    <label className="block text-white text-sm font-medium" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-lg bg-gray-700 mt-2 p-2 w-full focus:ring focus:ring-blue-300"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-orange-900 hover:bg-orange-700 text-white font-semibold rounded-lg transition duration-300"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
}
