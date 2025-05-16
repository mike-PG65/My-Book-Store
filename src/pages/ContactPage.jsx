import React from "react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";


const spreeId = import.meta.env.VITE_SPREE_ID

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false)
  const [emptyField, setEmptyField] = useState(null)


  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)

    try {

      if (!name && !email && !message) {
        setEmptyField("All fields are required!");
        return;
      }

      if(!name){
        setEmptyField("Please Enter your name!!")
        return
      } if(!email){
        setEmptyField("Please Enter your email!!")
        return
      } if(!message){
        setEmptyField("Please Enter your message!!")
        return
      }
     
      // }else{
      //   setEmptyField("All fields are required!!")

      //   return
      // }

      const response = await fetch(`https://formspree.io/f/${spreeId}`,{
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      })
      console.log(response)

     if(response.ok){
      console.log("You have sucessfuly sent your message")

      setName("");
      setEmail("");
      setMessage("")

      setSuccess("You have sucessfuly sent your message")
     }else{
      setError(data?.error || "Something went wrong!");
     }
      
    } catch (error) {
      console.log(error)
      setError("Something went wrong!!")
      
    }finally{
      setLoading(false)
    }

  };
  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-white mx-auto rounded-xl px-12 py-8 mt-20 w-150">

        <h1 className="text-center mb-4 text-2xl font-bold"> Send message </h1>
      {
          (emptyField) && (
            
              <div className="text-center text-red-500 py-2 mb-3 rounded-lg bg-red-300">
                 {emptyField}                
                 </div>         
            )
        }
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <label htmlFor=""> Name </label>
            <input
              type="text"
              className={`border px-4 py-2 w-full border-gray-300 rounded-xl ${emptyField && !name ? ('border-2 border-red-500') : ('border-gray-300')}`}
              placeholder="Enter your name"
              onChange={(e)=>{setName(e.target.value); setEmptyField("")}}
              value={name}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor=""> Email </label>
            <input
              type="email"
              className={`border px-4 py-2 w-full rounded-xl border-gray-300 ${emptyField  && !email? ('border-2 border-red-500') : ('border-gray-300')}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value); setEmptyField("")}}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor=""> Message </label>
            <textarea
              type="text"
              className={`border px-4 py-2 w-full rounded-xl border-gray-300 ${emptyField  && !message? ('border-2 border-red-500') : ('border-gray-300')}`}
              placeholder="Type your message"
              value={message}
              onChange={(e)=>{setMessage(e.target.value); setEmptyField("")}}
            />
          </div>

          <button
            className="bg-blue-500 px-4 py-2 rounded-lg mt-3"
            type="submit"
          >
            Send Message
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default ContactPage;
