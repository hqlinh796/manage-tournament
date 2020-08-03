window.onload = function () {
    const urlBase = window.location.origin.toString();
    const list = [];
    $('#stadiumTable').find('tbody tr').click(function () {
        const id = $('#stadiumTable').find('tbody tr')[$(this).index()].attributes.value.value;
        // window.location.href = "/stadium/"+id;

        const parent = $('#' + id).find('#pictures-area')[0];

        const url = urlBase + "/pictures/" + id;

        let hasLoad = false;
        for (i in list) {
            if (list[i] === id) {
                hasLoad = true;
                break;
            }
        }

        if (!hasLoad) {
            $.get(url.toString(), function (data, status) {
                console.log(data);
                for (i in data){
                    const div = document.createElement('div');
                    div.innerHTML = `
                    <img height="400" width="400" src="`+data[i].picture +`" class="m-3">
                    `
                    console.log(div);
                    parent.appendChild(div);
                }
            });
            list.push(id);
        }
        $('#' + id).modal('show');
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
        $('#addStadium').action = '/picture';
    });
}