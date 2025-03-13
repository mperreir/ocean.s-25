function Animation(time) {
    let body = document.querySelector("body");
    body.innerHTML = "";

    let video = document.createElement("video");
    video.innerHTML = "Your browser does not support the video";
    video.width = window.innerWidth;
    video.height = window.innerHeight;
    video.autoplay = true;
    let source = document.createElement("source");
    source.src = "./../../assets/animation.mp4";
    source.type = "video/mp4";

    video.addEventListener("ended", () => Compare_Page(time), false);

    video.appendChild(source);
    body.appendChild(video);
}
