/*	
	**************
	** Elements **
	**************
*/
const webcamArea = document.getElementById("webcamArea");
const canvasArea = document.getElementById("canvasArea");
const canvasDownload = document.getElementById("canvasDownload");

const turnOnCameraButton = document.getElementById("turnOnCameraButton");
const turnOffCameraButton = document.getElementById("turnOffCameraButton");
const snapPhotoButton = document.getElementById("snapPhotoButton");
const copyPictureButton = document.getElementById("copyPictureButton");
const downloadPictureButton = document.getElementById("downloadPictureButton");



/*
	***************
	** Variables **
	***************
*/
let webcam;
let isPictureSnapped = false;

/*
	*********************
	** Event Listeners **
	*********************
*/
turnOnCameraButton.addEventListener("click", () => {
	canvasDownload.download = "";
	canvasDownload.href = "";

	isPictureSnapped = false;

	canvasDownload.style.display = "none";
	canvasArea.style.display = "none";	
	webcamArea.style.display = "block";

	if (!webcam) { webcam = new Webcam(webcamArea, "user", canvasArea); }
	webcam.flip();
	webcam.start();
});

turnOffCameraButton.addEventListener("click", () => {
	if (webcam && webcamArea.style.display === "block") { 
		webcam.stop(); 
		webcamArea.style.display = "none";
	}
	else {
		VanillaToasts.create({
      		title: "Turn Off Warning",
      		text: "You cannot turn off the camera before initializing it!",
      		type: "warning", // warning, error, info, success
      		icon: "./assets/logo.avif",
      		timeout: 3500
    	});
	}
});

snapPhotoButton.addEventListener("click", () => {
	webcam.snap();
	webcam.stop();

	isPictureSnapped = true;

	webcamArea.style.display = "none";
	canvasDownload.style.display = "block";
	canvasArea.style.display = "block";
});

copyPictureButton.addEventListener("click", async () => {
	if (isPictureSnapped) {
		canvasArea.toBlob(function(blob) { 
	    	const item = new ClipboardItem({ "image/png": blob });
	    	navigator.clipboard.write([item]); 
		});
	}
	else {
		VanillaToasts.create({
      		title: "Copy Warning",
      		text: "You cannot copy a picture before snapping it!",
      		type: "warning", // warning, error, info, success
      		icon: "./assets/logo.avif",
      		timeout: 3500
    	});
	}
});

downloadPictureButton.addEventListener("click", () => {
	if (isPictureSnapped) {
		const base64Picture = canvasArea.toDataURL();
		canvasDownload.download = "your_snap.png";
		canvasDownload.href = base64Picture;
		canvasDownload.click();
	}
	else {
		VanillaToasts.create({
      		title: "Download Warning",
      		text: "You cannot download a picture before snapping it!",
      		type: "warning", // warning, error, info, success
      		icon: "./assets/logo.avif",
      		timeout: 3500
    	});
	}
});