// Star component
import { useState } from "react";

function Star({ id, filled, hovered, onClick, onHover ,data }) {
   const starStyle = {
      display:"inline",
      alignItem:"center",
     width:"500px",
     height:"50px",
     cursor:"pointer"
   };

   return (
     <span
       style={starStyle}
       onClick={() => onClick(id)}
       onMouseEnter={() => onHover(id, true)}
       onMouseLeave={() => onHover(id, false)}
     >
       {/* {filled ? "🌟" : "⭐"} */}
       {hovered ? `${"🌟"}`: `${"⭐"}` }
      
     </span>
   );
 }
 
 // Rating component
 function Rating(message =[]) {
   const [rating, setRating] = useState(0);
   const handleClick = (id) => {
     setRating(id);
   };
 
   const handleHover = (id, isHovered) => {
     setRating(id);
   };
   const stars = [...Array(10)].map((_, i) => {
     return (
       <Star
         key={i}
         id={i + 1}
         //filled={i + 1 <= rating}
         hovered={i + 1 === rating}
         onClick={handleClick}
         onHover={handleHover}
         // <printData Items={items}/>
       />
     );
   });
 
   const styles = {
      color:"bule",
      width:"1500px",
      height:"40px"
   }
   return (
     <div>
       {stars}
       <p style={styles}>Your Rating:{rating}</p> 
       {/* {message.length===rating ? message[rating-1] : message[0]} */}
       {/* <p>The Movie is{[message]}</p> */}
     </div>
   );
 }
 

 function printData(Items){
   return(
   <span>{Items}</span>
   )
 }
 export default Rating;
 