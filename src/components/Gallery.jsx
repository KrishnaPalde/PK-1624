import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.jpg";
import gallery5 from "../assets/gallery5.jpg";
import gallery6 from "../assets/gallery6.jpg";
import sunset2 from "../assets/Sunset2.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

function Gallery() {
  AOS.init({
    duration: 1600,
  })
  
  return (
    <section className="flex flex-col items-center w-full bg-white md:p-20 max-md:px-5 max-md:max-w-full" data-aos="fade-right">
      <h2 className="mt-5 text-base font-bold text-center uppercase text-blue-950 tracking-[2.4px] max-md:max-w-full">
        Gallery of the best apartment rooms
      </h2>
      <h3 className="mt-5 text-4xl font-bold text-center text-zinc-800 max-md:max-w-full">
        Apartment Gallery in Tranquil Trails
      </h3>
      <div className="px-px mt-9 w-full max-w-[1241px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col lg:w-[51%] md:w-[41%] max-md:ml-0 max-md:w-full">
            <div className="flex relative flex-col grow justify-center p-9 min-h-[300px] rounded-[30px] max-md:px-5 max-md:mt-8 max-md:max-w-full">
              <img
                loading="lazy"
                src={gallery1}
                // src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4188ad80aaef4777a38661217da85760fbb61a6cb76773d1e850f9781d05fb2?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                alt="Modern room with view"
                className="absolute inset-0 object-cover rounded-[30px] size-full object-right"
              />
              <div className="relative mt-20 rounded-full max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  <div className="flex flex-col w-[81%] max-md:ml-0 max-md:w-full">
                    <div className="relative flex flex-col grow max-md:mt-10">
                      <h4 className="text-4xl font-bold text-white">
                        Modern room
                      </h4>
                      <p className="mt-2.5 text-lg leading-7 text-gray-700 text-opacity-80">
                        Adequate facilities are available, making your
                        activities easier
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-3/12 ml-5 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={gallery2}
              // src="https://cdn.builder.io/api/v1/image/assets/TEMP/1b1c3c96b9af9fd053109ae42e3e44a2a85d2f5ff1f0ca71b526a22d319430c0?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
              alt="Gallery image 1"
              className="grow shrink-0 max-w-full aspect-[0.97] rounded-[30px] w-[290px] max-md:mt-8"
            />
          </div>
          <div className="flex flex-col items-center w-3/12 ml-5 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={gallery3}
              // src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1a932f53cc13b87772ae95b3c824146b71086ea2d7bab141219d7601c1098b8?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
              alt="Gallery image 2"
              className="grow shrink-0 max-w-full aspect-[0.97] rounded-[30px] w-[290px] max-md:mt-8 object-cover"
            />
          </div>
        </div>
      </div>
      <div className="px-px mt-8 mb-5 w-full max-w-[1241px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={sunset2}
              // src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f003045da07209d12d16472ad60365e0e9329b23c963a31a01c00ab4dad386f?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
              alt="Gallery image 3"
              className="grow w-full aspect-[1.32] rounded-[30px] max-md:mt-8 object-cover"
            />
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={gallery5}
              // src="https://cdn.builder.io/api/v1/image/assets/TEMP/d85c1d28716f6152c96b5e20d485d75ee042a375da2e45f1653f0e080a5557b8?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
              alt="Gallery image 4"
              className="grow w-full aspect-[1.32] rounded-[30px] max-md:mt-8 object-cover"
            />
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={gallery6}
              // src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d4026f29a544d9a8c8f65d0ed676d955079495320b4bd0c78a670546f8ad3a9?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
              alt="Gallery image 5"
              className="grow w-full aspect-[1.32] rounded-[30px] max-md:mt-8 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
