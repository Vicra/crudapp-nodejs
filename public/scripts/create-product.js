function validate() {
    const delay = 6000;//6seconds

    let params = {};
    params.name = $('#name').val();
    params.description = $('#description').val();
    params.category = $('#category').val();
    params.price = $('#price').val();
    params.url = $('#url').val();

    let hasError = false;
    if (!params.name) {
        hasError = true;
        $('#enterName').fadeIn().delay(delay).fadeOut();
    }
    if (!params.price) {
        hasError = true;
        $('#enterPrice').fadeIn().delay(delay).fadeOut();
    }
    if (!params.category) {
        hasError = true;
        $('#enterCategory').fadeIn().delay(delay).fadeOut();
    }
    if (!params.url) {
        hasError = true;
        $('#enterUrl').fadeIn().delay(delay).fadeOut();
    }

    if (!hasError) {
        $("form[name='submitproduct']").submit();
    }
}