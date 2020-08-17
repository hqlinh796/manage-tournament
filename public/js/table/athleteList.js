function setAction(action) {
    $('#modal-update-athlete').find('#fm-add-athlete')[0].action = action;
}
window.onload = function () {
    // console.log("linked");
    $('#athleteList').find('tbody tr').click(function (data) {
        const id = $('#athleteList').find('tbody tr')[$(this).index()].attributes.value.value;
        console.log(id);
        const tr = $('#modal-update-athlete');
        if (data.target.tagName != "I") {
            console.log(tr.find('#fullName'));
            $.get("/athletes/apis/" + id, function (data, status) {
                // $.get('/positions', function (dataPos, status) {
                //     for (i in dataPos) {
                //         const option = document.createElement('option');
                //         option.value = dataPos[i].code;
                //         option.innerText = dataPos[i].name;
                //         tr.find('#positionCode')[0].appendChild(option);
                //     }
                //     tr.find('#positionCode')[0].value = data.positionCode;
                // });
                tr.find('#positionCode')[0].value = data.positionCode;
                tr.find('#avatar')[0].value = data.avatar;
                tr.find('#fullName')[0].value = data.fullName;
                tr.find('#height')[0].value = data.height;
                tr.find('#weight')[0].value = data.weight;
                tr.find('#birthday')[0].value = data.birthday;
                tr.find('#nationality')[0].value = data.nationality;
                tr.find('#salary')[0].value = data.salary;
                tr.find('#dominantFoot')[0].value = data.dominantFoot;
                tr.find('#avatar-athlete')[0].src = data.avatar;
            });
            $('#' + id).modal('show');
        } else {
            const path = "../" + id;
            const trash = $('[value="' + id + '"]').find('.fa-trash-o')[0];
            //console.log(trash);
            if (data.target === trash) {

                const cfm = confirm('Bạn có muốn xoá đội bóng này?');
                if(cfm){
                    $.ajax({
                        url: path,
                        type: 'DELETE',
                        success: function (result) {
                            $('[value="' + id + '"]').remove();
                        }
                    });
                }
            } else {
                setAction(path);
                $.get("/athletes/apis/" + id, function (data, status) {
                    tr.find('#positionCode')[0].value = data.positionCode;
                    tr.find('#avatar')[0].value = data.avatar;
                    tr.find('#fullName')[0].value = data.fullName;
                    tr.find('#height')[0].value = data.height;
                    tr.find('#weight')[0].value = data.weight;
                    tr.find('#birthday')[0].value = data.birthday;
                    tr.find('#nationality')[0].value = data.nationality;
                    tr.find('#salary')[0].value = data.salary;
                    tr.find('#dominantFoot')[0].value = data.dominantFoot;
                    tr.find('#avatar-athlete')[0].src = data.avatar;
                });
            }
        }

    });
}