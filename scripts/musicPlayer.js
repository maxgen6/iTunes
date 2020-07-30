import { addZero } from './supScript.js';

export const musicPlayerInit = () => {

    const audio = document.querySelector('.audio'),
        audioImg = document.querySelector('.audio-img'),
        audioHeader = document.querySelector('.audio-header'),
        audioPlayer = document.querySelector('.audio-player'),
        audioNavigation = document.querySelector('.audio-navigation'),
        audioBtnPlay = document.querySelector('.audio-button__play'),
        audioProgress = document.querySelector('.audio-progress'),
        audioProgressTiming = document.querySelector('.audio-progress__timing'),
        audioTimePassed = document.querySelector('.audio-time__passed'),
        audioTimeTotal = document.querySelector('.audio-time__total');
    
    const playlist = ['hello', 'flow', 'speed'];
    
    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];

        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if(isPlayed) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    };

    const prevTrack = () => {
        if(trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    };

    const nextTrack = () => {
        if(trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    };

    
    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        if(target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioBtnPlay.classList.toggle('fa-play');
            audioBtnPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.pause();
            } else {
                audioPlayer.play();
            }

            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if(target.classList.contains('audio-button__prev')) {
           prevTrack();
        }

        if(target.classList.contains('audio-button__next')) {
            nextTrack();
        }
    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration,
            currentTime = audioPlayer.currentTime,
            progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';

        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondPassed = Math.floor(currentTime % 60) || '0';

        const minutesTotal = Math.floor(duration / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;


    });

    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;        
        audioPlayer.currentTime = progress;
    
    });

}