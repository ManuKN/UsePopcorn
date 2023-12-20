import { useState , useEffect } from "react";
export function useLocalStorage(initialState ,key ){
    
    const [watched, setWatched] = useState(function(){
        const storedValue = localStorage.getItem(key);
         return JSON.parse(storedValue);
      });

      useEffect(function(){
        localStorage.setItem(key , JSON.stringify(watched))
      },[watched , key])
      return [watched , setWatched]
}