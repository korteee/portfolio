function initializeScroll() {
    pageNames.forEach(key => {
        pages[key] = document.getElementById(key);
    });

    const wrapper = document.getElementById('wrapper');
    scroll = new IScroll(wrapper, {
        snap: true,
        mouseWheel: true,
        snapSpeed: scrollSpeed
    });

    /**Scroller Click */
    $('#scroller').on('click', () => {
        scroll.scrollToElement(pages.about, 150, null, null, IScroll.utils.ease.quadratic)
    })


    /**Update Active Menu Items On Scroll End*/
    let yOffset = 0;
    let activeIndex = 0;
    const wHeight = $(window).height();
    parts = Array.from(pageNames, (val, idx) => {
        return wHeight * (-idx);
    })
    scroll.on('scrollEnd', () => {

        console.log(scroll.currentPage)

        let scrolledDown = (scroll.y < yOffset) || (scroll.y === yOffset && scroll.y < 0);
        yOffset = scroll.y;
        scrolledOverFirstSlide = (activeIndex === 0 && !scrolledDown)

        //Prevent default if scroll exceed active index
        if ((activeIndex === 0 && !scrolledDown) || (activeIndex === pageNames.length - 1 && scrolledDown))
            return;

        activeIndex = parts.indexOf(yOffset);
        $('.menu__item-active').toggleClass('menu__item-active');
        $(`#${pageNames[activeIndex]}-button`).addClass('menu__item-active');
        setTimeout(() => {
            $('.menu').removeClass('menu-open');
        }, 200)


    })

    /**Refresh scroll on orientation change */
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            scroll.refresh();
        }, 0)
    })
}