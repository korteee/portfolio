function onModalClose(event) {
    $('.my-modal-open').removeClass('my-modal-open');
    projectsSlider.disable();
    scroll.enable();
}

$(document).ready(() => {

    $('.masonry__item').on('click touchstart', function () {

        $('#projects-modal').addClass('my-modal-open');

        !Object.keys(projectsSlider).length ? initSlider() : projectsSlider.enable();

        $('.my-modal-open').on('click', onModalClose)

        $('#projects-modal-close').on('click', onModalClose)

        $('.my-modal__content').on('click', function (e) {
            e.stopPropagation();
        })

    })

})