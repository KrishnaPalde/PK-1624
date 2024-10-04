import React from 'react';

const GoogleMap = () => {
  return (
    <div style={{ paddingTop: '50px' }}>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3442.259322371591!2d78.07461437645563!3d30.37199337476011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d7f6cb9f6351%3A0xc745439aa9ff725b!2sTranquil%20Trails-Holiday%20Homes!5e0!3m2!1sen!2sin!4v1728038557203!5m2!1sen!2sin"
        style={{
          width: '1200px',
          height: '450px',
          border: '0',
          borderRadius: '10px',
        }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};


export default GoogleMap;