(function initSlider() {

    const sliderWrapper = document.getElementById('scroll-slider-wrapper');

    projectsSlider = new IScroll(sliderWrapper, {
        snap: true,
        mouseWheel: true,
        snapSpeed: scrollSpeed,
        disableMouse: false,
        disableTouch: false,
        disablePointer: true,
        scrollX: true,
        scrollY: false
    });

    $('#next-project-button').on('click', function () {
        if (projectsSlider.currentPage.pageX + 1 > projectsSlider.pages.length - 1) return;

        const nextPage = projectsSlider.currentPage.pageX + 1;
        projectsSlider.goToPage(nextPage, 0, scrollSpeed);
    });

    $('#prev-project-button').on('click', function () {
        if (projectsSlider.currentPage.pageX - 1 < 0) return;

        const nextPage = projectsSlider.currentPage.pageX - 1;
        projectsSlider.goToPage(nextPage, 0, scrollSpeed);
    })

})();