import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try{
      const response = await axios.post("http://localhost:3001/api/logout");
      if (response.data) {
        setUser(localStorage.clear());
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
    }catch(error){
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

    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
