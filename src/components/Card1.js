import React from 'react';

const Card1 = ({ title, children }) => {
  return (
    <div className="Card1">
      <div className="title-container">
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default Card1;
