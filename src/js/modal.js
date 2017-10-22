function onModalClose(event) {
    $('.my-modal-open').removeClass('my-modal-open');
    projectsSlider.disable();
    scroll.enable();
}

$(document).ready(() => {

    $('.masonry__item').on('click touchstart', function () {


        const isSliderInitialized = Object.keys(projectsSlider).length;

        !isSliderInitialized ? initSlider() : projectsSlider.enable();

        const projectIndex = $('.masonry__item').index(this);

        projectsSlider.goToPage(projectIndex, 0, 0);
        $('#projects-modal').addClass('my-modal-open')

        $('.my-modal-open').on('click', onModalClose)

        $('#projects-modal-close').on('click', onModalClose)

        $('.my-modal__content').on('click', function (e) {
            e.stopPropagation();
        })

    })

})