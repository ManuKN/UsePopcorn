import { useEffect,useState } from "react";
import StarRating from "./StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  const KEY = "c34dcdef"

  export default function App() {
    const [query, setQuery] = useState('Interstellar');
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState("");
    const [selectedID , setSelectedID] = useState("tt0816692");

    // useEffect(function(){
    //     console.log("Content Executing")
    // },[query])
    //let cinema = {query}
function handleSelectedID(id){
  setSelectedID((selectedID) => (selectedID === id ? null : id));
}

function handlebackbutton(){
  setSelectedID(null)
}

function handleAddWatched(movie){
    setWatched((watched) =>[...watched ,movie])
}
function handleDeleteMovies(id){
  setWatched((watched)=>watched.filter(movie => movie.imdbID !== id));
}
    useEffect( function (){
             async function fetchMovies()
            { 
              try{
             setLoading(true)
             setError("")
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

            if(!res.ok)
             throw new Error("Something went Wrong☹️ with Fetching Movies");

              const data = await res.json();

              if(data.response === "false")
              throw new Error("⛔Movie not Found");

              setMovies(data.Search)
              console.log(data.Search)
              setLoading(false)
                }
                catch(err)
                {
                    console.error(err.message)
                    setError(err.message) 
                }
                finally{
                    setLoading(false)
                }
              }
              if(query.length < 3)
              {
                setMovies([]);
                setError("");
                return;
              }
              fetchMovies();
 },[query])

    return (
      <>
       <NavBar movies={movies}>

       <Logo/>
        <Input query={query} setQuery={setQuery}/>
        <NumResult movies={movies}/>
        
       </NavBar>

       <MainPage movies={movies}>
         
       <Box  movies={movies}>

        {/* {loading ? <loader /> : <MovieList movies={movies} />} */}
        {loading &&  <Loader />}
        {!loading && !error && <MovieList movies={movies} onSelectedID={handleSelectedID}/>}
        {error && <ErrorMessage message={error}/>}

       </Box>
       <Box  movies={movies}>
       {selectedID ?  <Moviesdetails selectedID={selectedID} onback={handlebackbutton} onAddWatched={handleAddWatched} watched={watched}/>:
      <>
      <WatchSummary  watched={watched}/>
        <WatchedList watched={watched} onDeleteMovies={handleDeleteMovies}/>
      </> }
      
       </Box>

       {/* <WatchedBox/> */}

       </MainPage>
        
      </>
    );
  }


  function Loader(){
return <p className="loader">Loading...</p>
  }

  function ErrorMessage({message}){
    return <p className="error">
        <span>⛔</span>{message}
    </p>
  }
  function NavBar({children}){
   
    return(
    <nav className="nav-bar">
        {children}
      </nav>)
  }
function Logo(){
  return(
  <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>)
}

  function Input({query , setQuery}){
   
    return(<input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />)
  }

  function NumResult({movies}){
    return(<p className="num-results">
          Found <strong>{movies?.length}</strong> results
        </p>)
  }
  function MainPage({children}){
    return(
<main className="main">
     {children}
      </main>)
  }

  function Box({children}){

    const [isOpen1, setIsOpen1] = useState(true);
    return(
    <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen1((open) => !open)}
    >
      {isOpen1 ? "–" : "+"}
    </button>
    {isOpen1 && [children]}
  </div>)
  }

  // function WatchedBox(){
  //   const [watched, setWatched] = useState(tempWatchedData);
  // const [isOpen2, setIsOpen2] = useState(true);
 
  //   return(
  //     <div className="box">
  //         <button
  //           className="btn-toggle"
  //           onClick={() => setIsOpen2((open) => !open)}
  //         >
  //           {isOpen2 ? "–" : "+"}
  //         </button>
  //         {isOpen2 && (
  //           <>
              
  //           </>
  //         )}
  //       </div>
  //   )

  // }

  function MovieList({movies , onSelectedID }){
    
    return(<ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie movie={movie}  key={movie.imdbID} onSelectedID={onSelectedID}/>
        ))}
      </ul>)
  }

  function Movie({movie, onSelectedID}){
    return(
      <li onClick={() => onSelectedID(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
              <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
              </p>
            </div>
          </li>
    )
  }
  
  function Moviesdetails({selectedID,onback ,  onAddWatched , watched}){
    const[movie , setMovie] = useState({});
    const[isLoading , setIsloading] = useState(true);
    const[userRating , setUserRating] = useState(7);

    const isWatched = watched.map((movie)=> movie.imdbID).includes(selectedID);
    const isRatedMovies = watched.find((movie) => movie.imdbID === selectedID)?. userRating;

const{
  Title:title ,
   Year : year,
    Poster : poster ,
     Runtime : runtime ,
      imdbRating ,
       Plot:plot ,
        Released : released ,
         Actors:actors ,
          Director:director ,
           Genre:genre } = movie;


 useEffect( function (){
  async function getMovieDetails(){
  setIsloading(true)
 const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`);
 const data = await res.json();
 console.log(data)
 setMovie(data)
 setIsloading(false)
  }
 getMovieDetails();
 } , [selectedID])

function handleAdd(){
const newWatchedMovie = {
  imdbID :selectedID ,
   title ,
    year ,
    poster ,
     imdbRating,
     runtime : Number(runtime.split(" ").at(0)),
     userRating
}
  onAddWatched(newWatchedMovie);
  onback();
}

    return <div className="details">
      {isLoading ? <Loader /> :
      <>
      <header>
      <button className="btn-back" onClick={onback}>&larr;</button>
      <img src={poster} alt={`Poster of ${movie} movie`}/>
      <div className="details-overview">
        <h2>{title}</h2>
        <p>
          {released} &bull; {runtime}
        </p>
        <p>{genre}</p>
        <p><span>⭐</span>{imdbRating}IMDB Rating</p> 
      </div>
      </header>
      <section>
        <div className="rating">
          {!isWatched ? (
          <>
          <StarRating />
        <button className="btn-add" onClick={handleAdd}>+Add to list</button>
        </>)
         : (<p>You Already Added this Movie to the List with Rated  {isRatedMovies} <span>🌟</span></p>)} 
        </div>
        <p>{plot}</p>
        <p>Starring{actors}</p>
        <p>Directed By{director}</p>
      </section> 
      </>     
      }
      
      </div>
  }

function WatchSummary({watched}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return(
    <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                  </p>
                </div>
              </div>
  )
}

function WatchedList({watched , onDeleteMovies}){
  return(
    <ul className="list">
    {watched.map((movie) => (
      <WatchedMovies movie={movie} onDeleteMovies={onDeleteMovies}/>
    ))}
  </ul>
  )
}

function WatchedMovies({movie , onDeleteMovies}){
  return(<li key={movie.imdbID}>
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <h3>{movie.title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
      <button className="btn-delete" onClick={()=>onDeleteMovies(movie.imdbID)}>X</button>
    </div>
  </li>)
}