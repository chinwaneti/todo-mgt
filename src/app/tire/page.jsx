"use client"
import { useAuth } from '../context/Page';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import { auth } from '../firebase';

function SignInModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { setUser } = useAuth(); 

  const handleClose = () => {
    onClose();
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMessage('')
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateDisplayName(user, displayName);
        setUser(user); 
        console.log(userCredential);
        router.push('/main');
      })
      .catch((error) => {
         if (error.code === '400 (Bad Request)') {
          setErrorMessage('Email or Password error.');
        } else {
          setErrorMessage('email or Password error!');
        }
      });
  };

  const updateDisplayName = (user, displayName) => {
    updateProfile(user, { displayName: displayName })
      .then(() => {
      })
      .catch((error) => {
        console.error(error);
      });
  };

  

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center 
       bg-gray-200 
       transition-opacity duration-300 ease-in-out`}
    >
      <div className="bg-white w-96 rounded-lg relative shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
      
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full mt-1 py-2 px-3 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full mt-1 py-2 px-3 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            className="w-full mt-1 py-2 px-3 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
            placeholder="Enter your display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div onClick={handleClose} className='absolute top-1 right-1 hover:bg-gray-100 p-2 rounded-full'>
          <AiOutlineClose />
        </div>
        <div>
          {errorMessage && ( <p className='text-red-600'>{errorMessage}</p> )}
        </div>
        <button
          className="bg-indigo-500 text-white w-full py-2 rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out"
          onClick={handleSignIn} 
        >
          Sign In
        </button>
        <p className="text-gray-500 mt-4 text-center text-sm">
          No account? <Link href="/tired" className='font-bold hover:text-indigo-600'>Sign up</Link>
        </p>
      </div>
      
    </div>
  );
}

export default SignInModal;