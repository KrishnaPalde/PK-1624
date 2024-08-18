import React from 'react';

const GoogleMap = () => {
  return (
    <div style={{ paddingTop: '50px' }}>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110204.5877173802!2d77.93473400377341!3d30.325550804933673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c356c888af%3A0x4c3562c032518799!2sDehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1723989193351!5m2!1sen!2sin"
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
