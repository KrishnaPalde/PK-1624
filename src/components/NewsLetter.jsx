import React, { useState } from 'react';
import axios from 'axios';

function NewsLetter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4444/api/subscribe', { email });
      // const response = await axios.post('https://pk-1624.onrender.com/api/subscribe', { email });      
      // login();
      // setError(null);
      // navigate('/admin');
      alert(response.data.message);
      setEmail('')
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <section className="flex flex-col md:flex-row bg-sky-100 rounded-[30px] overflow-hidden max-w-full mx-auto md:h-[400px] xl:space-x-80">
      <div className="flex flex-col p-8 md:p-18 md:w-1/2">
        <div className="self-start px-6 py-3 text-base font-bold text-center text-black bg-yellow-400 rounded-[50px]">
          Join our newsletter
        </div>
        <h2 className="text-2xl font-semibold leading-tight text-black md:text-3xl mt-7">
          Subscribe to see secret deals
          <br />
          prices drop the moment you signup!
        </h2>
        <form className="flex flex-col gap-3 mt-8 sm:flex-row">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-6 py-4 text-base text-neutral-400 bg-white border border-solid border-zinc-200 rounded-[50px]"
          />
          <button
            type="submit"
            className="px-9 py-4 text-sm font-bold text-center text-white whitespace-nowrap bg-sky-400 rounded-[50px]"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </form>
        <p className="mt-5 text-sm font-medium text-neutral-500">
          No ads. No trials. No commitments
        </p>
      </div>
      <div className="h-64 md:w-1/2 md:h-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/71dd4471539c37ccc60a104cc0d512b01ecabb5c48c94bb8eabe9c3a59666fe6?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
          alt="Newsletter illustration"
          className="object-cover w-full h-full"
        />
      </div>
    </section>
  );
}

export default NewsLetter;