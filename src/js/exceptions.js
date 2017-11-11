function checkBrowserSupport() {

    if (isOnFacebook()) {
        replaceVideo();
    }

};

function replaceVideo() {
    const homeSlide = document.getElementById('home');
    const video = $(homeSlide).children('video');

    $(homeSlide).addClass('slide-home-no-video-support');
    video.remove();
}