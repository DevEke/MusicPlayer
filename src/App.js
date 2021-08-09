import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './App.scss';
import { songs } from '../../../DevEkeProjects/mezzo-app/mezzo-app/songs';
import { 
  IoPlay, 
  IoMusicalNotes, 
  IoPauseOutline, 
  IoClose, 
  IoPlaySkipForwardOutline, 
  IoPlaySkipBackOutline, 
  IoHeartOutline,
  IoEllipsisVertical
} from 'react-icons/io5';



function App() {
  const [playlist, setPlaylist] = useState(undefined);
  const [nowPlaying, setNowPlaying] = useState(undefined);
  const [musicModal, setMusicModal] = useState(false);
  const [playing, setPlaying] =useState(false);
  const [played, setPlayed] = useState(0);
  const [playedSecs, setPlayedSecs] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [options, setOptions] = useState(false);

  const playSong = () => {
    setPlaying(true)
  }

  const returnTime = (time) => {
    let totalTime = Math.round(time);
    let min = Math.floor((totalTime%3600)/60);
    let sec = totalTime - ( min * 60)
    if (min < 10) { min = "0"+ min}
    if (sec < 10) { sec = "0" + sec}
    return min + ":" + sec;
  }

  const nextSong = (song) => {
    let index = playlist.indexOf(song);
    if (index < playlist.length - 1) {
      setNowPlaying(playlist[index + 1]);
    }
  }

  const prevSwitcher = (song) => {
    if (playedSecs <= 10) {
      nextSong(song)
    } else {
      setPlayed(0);
    }
  }

  const skip30Forward = () => {
    if (played === duration || !playing ) {
      return
    } else {
      setPlayedSecs(playedSecs => playedSecs + 30);
    }
  }

  const skip30Back = () => {
    if (played === duration || !playing ) {
      return
    } else {
      setPlayedSecs(playedSecs => playedSecs - 30);
    }
  }

  const handleSeek = e => {
    setPlayed(parseFloat(e.target.value));
  }

  const handleDuration = (duration) => {
    setDuration(duration);
  }

  const handleProgress = state => {
    setLoaded(`${state.loaded * 100}%`);
    setPlayed(`${state.played * 100}%`);
    setPlayedSecs(state.playedSeconds);
  }

  const ref = player => {
    return player
  }

  const prevSong = (song) => {
    let index = playlist.indexOf(song);
    if (index > 0) {
      setNowPlaying(playlist[index - 1]);
    }
  }

  const toggleOptions = () => {
    setOptions(!options);
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
                    <IoClose className="icon"/>
                  </button> :
                 null }


                  <ReactPlayer
                    ref={ref}
                    onSeek={e=>console.log(e.target.value)}
                    onDuration={handleDuration}
                    onProgress={handleProgress}
                    onEnded={() => nextSong(nowPlaying)}
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
              <div className="image-container">
              <img 
                alt="album"
                onClick={musicModal ? () => toggleOptions(true) : null} 
                className={`song-img md ${musicModal ? 'lrg' : 'sml'} ${options ? 'round' : ''}`} 
                src={options ? nowPlaying?.artistImg : nowPlaying?.songImg}/>
                {musicModal ?
                  <IoHeartOutline className={`icon heart ${options ? 'priority' : ''}`}/> : 
                  null }
                {musicModal ? 
                <IoEllipsisVertical className={`icon options ${options ? 'priority' : ''}`}/> : 
                null}
              </div>
              <div className={musicModal ? 'centered ' : null}>
                <p className="title">{nowPlaying?.title}</p>
                <p>{nowPlaying?.artist} ft. {nowPlaying?.features.map(x=>`${x} `)}</p>
                {musicModal ? <p className="genre">{nowPlaying?.genre}</p> : null }
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
            {
                nowPlaying === undefined ?
                null :
                musicModal ?
                <div className="progress-container">
                <div className="music-progress-bar">
                <div className="duration bar"/>
                <div style={{width: loaded}} className="loaded bar"/>
                <div style={{width: played}} className="played bar">
                  <div
                    draggable="true"
                    className="seek-node"
                    onDrag={(e) => handleSeek(e)}
                    // onDragStart={}
                    // onDragEnd={}
                    />
                </div>
                </div>
                <div className="timers">
                  <p className="played-sec">{returnTime(playedSecs)}</p>
                  <p className="duration-sec">{returnTime(duration)}</p>
                </div>
                </div> : null
              }
          </div>
        </div>
      </div>
    )
  }

  export default App;