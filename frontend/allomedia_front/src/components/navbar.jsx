  import React from "react"
  import {Link} from "react-router-dom"
  import { useAuth } from "../contexts/AuthContext";


  export default function Navbar(){ 
    const { user, logout } = useAuth();



      return (
        
  <nav class="bg-transparent border-gray-200 ">
    <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center">
          {/* <img src="" class="h-8 mr-3" alt="Flowbite Logo" /> */}
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AlloMedia</span>
      </a>
      <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
          <li>
            <a href="#" class="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
          </li>
          <li>
            <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
          </li>
          <li>
            <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
          </li>
          <li>
            <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
          </li>
          <li>
            <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
          </li>
        </ul>
      </div>
      <div>
              {user ? (
          <div>
            <p className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Welcome, {user.first_name}</p>
            {/* <button onClick={logout}>Logout</button> */}
          </div>
        ) : (
          <>
          <Link to={"/login"}><button type="button" class=" bg-transparent text-white  hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login</button></Link>
          <Link to={"/register"}><button type="button" class=" bg-transparent text-white  hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Register</button></Link>
          </>
        )}

      </div>
    </div>
  </nav>

      )
  }