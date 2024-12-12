import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SignIn from '../component/signIn';  
import SignUp from '../component/signUp';  

export default function App() {
    const [signIn, setSignIn] = useState(true);

    return (
        <motion.div className="bg-[#EDF2FF] shadow-lg relative overflow-hidden w-full h-screen">
            {/* Navbar */}
            <div className="fixed z-10 w-auto px-4 py-1 text-white transform -translate-x-1/2 bg-white rounded-full shadow-md md:px-6 top-5 left-1/2">
                <div className="flex items-center justify-between w-full">
                    <div>
                        <button
                            onClick={() => setSignIn(true)}
                            className={`px-6 py-2 rounded-full font-semibold ${signIn ? 'bg-[#1678E6] text-white' : 'bg-transparent text-black border-2 border-white'}`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setSignIn(false)}
                            className={`ml-4 px-6 py-2 rounded-full font-semibold ${!signIn ? 'bg-[#1678E6] text-white' : 'bg-transparent text-black border-2 border-white'}`}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>

            {/* Render SignIn or SignUp component based on signIn state */}
            {signIn ? <SignIn /> : <SignUp setSignIn={setSignIn} />}
        </motion.div>
    );
}
