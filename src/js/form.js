const form = document.getElementById('contactForm');
const formInputs = $('#contactForm :input');
const endpoint = 'http://stavroskortesas.com'
const mailService = '/api/mail';
let formFieldsDisabled = false;

$(form).submit(onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();

    if (!isFormValid(this)) return;

    toggleFormFields(form);

    initToastrOptions();

    const values = {};

    formInputs.each(function () {
        if (!this.name) return true;
        values[this.name] = $(this).val();
    });

    //Adding recaptcha response here
    values['g-recaptcha-response'] = recaptcha.response;

    $.ajax({
        type: "POST",
        url: endpoint + mailService,
        data: JSON.stringify(values),
        success: onSuccess,
        error: onError,
        contentType: 'application/json',
    });

}

function isFormValid(form) {
    const isValid = $(form).valid() && recaptcha.checked;
    if (recaptcha.checked) return isValid;
    $('.g-recaptcha iframe').addClass('error');
    return isValid;
};

function onSuccess(response) {
    clearForm();
    toastr.success(`Stavros will reply as soon as possible.`, `Congrats! You're message is on its way.`);

    function clearForm() {
        grecaptcha.reset();
        $(form)[0].reset();
    };
    toggleFormFields(form);

};

function onError(response) {
    toastr.warning(`Please try again later.`, `Whoops. Something happened and your message could not be delivered.`);
    toggleFormFields(form);
};


function initToastrOptions() {
    toastr.options = {
        positionClass: "toast-top-left"
    };
}

function toggleFormFields(form) {
    if (formFieldsDisabled) {
        $(form).find('input, textarea, button').attr('disabled', false);
        formFieldsDisabled = false;
        return;
    };

    $(form).find('input, textarea, button').attr('disabled', true);
    formFieldsDisabled = true;


}
