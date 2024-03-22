import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userEmail = params.get('email');
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const profilePage = () => {
    window.location.href = `http://localhost:3000/profile?email=${email}`;
  }

  const advisingPage = () => {
    window.location.href = `http://localhost:3000/advising-page?email=${email}`;
  }

  return (
    <main className="max-w-2xl mx-auto p-6 text-black">
        {/* Access Profile Page */}
        <div className='mb-6'>
            <button  
            className="bg-amber-900 text-white px-4 py-2 rounded-full hover:bg-amber-800 w-full"
            onClick={profilePage}
            >
              Profile Page
            </button>
        </div>

        {/* Access to view and manage adivisng records */}
        <div className='mb-6'>
            <button  
            className="bg-amber-900 text-white px-4 py-2 rounded-full hover:bg-amber-800 w-full"
            onClick={advisingPage}
            >
              Advising Records
            </button>
        </div>
    </main>
  );
}