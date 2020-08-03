window.onload = function () {
    $('#athleteList').find('tbody tr').click(function () {
        console.log($(this).index());
        const id = $('#athleteList').find('tbody tr')[$(this).index()].attributes.value.value;
        console.log(id);
        const tr = $('#' + id);
        console.log(tr.find('#fullName'));
        $.get("/athletes/" + id, function (data, status) {
            $.get('/positions', function (dataPos, status) {
                for (i in dataPos) {
                    const option = document.createElement('option');
                    option.value = dataPos[i].code;
                    option.innerText = dataPos[i].name;
                    tr.find('#positionCode')[0].appendChild(option);
                }
                tr.find('#positionCode')[0].value = data.positionCode;
            });

            tr.find('#avatar')[0].value = data.avatar;
            tr.find('#fullName')[0].value = data.fullName;
            tr.find('#height')[0].value = data.height;
            tr.find('#weight')[0].value = data.weight;
            tr.find('#birthday')[0].value = data.birthday;
            tr.find('#nationality')[0].value = data.nationality;
            tr.find('#salary')[0].value = data.salary;
            tr.find('#dominantFoot')[0].value = data.dominantFoot;
            tr.find('#img-avatar')[0].src = data.avatar;
        });
        $('#' + id).modal('show');
    });
}