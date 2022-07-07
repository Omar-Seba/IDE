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
function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const Player = ({ font, urls, malagasy }) => {

    const btnsecondarycustom = "btn-secondary-custom " + font
    let [playing, toggle] = useAudio(urls.list[randomNumberInRange(0, 2)]);
/*
    if (!playing && urls.index !== 0) {
        [playing, toggle] = useAudio(urls.list[urls.index])
    }*/
    if (malagasy) {
        return (
            <button className={btnsecondarycustom} onClick={toggle}>{playing ? "Fiatoana" : "Milalao"}</button>
        );
    }
    else {
        return (
            <button className={btnsecondarycustom} onClick={toggle}>{playing ? "Pause" : "Play"}</button>
        );
    }
};

export default Player;