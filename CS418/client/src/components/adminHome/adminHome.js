import React, { useEffect, useState } from 'react';

export default function AdminHome() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userEmail = params.get('email');
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const approveUserPage = () => {
    window.location.href = `http://localhost:3000/approveUsers?email=${email}`;
  }

  const courseInfo = () => {
    window.location.href = `http://localhost:3000/admin-course-form`;
  }

  const studentAdvisingSheets = () => {
    window.location.href = `http://localhost:3000/admin-advising-sheet`;
  }

  return (
    <main className="max-w-2xl mx-auto p-6 text-black">
        {/* Access Profile Page */}
        <div className='mb-6'>
            <button  
            className="bg-amber-900 text-white px-4 py-2 rounded-full hover:bg-amber-800 w-full"
            onClick={approveUserPage}
            >
              Approve New Users
            </button>
        </div>

        {/* Access Course Form */}
        <div className='mb-6'>
            <button  
            className="bg-amber-900 text-white px-4 py-2 rounded-full hover:bg-amber-800 w-full"
            onClick={courseInfo}
            >
              Update Course Information
            </button>
        </div>

        {/* Access Student Advising Sheets */}
        <div className='mb-6'>
            <button  
            className="bg-amber-900 text-white px-4 py-2 rounded-full hover:bg-amber-800 w-full"
            onClick={studentAdvisingSheets}
            >
              Student Advising Sheets
            </button>
        </div>
    </main>
  );
}