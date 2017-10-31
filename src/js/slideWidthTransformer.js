function setSlidesWidth() {
    const totalSlides = $('.slider__slide').length;
    const slideWidthMobile = 80;
    const slideWidthDesktop = 50;
    const slider = $('.slider')[0];

    $(slider).css('width', `${totalSlides * slideWidthDesktop}vw`);
    
}