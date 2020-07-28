window.onload = function () {
    $('#team').find('tbody tr').click(function () {
        console.log($(this).index());
        const id = $('#team').find('tbody tr')[$(this).index()].attributes.value.value;
        console.log(id);
        window.location.href = "/team/"+id;
        // $('#'+ id).modal('show');
    });
}