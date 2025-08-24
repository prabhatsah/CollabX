import React from 'react';
import './moving-pig.css';
import { cn } from '@/lib/utils';

const MovingPig = () => {
  return (
    <div className="capybaraloader">
      <div className="capybara">
        <div className="capyhead">
          <div className="capyear">
            <div className="capyear2"></div>
          </div>
          <div className="capyear"></div>
          <div className="capymouth">
            <div className="capylips"></div>
            <div className="capylips"></div>
          </div>
          <div className="capyeye"></div>
          <div className="capyeye"></div>
        </div>
        <div className="capyleg"></div>
        <div className="capyleg2"></div>
        <div className="capyleg2"></div>
        <div className="capy"></div>
      </div>
      <div className="moving-pig-loader">
        <div className="loaderline"></div>
      </div>
    </div>
  );
};

export default MovingPig;
