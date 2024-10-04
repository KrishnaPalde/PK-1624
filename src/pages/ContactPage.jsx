import React from 'react';
import Header from '../components/Header';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';
import Newsletter from '../components/NewsLetter';
import Footer from '../components/Footer';
import GoogleMap from '../components/ContactUsMapComponent';
import img1 from '../assets/apartment1.png';
import img2 from '../assets/apartment2.png';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const ImageLayout = () => {
  return (
    <div className="relative w-full p-4 mt-8 rounded-lg h-[600px]" data-aos="fade-left"> 
      <div className="absolute top-0 left-0 w-2/3 overflow-hidden bg-white rounded-lg shadow-lg h-5/6"> 
        <img 
          src={img1} 
          alt="Interior design" 
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute bottom-0 w-1/2 overflow-hidden bg-white rounded-lg shadow-lg top-20 right-20 h-4/5"> 
        <img 
          src={img2} 
          alt="Staircase design" 
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};


const MainContent = () => { 
  AOS.init({
    duration: 1600,
  })
  return (
    <main className="flex flex-col items-center pt-12 bg-white font-paragraph">
      <div className="flex flex-col self-center px-10 w-full max-w-[1323px] max-md:max-w-full">
      <Header />
      <section className="pl-6 mt-24 mr-auto text-2xl leading-9 text-black max-md:pl-8 max-md:mt-10 max-md:mr-auto max-md:max-w-full max-sm:pl-4">
        Get Started
      </section>
      <h1 className="pl-6 mt-8 mr-auto text-6xl font-bold text-black leading-[81px] w-[1099px] max-md:pl-8 max-md:max-w-full max-md:text-4xl max-md:leading-[60px] max-sm:pl-4">
        Get in touch with us. <br /> We're here to assist you.
      </h1>
      <div className="mt-36 w-full max-w-[1161px] max-md:mx-auto max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[45%] max-md:ml-0 max-md:w-full">
            <ContactForm />
          </div>
          {/* <div className="flex flex-col ml-5 w-[55%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col justify-center mt-2 grow max-md:hidden max-md:mt-10 max-md:max-w-full max-sm:flex" data-aos="fade-left">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4c3d54ab5c9c890fb61e98bd8a9e63da10f285688c7e6c5822d2be328411302?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc" alt="Contact illustration" className="w-full aspect-[0.98] rounded-[30px] max-md:hidden max-md:max-w-full max-sm:hidden" />
            </div>
            <ImageLayout className="w-full aspect-[0.98] rounded-[30px] max-md:hidden max-md:max-w-full max-sm:hidden"/>
          </div> */}
          <div className="flex flex-col ml-5 w-[55%] max-md:ml-0 max-md:w-full max-md:hidden max-md:max-w-full max-sm:hidden" >
              <ImageLayout/>
            </div>
        </div>
      </div>
      </div>
      <div><GoogleMap /></div>
      <br></br><br></br><br></br><br></br>
      <div className='w-full '>
      <ContactInfo />  
      </div>
      
      <br></br><br></br><br></br><br></br>
      <Newsletter />
      <Footer />
    </main>
  );
};

export default MainContent;