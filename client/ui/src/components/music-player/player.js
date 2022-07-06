import React, { useState, useEffect } from "react";

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
            playing ? audio.play() : audio.pause();
        },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};

function changeSongs(urls) {
    urls.index++;
    if (urls.index === urls.list.length)
        urls.index = 0;
}


const Player = ({ urls }) => {
    let [playing, toggle] = useAudio(urls.list[urls.index]);

    if (!playing && urls.index !== 0) {
        [playing, toggle] = useAudio(urls.list[urls.index])
    }
    return (
        <div>
            <button className="btn-secondary-custom" onClick={toggle}>{playing ? "Pause" : "Play"}</button>
            <button className="btn-secondary-custom" onClick={() => changeSongs(urls)}>Next</button>

        </div>
    );
};

export default Player;