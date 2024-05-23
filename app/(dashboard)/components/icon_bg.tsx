import React from 'react';

const IconBackground = ({ Icon, colour }) => {
  const size = '1.5em'; 

  return (
    <div 
      className={`d-flex align-items-center justify-content-center rounded-circle`} 
      style={{ width: size, height: size, backgroundColor: colour }}
    >
      <Icon size="1em" />
    </div>
  );
};

export default IconBackground;
