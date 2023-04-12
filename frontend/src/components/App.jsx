import React, { useState } from "react";
import MusicTable from "./MusicTable/MusicTable";
import SongForm from "./SongForm/SongForm";
import SearchBar from "./SearchBar/searchBar";
import "./App.css";
import axios from "axios";

const App = (props) => {
  const [songs, setSongs] = useState([]);
  const [toggle, setToggle] = useState();
  const [time, setTime] = useState();


  const filterSongs = (e) => {
    let filterValue = e.target.value;
    if (filterValue === "") {
      getAllSongs();
    } else {
     let filteredSongs = songs.filter(
        (x) =>
          x.title.toLowerCase().includes(filterValue.toLowerCase()) ||
          x.artist.toLowerCase().includes(filterValue.toLowerCase()) ||
          x.album.toLowerCase().includes(filterValue.toLowerCase()) ||
          x.genre.toLowerCase().includes(filterValue.toLowerCase())
      );
      setSongs(filteredSongs);
   }
  };


  const getAllSongs = async() =>{
    let response = await axios.get('http://127.0.0.1:5000/api/songs');
    setSongs(response.data.songs);
    setTime(response.data.total_running_time);
  }

  const getSongs = (songs) => {
    setSongs(songs);
  };
  const newSong = () => {
    setToggle(!toggle);
  };

  return (
    <div className="main">
      <h1> Music Library </h1>
      <SongForm getSongs={getSongs} newSong={newSong} />
      <p/>
      <SearchBar filterSongs={filterSongs} />
      <MusicTable toggle={toggle} songs={songs} getAllSongs={getAllSongs} filterSongs={filterSongs} time={time}/>
    </div>
  );
};
export default App;
