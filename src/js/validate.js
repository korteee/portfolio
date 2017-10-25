$(document).ready(function () {
    overrideEmailValidator();
    setupFormValidator();
});

function validateRecaptcha(response) {
    if(!response) return;
    recaptcha.response = response;
    recaptcha.checked = true;
    $('.g-recaptcha iframe').removeClass('error');
};


function setupFormValidator() {
    const form = document.getElementById('contactForm');

    $(form).validate({
        errorPlacement: function (error, element) {
            return true;
        }
    });
};

function overrideEmailValidator() {
    const emailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")

    $.validator.methods.email = function (value, element) {
        return this.optional(element) || emailRegex.test(value);
    };
}