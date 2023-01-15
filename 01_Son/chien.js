let video;
let poseNet;

let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let distance = 0;

let chien = new Audio();

function preload(){
	chien.src = './son/chien.mp3';
	chien.volume = 1;
}

function setup(){
	createCanvas (600, 500);
	video = createCapture(VIDEO);
	video.hide();
	poseNet = ml5.poseNet(video, modelReady);
	poseNet.on("pose", gotPoses);
}

function PlaySound() {
  chien.play

}

function gotPoses(poses) {
	if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
  }
}

function modelReady() {
	console.log('model ready');
}

function draw() {
	background(220);
	image(video,0,0,600,500);
	fill(255,0,0);
	ellipse(noseX,noseY,40);
	if(noseX < 200){
		if(!chien.play()){
			chien.play()
		}
	}
}