import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function ResetPassword() {

    const [formData, setFormData] = useState({
        password: "",
        // confirmPassword: "",
    });
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate password and confirmPassword here if needed

            const response = await axios.post("http://localhost:3001/api/reset_password", {
                token :token,
                password: formData.password,
            });

            console.log(response.data);
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
                <h2 className="text-4xl text-white font-bold text-center mb-8">Reset Password</h2>

                <div className="mb-4">
                    <label className="block text-white text-sm font-medium" htmlFor="password">
                        New Password
                    </label>
                    <input
                        className="rounded-lg bg-gray-700 mt-2 p-2 w-full focus:ring focus:ring-blue-300"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* <div className="mb-4">
                    <label className="block text-white text-sm font-medium" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        className="rounded-lg bg-gray-700 mt-2 p-2 w-full focus:ring focus:ring-blue-300"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div> */}

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
