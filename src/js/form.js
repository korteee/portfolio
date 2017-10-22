const form = document.getElementById('contactForm');
const endpoint = 'http://localhost:3000'
const mailService = '/api/mail';

$(form).submit(function (event) {

    const formInputs = $('#contactForm :input');
    const values = {};

    formInputs.each(function () {
        if (!this.name) return true;
        values[this.name] = $(this).val();
    });

    event.preventDefault();

    $.ajax({
        type: "POST",
        url: endpoint + mailService,
        data: JSON.stringify(values),
        success: function (resp) {},
        contentType: 'application/json',
    });

})