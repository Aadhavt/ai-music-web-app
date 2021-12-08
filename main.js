song1 = "";
song2 = "";
song1status = "";
song2status = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;
leftwristX = 0;
leftwristY = 0;
rightwristY = 0;
rightwristX = 0;
function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();
    fill(255,0,0);
    stroke(255,0,0);
    if(scoreLeftWrist > 0.2){
        circle(leftwristX,leftwristY, 20);
        song1.stop();
        if(song2status == false){
            song2.play();
            document.getElementById("songplaying").innerHTML = "Playing : Peter Pan theme song";
        }
    }
    if(scoreRightWrist > 0.2){
        circle(rightwristX, rightwristY, 20);
        song2.stop();
        if(song1status == false){
            song1.play();
            document.getElementById("songplaying").innerHTML = "Playing : Harry Potter Theme Song Remix "
        }
    }
   
}
function playSong() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stopSong() {
    song.stop();
}
function modelLoaded() {
    console.log("modelLoaded")
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + leftwristX + ", left wrist y = " + leftwristY);
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + rightwristX + ", right wrist y = " + rightwristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

    }
}

