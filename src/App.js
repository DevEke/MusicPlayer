import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import './App.scss';
import { songs } from './songs';
import { IoPlay, IoMusicalNotes, IoPause, IoChevronUp, IoChevronDown, IoRepeat, IoPlayForward, IoPlayBack, IoShuffle, IoVolumeHigh, IoVolumeMute } from 'react-icons/io5'

export default class App extends Component {
  constructor() {
    super();
    
    this.state = {
      playlist: songs,
      musicIndex: 1,
      currentSongScreen: false,
      currentSong: undefined,
      playing: false,
      repeat: false,
      shuffle: false,
      muted: false
    }

    
  }
   
  playSong = () => {
    this.setState({
      playing: true
    })
  }

  goToNextSong = () => {
    // let idx = this.state.musicIndex;
    // this.setState({
    //   musicIndex: idx + 1
    // })
  }

  goToPrevSong = () => {
    // idx === 0 ?
    // this.setState({currentSong: songs[idx]}) 
    // : this.setState({ currentSong: songs[idx - 1] })
  }

  toggleLoop = () => {
    this.state.repeat ? 
    this.setState({repeat: false}) :
    this.setState({repeat: true})
  }

  setCurrentSong = (song) => {
    this.setState({
      currentSong: song
    });
    this.playSong();
  }

  toggleMute = () => {
    this.state.muted ? 
    this.setState({muted: false}) :
    this.setState({muted: true})
  }

  

  pauseSong = () => {
    this.setState({
      playing: false
    })
  }


  render() {
    const { currentSong, currentSongScreen } = this.state;
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
          {this.state.playlist.map(song=> {
            return (
              <div
                className="song-list-item"
                key={song.file}
                onClick={() => this.setCurrentSong(song)}>
                  <div className="img-info">
                <img className="song-img" alt="album" src={song.songImg}></img>
                <div>
                  <h3>{song.title}</h3>
                  <p>{song.artist} ft.{song?.features.map(x=>` ${x} `)} </p>
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
            className={`active-song ${currentSongScreen ? 'open' : 'closed'}`}>
                  {currentSongScreen ?  
                  <button
                    className={`tab-btn ${currentSongScreen ? 'screen-on' : 'screen-off'}`}
                    onClick={() => this.setState({currentSongScreen: false})}
                    >
                    <p>Collapse</p>
                    <IoChevronDown className="icon"/>
                  </button> :
                  <button 
                    className={`tab-btn ${currentSongScreen ? 'screen-on' : 'screen-off'}`}
                    onClick={() => this.setState({currentSongScreen: true})}>
                    <p>Expand</p>
                    <IoChevronUp className="icon"/>
                  </button> }
                  <ReactPlayer
                    style={{position: 'absolute'}}
                    // volume={0}
                    muted={this.state.muted}
                    url={currentSong?.file}
                    playing={this.state.playing}
                    loop={this.state.repeat}
                    width={0}
                    height={0}
                  />
            { currentSong === undefined ?
            null : 
            <div className={`song-info ${currentSongScreen ? 'column': 'row'}`}>
              <img alt="album" className={`song-img md ${currentSongScreen ? 'lrg' : 'sml'}`} src={currentSong?.songImg}/>
              <div className={currentSongScreen ? 'centered ' : null}>
                <p className="title">{currentSong?.title}</p>
                <p>{currentSong?.artist} ft. {currentSong?.features.map(x=>`${x} `)}</p>
              </div>
            </div>}
            <div className="button-flex">
            {
              currentSong === undefined ?
              null :
              currentSongScreen ? 
              <button onClick={this.toggleMute} className="btn">
                {this.state.muted ?
                <IoVolumeMute className="icon"/>  : 
                <IoVolumeHigh className="icon" /> }
              </button> :
              null
            }
            {
              currentSong === undefined ?
              null :
              currentSongScreen ? 
              <button onClick={this.goToPrevSong} className="btn">
                <IoPlayBack className="icon"/>
              </button> :
              null
            }
            { currentSong === undefined ?
              null :
              this.state.playing ? 
              <button className="btn" onClick={this.pauseSong}>
                <IoPause className="icon"/>
              </button> :
              <button className="btn" onClick={this.playSong}>
                <IoPlay className="icon"/>
              </button>
            }
            {
              currentSong === undefined ?
              null :
              currentSongScreen ? 
              <button onClick={this.goToNextSong} className="btn">
                <IoPlayForward className="icon"/>
              </button> :
              null
            }
            {
              currentSong === undefined ?
              null :
              currentSongScreen ? 
              <button onClick={this.toggleLoop} className="btn">
                <IoRepeat className={`icon ${this.state.repeat ? 'on' : 'off'}`}/>
              </button> :
              null
            }
            </div>
          
          </div>
        </div>
      </div>
    )
  }
}
