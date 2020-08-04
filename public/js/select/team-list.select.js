$.get('/teams/apis/all', function (data, status) {
    console.log(data);
    for (i in data){
        const option = document.createElement('option');
        option.value = data[i].id;
        option.innerText = data[i].name;
        $('#hostTeam')[0].appendChild(option);
    }
});