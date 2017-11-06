$(document).ready(() => {

    ['home', 'about', 'skills', 'projects', 'contact'].forEach(key => {
        menuButtons[key] = document.getElementById(`${key}-button`);
    })

    $("#wrapper").swipe({
        //Generic swipe handler for all directions
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {

            let directionCallbacks = {
                'up': () => {
                    if (!window.isMobile() || isOnFullScreen) return;
                    setFullScreen();
                },
                'down': () => {
                    if (scrollEndSubject.Observers.length) return;
                    let scrollEndObserver = new Observer(function () {
                        console.log("Menu is running")
                        if (!window.isMobile() || !scrolledOverFirstSlide) return;
                        disableFullScreen();
                        scrollEndSubject.removeObserver(this);
                    });
                    scrollEndSubject.addObserver(scrollEndObserver);
                },
                'left': () => {
                    $('.menu').addClass('menu-open')
                },
                'right': () => {
                    $('.menu').removeClass('menu-open')
                }
            }
            if (directionCallbacks[direction])
                directionCallbacks[direction]();

        },
        threshold: 20
    });


    /** Toggle Menu - Responsive Mode */
    $('.menu-toggle-button').on('click', () => {
        $('.menu').toggleClass('menu-open');
    })


    /**Slide to page on menu button click */
    Object.keys(menuButtons).forEach((key) => {
        /**Mobile Event */
        menuButtons[key].addEventListener('touchstart', () => {
            scrollToElement(key);
        })

        /**Desktop event */
        menuButtons[key].addEventListener('click', () => {
            scrollToElement(key);
        })
    })






})