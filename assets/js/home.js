$('#uploadfile').change(function(){
    let fileName = $('#uploadfile').val().split('\\').pop();
    if(fileName){
        $('p').remove();
        $('#submit-btn').css('display', 'block');
        $('#submit-btn').before(`<p>${fileName}</p>`);
    }
});



