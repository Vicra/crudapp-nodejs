function validate() {
    const delay = 6000;//6seconds

    let params = {};
    params.user = $('#user').val();
    params.password = $('#password').val();

    let hasError = false;
    if (!params.user) {
        hasError = true;
        $('#enterUser').fadeIn().delay(delay).fadeOut();
    }
    if (!params.password) {
        hasError = true;
        $('#enterPassword').fadeIn().delay(delay).fadeOut();
    }

    if (!hasError) {
        $("form[name='login']").submit();
    }
}

$('body').keypress(function(e){
    if (e.keyCode == 13)
    {
        validate();
    }
});