import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userEmail = params.get('email');
    if (userEmail) {
      setEmail(userEmail);
      fetchData(userEmail);
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/approved/approved`);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const approveUser = async (user) => {
    await approve_user(user);
  }

  const approve_user = async (user) => {
    const formBody = JSON.stringify({
      is_approved: 1
    })

    try {
      const res = await axios.put(`http://localhost:8080/user/approved/${user.u_id}`, formBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(res.status == 200){
        alert(`${user.u_first_name} ${user.u_last_name} was successfully approved`);
        window.location.reload();
      }

      else{
        alert("Error: user was unable to be approved")
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
  <main className="max-w-2xl mx-auto p-6 text-black">
  {userData ? (
      <>
        {userData.map(user => (
          <div key={user.id} className="mb-8 bg-stone-400 rounded-3xl py-6 px-6">
            <section>
              <h2 className="mb-2 text-center"><strong>{user.u_first_name} {user.u_last_name}</strong></h2>
              <div className="flex flex-col space-y-4">
                <button  
                  className="bg-amber-900 text-white px-4 py-2 rounded-full hover:bg-amber-800"
                  onClick={() => approveUser(user)}
                  >
                  Approve User?
                </button>
              </div>
            </section>
          </div>
        ))}
      </>
    ) : null}
      </main>
  );
}