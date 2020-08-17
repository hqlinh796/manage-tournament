$.get('/positions', function (data, status) {
    console.log(data);
    for (i in data){
        const posList = $('[name = positionCode]');
        const len = posList.length;
        for (j= 0; j <  len; j++){
            console.log(len);
            const option = document.createElement('option');
            option.value = data[i].code;
            option.innerText = data[i].name;
            posList[j].appendChild(option);
        }
    }
});