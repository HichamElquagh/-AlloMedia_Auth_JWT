import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
    const { user } = useAuth();

    return (
        <div className=" flex justify-center items-center h-screen">
            <div className="max-w-[400px] w-full bg-gray-900 bg-opacity-30 p-8 rounded-lg">
                <h2 className="text-2xl text-gray-100 font-bold mb-4">Bienvenue, {user.first_name}</h2>
                <p className="text-gray-100">Rôle: {user.role}</p>
            </div>
        </div>



    );
}
