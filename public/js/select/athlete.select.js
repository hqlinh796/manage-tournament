
$.get('/position', function (data, status) {
    console.log(data);
    for (i in data){
        const option = document.createElement('option');
        option.value = data[i].code;
        option.innerText = data[i].name;
        $('#positionCode')[0].appendChild(option);
    }
});