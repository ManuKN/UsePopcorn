import React from 'react'
 const ContainerStyle = {
    display: "flex",
    alignItems:"center",
    gap:"16px"
 }
 const starContainerStyle = {
    display:"flex",
    gap:"18px"
 }
 const textStyle = {
    lineHeight:"5px",
    margin:"0"
    }
function StarRating() {
  return (
    <div style={ContainerStyle}>
    <div style={starContainerStyle}>
     {Array.from({length:5},(_,i)=>(<span>S{i+1}</span>))}
    </div>
    <p style={textStyle}>10</p>    
    </div>
  )
}

export default StarRating