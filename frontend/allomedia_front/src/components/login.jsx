import React from "react";
import front from "../assets/front.jpg"

export default function Login(){

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full' >
            <div className="hidden sm:block">
                <img className="w-full h-full object-cover" src={front} alt="background login" />
            </div>
            <div className="bg-orange-900 flex flex-col justify-center">
                <form className="max-w-[400px] w-full mx-auto bg-gray-900 backdrop-blur-sm bg-white/20 p-8 px-8 rounded-lg" action="">
                    <h2 className="text-4xl dark:text-white font-bold text-center">SIGN IN</h2>
                    <div className=" flex flex-col text-gray-400 py-2">
                        <label htmlFor="">
                            User Name
                        </label>
                        <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:blue-500 focus:bg-gray-800 focus:outline-none " type="text" />
                    </div>
                    <div className=" flex flex-col text-gray-400 py-2 ">
                        <label htmlFor="">
                            Password
                        </label>
                        <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:blue-500 focus:bg-gray-800 focus:outline-none " type="text" />
                    </div>
                    <div className=" flex justify-between text-gray-400 py-2" >
                        <p className=" flex items-center"><input className="mr-2" type="checkbox" /> Remember me</p>
                        <p>Forgot Password </p>
                    </div>
                    <button className=" w-full my-5 py-2 bg-orange-900 shadow-lg shadow-orange-500/50 hover:shadow-orange-500/40 text-white font-semiblod rounded-lg">
                        Sign IN 
                    </button>


                </form>
            </div>



        </div>

    )
}