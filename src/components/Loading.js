import React from 'react';
import loadingSvg from '../img/loading.svg';

const Loading = () => {
  return (
    <div className="Loading">
      <h2>Chargement...</h2>
      <img src={loadingSvg} alt="" />
    </div>
  );
};

export default Loading;
