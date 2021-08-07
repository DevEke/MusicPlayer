// import { useState, useEffect } from "react";


// export default function Song() {
//     const [loop, setLoop] = useState(false);
//     const song = new Audio('./assets/song.mp3');

//     const play = () => {
//         song.play();
//     }
//     const pause = () => {
//         song.pause();
//     }
//     const stop = () => {
//         song.pause();
//         song.currentTime = 0;
//     }

//     useEffect(() => {
//         song.load();
//         song.loop = loop;
//     }, [loop])

//     return (
//         <div>
//             <button onClick={play}>Play</button>
//             <button onClick={pause}>Stop</button>
//             <button onClick={stop}>Pause</button>
//             <label>
                
//                 <input type="checkbox" checked={loop} onChange={e => setLoop(e.target.checked)}/>
//                 Loop?
//             </label>
//         </div>
//     )
// }

