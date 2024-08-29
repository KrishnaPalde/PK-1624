import React from 'react';

const GoogleMap = () => {
  return (
    <div style={{ paddingTop: '50px' }}>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17567.213764638378!2d78.06446312393203!3d30.380471353366392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d7b81915745b%3A0xc5310d4d85c27ae!2sPacific%20Hills!5e0!3m2!1sen!2sin!4v1724924173246!5m2!1sen!2sin"
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