const musicContainer =document.querySelector('.music-container');
const playbtn =document.querySelector('#play');
const prevbtn =document.querySelector('#prev');
const nextbtn =document.querySelector('#next');
const audio =document.querySelector('#audio');
const progress =document.querySelector('.progress');/*progress-bar for music*/
const progressContainer =document.querySelector('.progress-container');
const title =document.querySelector('#title');
const cover =document.querySelector('#cover');

const songs=['Believer','Ring-Ring' ,'Titanic'];

let songindex=0;

loadSong(songs[songindex])


function loadSong(song)
{
    console.log(song);
    title.innerText=song;
    audio.src=`music/${song}.mp3`
    cover.src=`images/${song}.jpg`
}
function playsong(){
    musicContainer.classList.add('play');
    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play()
}

function pausesong(){
    musicContainer.classList.remove('play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');
    playbtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause()
}

function prevSong(){
    songindex--;
    if(songindex<0)
    {
        songindex=songs.length-1;
    }
    loadSong(songs[songindex])
    playsong();
}

function nextSong(){
    songindex++;
    if(songindex===songs.length)
    {
        songindex=0;
    }
    loadSong(songs[songindex])
    playsong();
}

function updateProgress(event){
    const { duration, currentTime } = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
playbtn.addEventListener('click',()=>{
    const isplaying=musicContainer.classList.contains('play');/*class of cplay exist or not*/

    if(isplaying)
    {
        pausesong();
    }
    else{
        playsong();
    }
})

prevbtn.addEventListener('click',prevSong);
nextbtn.addEventListener('click',nextSong);

audio.addEventListener('timeupdate',updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended',nextSong);