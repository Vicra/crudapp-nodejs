function applyPlaceholder(id) {
    $(`#image${id}`).attr("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png");
}

$(document).ready(function () {
    $('#productsTable').DataTable();
});