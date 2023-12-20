import { useEffect } from "react";

export function useKey( key , onback){
    useEffect(function (){

        function Callback(e){
          if(e.code === key)
          {
            onback();
          }
        }
        document.addEventListener("keydown" ,Callback );
      
    //   return function(){
    //    document.removeEventListener("keydown" , Callback);
    //   }
      
      },[onback])
}