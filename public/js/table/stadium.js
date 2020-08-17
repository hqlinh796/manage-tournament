
function setAction(path) {
    $('#fm-stadium')[0].action = path;
};





window.onload = function () {
    $('#btn-add-stadium').click(function () {
        setAction("/stadiums");
    });

    $.get('/teams/apis/all', function (teams, status) {
        console.log(teams);
        for (i in teams){
            const option = document.createElement('option');
            option.value = teams[i].id;
            option.innerText = teams[i].name;
            $('#modal-update-stadium #fm-stadium').find('#hostTeam')[0].appendChild(option);
        }
    });

    const urlBase = window.location.origin.toString();
    const list = [];
    $('#stadiumTable').find('tbody>tr').click(function (data) {
        const target = $('#stadiumTable').find('tbody tr')[$(this).index()];
        const id = target.attributes.value.value;
        // window.location.href = "/stadium/"+id;

        if (data.target.tagName != "I") {
            // const parent = $('#' + id).find('#pictures-area')[0];

            // const url = urlBase + "/pictures/" + id;

            // let hasLoad = false;
            // for (i in list) {
            //     if (list[i] === id) {
            //         hasLoad = true;
            //         break;
            //     }
            // }

            // if (!hasLoad) {
            //     $.get(url.toString(), function (data, status) {
            //         console.log(data);
            //         for (i in data) {
            //             const div = document.createElement('div');
            //             div.innerHTML = `
            //             <img height="400" width="400" src="`+ data[i].picture + `" class="m-3">
            //             `
            //             console.log(div);
            //             parent.appendChild(div);
            //         }
            //     });
            //     list.push(id);
            // }
            // $('#' + id).modal('show');
        } else {
            const url = "/stadiums/" + id;
            const pictureUrl = "/pictures/" + id;
            $('#modal-update-stadium #fm-stadium')[0].action = url;
            console.log(url);

            $.get(url.toString(), function (data, status) {
                console.log(data);
                //get team list
                

                $('#modal-update-stadium #fm-stadium').find('#name')[0].value = data.name;
                $('#modal-update-stadium #fm-stadium').find("#address")[0].value = data.address;
                $('#modal-update-stadium #fm-stadium').find("#hostTeam")[0].value = data.hostTeam;

                $.get(pictureUrl.toString(), function (data, status){
                    console.log(data);
                    for (i =0; i< data.length; i++){
                        $('#modal-update-stadium #fm-stadium').find("[name = 'pictures']")[i].value = data[i].picture;
                    }
                });
                

            });
        }
    });

    $('#btnAdd').click(function () {
        console.log('ok');
        div = document.createElement('div');
        div.innerHTML = `
        <div class="col-sm-6 mb-3 mb-sm-0 mt-3">
            <input type="text" class="form-control form-control-user" name="pictures" placeholder="Picture">
        </div>
        `
        $('#pictures')[0].appendChild(div);
        $('#addStadium').action = '/pictures';
    });
}