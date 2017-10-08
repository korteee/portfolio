const form = document.getElementById('contactForm');

$(form).submit(function (event) {

    const formInputs = $('#contactForm :input');
    const values = {};

    formInputs.each(function () {
        if(!this.name) return true;
        values[this.name] = $(this).val();
    });

    event.preventDefault();

    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/mail',
        data: JSON.stringify(values),
        success: function(resp) {
            console.log(resp)
        },
        contentType: 'application/json',
    });

})