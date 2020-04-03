const app =()=>{
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //sounds
    const sounds =document.querySelectorAll('.sound-picker button');
    //time display
    const timeDisplay = document.querySelector('.time-display');
    //time buttons
    const timeSelect = document.querySelectorAll('.time-select button');
    //get length of outline
    const outlinelength = outline.getTotalLength();
    //duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlinelength;
    outline.style.strokeDashoffset =outlinelength;

    sounds.forEach(sound =>{
        sound.addEventListener('click',function(){
            song.src=this.getAttribute("data-sound");
            video.src=this.getAttribute("data-video");
            checkPlaying(song);
        });
    });
    
    //playyyyyyyyyyyyyyyyyyyyy
    play.addEventListener('click', ()=>{
        console.log("hi");
        
        checkPlaying(song);
    });
    timeSelect.forEach(option =>{
        option.addEventListener('click',function(){
            fakeDuration=this.getAttribute('data-time');
            timeDisplay.textContent=`${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
        });
    });
    //fun
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src ='./svg/pause.svg';
        }else{
            song.pause();
            video.pause();
            play.src='./svg/play.svg'
        }
    };
//aniiiiiiiiiiiiiiiiiimateeeeeeeeeeeeeeeeeee
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let mins = Math.floor(elapsed / 60);

        //Animate the circle
        let progress = outlinelength - (currentTime/fakeDuration) * outlinelength;
        outline.style.strokeDashoffset=progress;
        //animate text
        console.log("time");
        
        timeDisplay.textContent=`${mins}:${seconds}`;

        if(currentTime>=fakeDuration){
            song.pause();
            song.currentTime=0;
            play.src='./svg/play.svg';
            video.pause();
        }
    };
};

app();