// import React, { useState } from 'react';
// import axios from 'axios';
// const process = import.meta.env;

// function NewsLetter() {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState(null);

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     try {
//       // const response = await axios.post('http://localhost:4444/api/subscribe', { email });
//       const response = await axios.post(`${process.VITE_HOST_URL}/api/subscribe`, { email });      
//       // login();
//       // setError(null);
//       // navigate('/admin');
//       alert(response.data.message);
//       setEmail('')
//     } catch (error) {
//       setError(error.response.data.error);
//     }
//   };

//   return (
//     <section className="flex flex-col md:flex-row bg-sky-100 rounded-[30px] overflow-hidden max-w-full mx-auto md:h-[400px] xl:space-x-80">
//       <div className="flex flex-col p-8 md:p-18 md:w-1/2">
//         <div className="self-start px-6 py-3 text-base font-bold text-center text-white bg-[#335064] rounded-[50px]">
//           Join our newsletter
//         </div>
//         <h2 className="text-2xl font-semibold leading-tight text-black md:text-3xl mt-7">
//           Subscribe to see secret deals
//           <br />
//           prices drop the moment you signup!
//         </h2>
//         <form className="flex flex-col gap-3 mt-8 sm:flex-row">
//           <input
//             type="email"
//             placeholder="Your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="flex-grow px-6 py-4 text-base text-neutral-400 bg-white border border-solid border-zinc-200 rounded-[50px]"
//           />
//           <button
//             type="submit"
//             className="px-9 py-4 text-sm font-bold text-center text-white whitespace-nowrap bg-[#335064] rounded-[50px]"
//             onClick={handleSubscribe}
//           >
//             Subscribe
//           </button>
//         </form>
//         <p className="mt-5 text-sm font-medium text-neutral-500">
//           No ads. No trials. No commitments
//         </p>
//       </div>
//       <div className="h-64 md:w-1/2 md:h-full">
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/71dd4471539c37ccc60a104cc0d512b01ecabb5c48c94bb8eabe9c3a59666fe6?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
//           alt="Newsletter illustration"
//           className="object-cover w-full h-full"
//         />
//       </div>
//     </section>
//   );
// }

// export default NewsLetter;

import React, { useState } from 'react';

function NewsLetter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const FORM_ID = '7178163'; 
    const API_KEY = 'bSC6E2BsJ3AHb56zvpicww'; 

    try {
      const response = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          api_key: API_KEY,
          email: email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col md:flex-row bg-sky-100 rounded-[30px] overflow-hidden max-w-full mx-auto md:h-[400px] xl:space-x-80">
      <div className="flex flex-col p-8 md:p-18 md:w-1/2">
        <div className="self-start px-6 py-3 text-base font-bold text-center text-white bg-[#255d69] rounded-[50px]">
          Join our newsletter
        </div>
        <h2 className="text-2xl font-semibold leading-tight text-black md:text-3xl mt-7">
          Subscribe to see secret deals
          <br />
          prices drop the moment you signup!
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-8 sm:flex-row">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-6 py-4 text-base text-gray-600 bg-white border border-solid border-zinc-200 rounded-[50px]"
            required
          />
          <button
            type="submit"
            className="px-9 py-4 text-sm font-bold text-center text-white whitespace-nowrap bg-[#255d69] hover:bg-[#243947] rounded-[50px] disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {message && <p className="mt-3 text-sm font-medium text-green-600">{message}</p>}
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