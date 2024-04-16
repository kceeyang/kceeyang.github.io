
document.getElementById("button1").addEventListener("click", playSound);

var sound = new Howl({src:['../audio/Attention.mp3']});

function playSound(){
    sound.play();
}


document.getElementById("button2").addEventListener("click", togglePlay());

function togglePlay()
{
    
    return sound.playing() ? sound.pause() : sound.play();
};



document.getElementById("button3").addEventListener("click", TogglePause());

var myMusicID = sound.play();   // The docs say play() returns an ID, and I'll be passing that to "seek" later.
var paused = false;
var saveSeek;
function TogglePause() {

    if (paused) {
        sound.play(myMusicID);
        sound.seek(saveSeek, myMusicID);
    } else {
        sound.pause();
        saveSeek = sound.seek(myMusicID);
    }
};

