"use client"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import next/router instead of next/navigation
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import { auth } from '../firebase';

function SignUpModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { setUser } = useAuth();
  
  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // Update the user's display name
        updateDisplayName(user, displayName);
        setUser(user);

        router.push("/main")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };

  const updateDisplayName = (user, displayName) => {
    // You can update the user's display name using the updateProfile function
    updateProfile(user, { displayName: displayName })
      .then(() => {
        // Display name updated successfully
      })
      .catch((error) => {
        // Handle any errors that occur during the update
        console.error(error);
      });
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-sm mx-4 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
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
        <div className="mb-4">
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
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <button
          className="bg-indigo-500 text-white w-full py-2 rounded-lg active:bg-blue-900 hover:bg-indigo-600 transition duration-300 ease-in-out"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
      <Link href="/tire">
        <div className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-700 active:bg-blue-900 p-2 rounded-full">
          <AiOutlineClose />
        </div>
      </Link>
    </div>
  );
}

export default SignUpModal;
