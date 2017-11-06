const menuButtons = {};
let isOnFullScreen = false;
const pageNames = ['home', 'about', 'skills', 'projects', 'contact'];
const pages = {};
let parts = [];
let scroll = {};
let projectsSlider = {};
let scrolledOverFirstSlide = false;
let scrollEndSubject = new Subject();
const scrollSpeed = 500;
const recaptcha = {
    response: null,
    checked: false
};



function scrollToElement(elementName) {
    scroll.scrollToElement(pages[elementName], scrollSpeed, null, null, IScroll.utils.ease.quadratic);
    scroll.currentPage.pageY = pageNames.indexOf(elementName);
    scroll.currentPage.y = parts[pageNames.indexOf(elementName)];
}


$(document).ready(function(){
    initializeScroll();
});