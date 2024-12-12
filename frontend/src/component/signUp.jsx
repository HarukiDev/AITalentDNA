import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LogoSVG from '../assets/image8.svg';
import ObjectSVG from '../assets/objects1.svg';
import BgTextureCard2 from "../assets/bg-textureCard2.svg";
import axios from 'axios';

export default function SignUp({ setSignIn }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/signUp.php', {
        username: username,
        email: email,
        password: password
      });

      if (response.data.status === 'success') {
        setMessage("Sign Up successful. Redirecting to Sign In...");
        setTimeout(() => {
            setSignIn(true); 
        }, 2000);
        } else {
            setMessage(response.data.message || "Error during sign up.");
        }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };
  
  return (
    <div>
        {/* Form */}
        <motion.div
            className="absolute top-0 left-0 h-full w-full md:w-1/2 bg-[#EDF2FF] flex flex-col items-center justify-center p-12 text-center"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: '0%' }}
            transition={{ duration: 0.6 }}
        >
            <div className="w-[150px] mb-4 flex justify-center items-center">
                <img 
                    src={LogoSVG} 
                    alt="Logo"
                    className="w-full h-full" 
                />
            </div>
            
            <form onSubmit={handleSignUp}>
                <input
                    type="username"
                    placeholder="Username"
                    className="bg-white border-none p-2 my-2 w-full rounded-lg text-sm h-[35px]"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-white border-none p-2 my-2 w-full rounded-lg text-sm h-[35px]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="bg-white border-none p-2 my-2 w-full rounded-lg text-sm h-[35px]" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    type="submit"  
                    className="bg-gradient-to-r from-[#1678E6] to-[#0C3C87] text-white font-bold rounded-full py-2 w-full h-[35px] text-sm uppercase transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#ff4b2b] hover:to-[#1678E6] active:scale-95 focus:outline-none">
                        Sign Up
                </button>
            </form>
            <p>{message}</p>
            
            <p className="mt-2 text-xs text-center text-gray-600">
                Already have an account?{" "}
                <span onClick={() => setSignIn(true)} className="text-[#1678E6] font-bold cursor-pointer hover:underline">Sign In</span>
            </p>
        </motion.div>

        {/* Overlay */}
        <motion.div
            initial={{ opacity: 0, x: '70%' }}
            animate={{ opacity: 1, x: '0%' }}
            className="absolute top-0 right-0 z-0 hidden w-1/2 h-full overflow-hidden md:block"
            transition={{ duration: 0.6 }}
        >
            <div
                className={`text-white h-full transition-all duration-600 ease-in-out `}
                style={{
                    background: `linear-gradient(to right, #536CE3, #001FB2)`,  // Gradasi biru
                    position: 'relative',
                  }}
            >
                <div
                style={{
                    backgroundImage: `url(${BgTextureCard2})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.15,
                    zIndex: 1, 
                }}
                ></div>
                <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full px-10 py-16">
                    {/* Featuring Section */}
                    <img 
                        src={ObjectSVG} 
                        alt="Adinda Illustration" 
                        className="w-full"
                    />
                    
                    <div className="text-center">
                        <h1 className="text-xl font-bold">Featuring</h1>
                        <p className="mt-2 text-3xl font-light">Guided Assistance <b>Adinda</b></p>
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
  );
}
