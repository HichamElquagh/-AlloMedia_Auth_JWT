// import logo from './logo.svg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from  "./components/login";
import { BrowserRouter,Routes , Route } from "react-router-dom"
import Register from "./components/register"
import Navbar from "./components/navbar"
import ForgotPassword from "./components/forgot.password"
import ResetPassword from "./components/reset.password"
import { AuthProvider } from "./contexts/AuthContext";
import Home from './components/home';
import PrivateRoute from './routes/PrivateRoute';






function App() {
  return (
    <main className="landing-page bg-brand-80 h-full w-full flex flex-col overflow-scroll">
      <AuthProvider> 
    <ToastContainer />
    <BrowserRouter>
    <Navbar />
      <Routes>
      {/* <Route path='/home' exact element={<Home />}></Route> */}
        <Route path='/login' exact element={<Login />}></Route>
        <Route path='/register' exact element={<Register/>}></Route>
        <Route path='/forgot-password' exact element={<ForgotPassword/>}></Route>
        <Route path='/reset-password' exact element={<ResetPassword/>}></Route>
        <Route path="" element={<PrivateRoute />}>
                <Route path="/home" element={<Home />}></Route>
            </Route>        
      </Routes> 
    </BrowserRouter>
    </AuthProvider>
    </main>
  );
}

export default App;
