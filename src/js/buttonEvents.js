$(document).ready(() => {
    document.getElementById('viewProjectsButton').addEventListener('click', () => {
        scrollToElement('projects');
    })

    document.getElementById('letsTalkButton').addEventListener('click', () => {
        scrollToElement('contact');
    })
})