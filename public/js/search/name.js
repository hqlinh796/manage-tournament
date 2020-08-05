$('#search').on('input',function(){
    const text = $('#search').val();
    if(text != ""){
        const abc = $('#data-table').find('tr').hide();
        $('#data-table').find('tr:contains("'+text+'")').show();
        $('#data-table').find('tr:contains("'+text.toUpperCase()+'")').show();
        $('#data-table').find('tr:contains("'+text.toLowerCase()+'")').show();
    }else{
        $('#data-table').find('tr').show();
    }
})