import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Appv3 from './Appv3';
// import StarRating from './StarRating';
 //import Rating from './StarRating';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     {/* <Rating /> */}
    {/* <Rating message={["Terrible" , "Bad" ,"Average" , "Good" , "Very Good" , "Amazing"]}/> */}

    <Appv3 />
  </React.StrictMode>
);

