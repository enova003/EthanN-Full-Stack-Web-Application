"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, showMessage] = useState(false);
  const [label, setLabel] = useState("");

  const userCreation = async () => {
    //alert("userCreation works");
    const formBody = JSON.stringify({
      u_email: email,
      u_password: password,
    });

    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.ok) {
      showMessage(true);
      var code;
      while (code == null){
        //alert(data.data.verify);
        code = prompt("Please enter the 5-digit verification code that was sent to your email");
        if(code == data.data.verify){
          if(data.data.admin == 1){
            alert("You are now being redirected to the admin page");
            window.location.href = `http://localhost:3000/admin_home?email=${email}`;
          }else{
            alert("login successful, redirecting you to your profile page")
            window.location.href = `http://localhost:3000/user-home?email=${email}`;
          }
        }
        else{
          alert("The verification code that you entered is incorrect");
        }
      }
    }else{
      if(!(res.ok)){
        showMessage(true);
      }
    }

    setLabel(data.message);
  };

  const onSubmit = () => {
    userCreation();
    //alert("onSubmit works");
  };

  return (
    <main className="flex">
        <div 
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm py-4 px-4 rounded-3xl bg-stone-400"
        >
         {message && (
         <label
          htmlFor="label"
          className="font-medium" Style="color:black"
        >
          {label}
        </label>
         )}
         <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                  className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                  className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
            <button
              className="flex w-full justify-center rounded-full bg-amber-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-900"
              onClick={onSubmit}
            >
              Login
            </button>
            </div>
            <a 
            className="text-black text-center hover:underline"
            href="http://localhost:3000/forgot-password"
            >
              Forgot Password?
            </a>
        </div>
      </div>
    </main>
  );
}