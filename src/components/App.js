import axios from 'axios'
import {useState} from 'react'
import React from 'react'

import {BrowserRouter as Router,Link} from "react-router-dom";
import { Switch,Route} from 'react-router';
import { string } from 'prop-types';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [returnedData, setReturnedData] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const options = {
    method: 'GET',
    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    params: {s: searchValue, page: currentPage, r: 'json'},
    headers: {
      'x-rapidapi-key': '9599710463msh94fa16f7db1912cp1589d7jsn3837ccd953d3',
      'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
    }
  };
  const [isAxiosing,setIsAxiosing] = useState(false)
  const handleSubmit =(e) => {
  e.preventDefault()
  setIsAxiosing(true)
  axios.request(options).then((res)=>setReturnedData(res.data.Search)).then(setIsAxiosing(false)).catch(e=>{console.log(e)})
  }
  const handleClickBack=(e)=>{
    setCurrentPage(currentPage-1);
    handleSubmit(e)
    window.scroll(0,0)
  }
  const handleClickForward=(e)=>{
    setCurrentPage(currentPage+1);
    handleSubmit(e)
    window.scroll(0,0)
  }
  if(returnedData){
  return (
    <Router>
    
    <div id="page_container">
    <a id="home" href="http://localhost:3000">HOME</a>
      <form id="only_form" onSubmit={handleSubmit}>
        <input  placeholder="Search movie title..." className="search_field" type='text' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}></input>
        <button type='submit' >SEARCH</button> </form>
        <div id="grid_container">
        {returnedData.map((movie)=>
        <a key ={movie.imdbID} href ={"https://www.imdb.com/title/"+movie.imdbID}>
        <div className="grid_child">
        <div  className="movie_title" >{movie.Title}</div>
        <img className ="movie_poster" src={movie.Poster}></img></div></a>)}
        {returnedData.length>0 && (<div>{currentPage>1&&(<span onClick={handleClickBack}>{currentPage-1}</span>)}<span>{currentPage}</span><span onClick={handleClickForward}>{currentPage+1}</span></div>)}
        </div>
        
        
    </div>
    </Router>
  
  )
        }
        else{
          return(<>
            <a id="home" href="http://localhost:3000">HOME</a>
          <h1>INVALID REQUEST</h1>
          </> )
        }
}

