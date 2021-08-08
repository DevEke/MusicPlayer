import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './App.scss';
import { songs } from './songs';
import { IoPlay, IoMusicalNotes, IoPauseOutline, IoClose, IoPlaySkipForwardOutline, IoPlaySkipBackOutline } from 'react-icons/io5';



export default function App() {
  const [playlist, setPlaylist] = useState(undefined);
  const [nowPlaying, setNowPlaying] = useState(undefined);
  const [musicModal, setMusicModal] = useState(false);
  const [playing, setPlaying] =useState(false);

  const playSong = () => {
    setPlaying(true)
  }

  const nextSong = (song) => {
    let index = playlist.indexOf(song);
    console.log('next clicked');
    if (index < playlist.length - 1) {
      setNowPlaying(playlist[index + 1]);
    }
  }

  const prevSong = (song) => {
    let index = playlist.indexOf(song);
    console.log('index: ' + index)
    console.log('playlist length: ' + (playlist.length - 1));
    if (index > 0) {
      setNowPlaying(playlist[index - 1]);
    }
  }


  const setCurrentSong = (song) => {
    setNowPlaying(song);
    playSong();
  }

  useEffect(() => {
    setPlaylist(songs);
  }, [])
  

  const pauseSong = () => {
    setPlaying(false)
  }

    return (
      <div className="app-container">
        <div className="song-list">
          <div className="playlist-head">
            <IoMusicalNotes className="icon"/>
            {/* <div className="custom-icon">
              <IoAddCircle className="icon"/>
              <p>Add Music</p>
            </div> */}
          </div>
          <div className="songs-list-songs">
          {playlist?.map((song, index)=> {
            return (
              <div
                className="song-list-item"
                key={index}
                onClick={() => setCurrentSong(song)}>
                  <div className="img-info">
                <img className="song-img" alt="album" src={song?.songImg}></img>
                <div>
                  <h3>{song?.title}</h3>
                  <p>{song?.artist} ft.{song?.features.map(x=>` ${x} `)} </p>
                </div>
                </div>
                <IoPlay className="icon"/>
              </div>
            )
          })}
          </div>
        </div>
        <div className="current-song-screen">
          <div
            className={`active-song ${musicModal ? 'open' : 'closed'}`}>
                  {musicModal ?  
                  <button
                    className={`tab-btn ${musicModal ? 'screen-on' : 'screen-off'}`}
                    onClick={() => setMusicModal(false)}
                    >
                    {/* <p>Collapse</p> */}
                    <IoClose className="icon"/>
                  </button> :
                 null }


                  <ReactPlayer
                    style={{position: 'absolute'}}
                    url={nowPlaying?.file}
                    playing={playing}
                    width={0}
                    height={0}
                  />


            { nowPlaying === undefined ?
            null : 
            <div
            onClick={musicModal ? null : () => setMusicModal(true)} 
            className={`song-info ${musicModal ? 'column': 'row'}`}>
              <img alt="album" className={`song-img md ${musicModal ? 'lrg' : 'sml'}`} src={nowPlaying?.songImg}/>
              <div className={musicModal ? 'centered ' : null}>
                <p className="title">{nowPlaying?.title}</p>
                <p>{nowPlaying?.artist} ft. {nowPlaying?.features.map(x=>`${x} `)}</p>
              </div>
            </div>}


            <div className="button-flex">
            {/* {
              nowPlaying === undefined ?
              null :
              musicModal ? 
              <button onClick={this.toggleMute} className="btn">
                {this.state.muted ?
                <IoVolumeMute className="icon"/>  : 
                <IoVolumeHigh className="icon" /> }
              </button> :
              null
            } */}
            {
              nowPlaying === undefined ?
              null :
              musicModal ? 
              <button
                disabled={playlist.indexOf(nowPlaying) === 0}
                onClick={() => prevSong(nowPlaying)} 
                className="btn">
                <IoPlaySkipBackOutline className={`icon ${playlist.indexOf(nowPlaying) === 0 ? 'off' : 'on'}`} />
              </button> :
              null
            }
            { nowPlaying === undefined ?
              null :
              playing ? 
              <button className="btn" onClick={pauseSong}>
                <IoPauseOutline className="icon"/>
              </button> :
              <button className="btn" onClick={playSong}>
                <IoPlay className="icon"/>
              </button>
            }
            {
              nowPlaying === undefined ?
              null :
              musicModal ? 
              <button
                  disabled={playlist.indexOf(nowPlaying) === playlist.length - 1}
                  onClick={() => nextSong(nowPlaying)} 
                  className="btn">
                <IoPlaySkipForwardOutline className={`icon ${playlist.indexOf(nowPlaying) === playlist.length - 1 ? 'off' : 'on'}`}/>
              </button> :
              null
            }
            {/* {
              nowPlaying === undefined ?
              null :
              musicModal ? 
              <button onClick={this.toggleLoop} className="btn">
                <IoRepeat className={`icon ${this.state.repeat ? 'on' : 'off'}`}/>
              </button> :
              null
            } */}
            </div>
          
          </div>
        </div>
      </div>
    )
  }