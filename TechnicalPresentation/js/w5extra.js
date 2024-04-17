


//import {Howl, Howler} from 'howler';
//const {Howl, Howler} = require('howler');

//document.getElementById("button1").addEventListener("click", playMusic);

var sound = new Howl({
    src:['../audio/Attention.mp3'],

});

function playMusic()
{
    sound.play()
}

//document.getElementById("howler-play").addEventListener("click", sound.play());
//document.getElementById("howler-pause").addEventListener("click", sound.pause());
//document.getElementById("howler-stop").addEventListener("click", sound.stop());
//document.getElementById("howler-volup").addEventListener("click", volumeUp);


// $(function(){

// 	var howler_example = new Howl({
// 		src: ['../audio/Cruel_Summer.mp3'],
// 		volume: 0.5,
//         onend: function() {
//             $("#howler-play").removeClass("btn-success");
//         },
//         onplay: function() {
//             $("#howler-play").addClass("btn-success");
//         }
// 	});

// 	$("#howler-play").on("click", function(){
// 		howler_example.play();
// 	});

// 	$("#howler-pause").on("click", function(){
// 		howler_example.pause();
// 	});

// 	$("#howler-stop").on("click", function(){
// 		howler_example.stop();
// 	});

// 	$("#howler-volup").on("click", function(){
// 		var vol = howler_example.volume();
// 		vol += 0.1;
// 		if (vol > 1) {
// 			vol = 1;
// 		}
// 		howler_example.volume(vol);
// 	});

// 	$("#howler-voldown").on("click", function(){
// 		var vol = howler_example.volume();
// 		vol -= 0.1;
// 		if (vol < 0) {
// 			vol = 0;
// 		}
// 		howler_example.volume(vol);
// 	});

// });



// function volumeUp(){
//     var vol = sound.volume();
//     vol += 0.1;
//     if (vol > 1) 
//     {
//         vol = 1;
//     }
//     sound.volume(vol);
// }


if (sound.playing())
{
    document.getElementById("button2").addEventListener("click", pauseMusic());
    console.log('pause!');
}
else{
    document.getElementById("button2").addEventListener("click", playMusic());
    console.log('play!');
}
//document.getElementById("button2").addEventListener("click", playMusic());
//document.getElementById("button2").addEventListener("click", pauseMusic());

function pauseMusic(){
    //if (sound.playing())
    //{
        console.log('pause!');
        sound.pause()
        //sound.play()
   // }
}


// document.getElementById("button2").addEventListener("click", togglePlay());

// function togglePlay()
// {
//     return sound.playing() ? sound.pause() : sound.play();
// };



////////////////////////////








 /**
 * Player class containing the state of our playlist and where we are in it.
 * Includes all methods for playing, skipping, updating the display, etc.
 * @param {Array} playlist Array of objects with playlist song details ({title, file, howl}).
 */

var Player = function(playlist) {
  this.playlist = playlist;
  this.index = 0;

  // Display the title of the first track.
  track.innerHTML = '1. ' + playlist[0].title;

  // Setup the playlist display.
  playlist.forEach(function(song) {
    var div = document.createElement('div');
    div.className = 'list-song';
    div.innerHTML = song.title;
    div.onclick = function() {
      player.skipTo(playlist.indexOf(song));
    };
    list.appendChild(div);
  });
};

Player.prototype = 
{
  /**
   * Play a song in the playlist.
   * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
   */
  play: function(index) {
    var self = this;
    var sound;

    index = typeof index === 'number' ? index : self.index;
    var data = self.playlist[index];

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) 
    {
      sound = data.howl;
    } else 
    {
      sound = data.howl = new Howl
      ({
        src: ['../audio/' + data.file + '.mp3'],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
          
        onplay: function() 
        {
          // Display the duration.
          duration.innerHTML = self.formatTime(Math.round(sound.duration()));

          // Start updating the progress of the track.
          requestAnimationFrame(self.step.bind(self));

          // Start the wave animation if we have already loaded
          bar.style.display = 'none';
          pauseBtn.style.display = 'none';  
        } 
    });    
    }

    // Begin playing the sound.
    sound.play();

    // Update the track display.
    track.innerHTML = (index + 1) + '. ' + data.title;

    // Show the pause button.
    if (sound.state() === 'loaded') {
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'block';
    } else {
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'block';
    }

    // Keep track of the index we are currently playing.
    self.index = index;
  },

  /**
   * Pause the currently playing track.
   */
  pause: function() {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Puase the sound.
    sound.pause();
 
    // Show the play button.
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
  },

  /**
   * Seek to a new position in the currently playing track.
   * @param  {Number} per Percentage through the song to skip.
   */
  seek: function(per) {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Convert the percent into a seek position.
    if (sound.playing()) {
      sound.seek(sound.duration() * per);
    }
  }

  
};


// Setup our new audio player class and pass it the playlist.
var player = new Player([
    {
      title: 'Cruel Summer - Taylor Swift',
      file: 'Cruel_Summer',
      howl: null
    }
  ]);


// Bind our player controls.

//playBtn.addEventListener('click', function()
document.getElementById("playBtn").addEventListener('click', function() {
  sound.play();
});
//pauseBtn.addEventListener('click', function() 
document.getElementById("pauseBtn").addEventListener('click', function() {
  sound.pause();
});




//////////////////////////////////
// document.getElementById("button2").addEventListener("click", TogglePause());

// var myMusicID = sound.play();   // The docs say play() returns an ID, and I'll be passing that to "seek" later.
// var paused = false;
// var saveSeek;
// function TogglePause() {

//     if (paused) {
//         sound.play(myMusicID);
//         sound.seek(saveSeek, myMusicID);
//     } else {
//         sound.pause();
//         saveSeek = sound.seek(myMusicID);
//     }
// };








////////////////////////////////////////////////////////////////////





// $(document).ready(function() {

// 	// THE BASICS
	
// 	var trumpet = new Howl({
// 	  src: ['../audio/Attention.mp3'],
// 	  onend: function() {
// 	  	$("#trumpet-play").removeClass("btn-success");
// 	  },
// 	  onplay: function() {
// 	  	$("#trumpet-play").addClass("btn-success");
// 	  }
// 	});


	

// 	$("#trumpet-play").click(function() {
// 		trumpet.play();
// 	});

// 	$("#trumpet-pause").click(function() {
// 		trumpet.pause();
// 	});

// 	$("#trumpet-stop").click(function() {
// 		trumpet.stop();
// 		$("#trumpet-play").removeClass("btn-success");
// 	});

// 	// ======


	

// });