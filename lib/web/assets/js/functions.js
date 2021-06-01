$(document).ready(function(){

    $('#cep').mask('00000-000');
    $('#phone').mask('(00) 00000-0000');
    $('#fc-phone').mask('(00) 00000-0000');
    $('#cpf').mask('000.000.000-00');

    $('#datapicker').datepicker({
        minDate: new Date()
    });

    $('.navbar-toggler').on('click', function(){
        $(".collapse").toggle("medium");
    });

    if ($(window).width() < 700){
        $('.card-amarelo h4').click( function(){
            if($(this).closest('.card-amarelo').hasClass('active')){
                $(this).closest('.card-amarelo').removeClass('active');
            }else{
                $(this).closest('.card-amarelo').addClass('active');
            }
        })
    }

	$('.link-scroll-form').click( function(){
        $('html, body').animate({
            scrollTop: $("form.form-banner").offset().top -200
        }, 200);
        $("form.form-banner").addClass('active')
        return false;
    });

    $('form#form-agendamento').submit( function(){
        formSend();
        return false;
    });  

    $('form#form-agendamento button[type=submit]').click( function(){
        formSend($(this));
        return false;
    });  

    $('form#form-call-me-now button[type=submit]').click( function(){
        callMeNow($(this));
        return false;
    }); 

    $('form#form-call-me-now').submit( function(){
        callMeNow();
        return false;
    });  
    
});

var montarData = function(data){
    data = data.match(/\d+/g).map(Number);
    return data[2] + "-" + data[1] + "-" + data[0] + "T";
}

var formSend = function(e){
    var el = $('form#form-agendamento');
    var countCampos = $(el).find('input').length
    var i = 1; 

    $(el).find('input:required').each(function() {
        if ($(this).val() === '' || $(this).val() === undefined){
            $(this).closest('.validate').addClass('error')
            return false;
        }else if($(this).hasClass('check-item') && $('input[name=aceite]:checked').val() === undefined){
            $(this).closest('.validate').addClass('error')
        }else{
            $(this).closest('.validate').removeClass('error')
            if (i >= countCampos) {

                var telefone = $(el).find('input[name="telefone"]').val();
                    telefone = telefone.match(/\d+/g).map(Number);

                var data = $(el).find('input[name="data"]').val();
                var dataFormat = montarData(data);

                var formData = {
                    codCpfCnpjCliente: $(el).find('input[name="cpf"]').cleanVal(),
                    desEmailCliente: $(el).find('input[name="email"]').val(),
                    namCliente: $(el).find('input[name="nomeCompleto"]').val(),
                    numDDDCelular: "" + telefone[0],
                    numCelular: telefone[1] + "" + telefone[2],
                    dtFuturaContato: dataFormat + "" + $(el).find('select[name="horas"]').val()
                }

                $.ajax({
                    type: "POST",
                    url: "/cotacao",
                    data: formData,
                    dataType: "json",
                    success: function (data) {

                        if(data.success){

                            $(el).html(`<div class="form-success">
                                <svg width="98" height="72" viewBox="0 0 98 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 40.2282L31.8404 66L92 6" stroke="#FAFA31" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <h3> Obrigado! </h3>
                                <p>Entraremos em contato no horário selecionado.</p>
                                </div>
                            `)

                        }else{

                            $(el).append(`<div class="form-error">
                                <svg  width="98" height="72" viewBox="0 0 365.71733 365" xmlns="http://www.w3.org/2000/svg"><g fill="#f44336"><path d="m356.339844 296.347656-286.613282-286.613281c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0"/><path d="m295.988281 9.734375-286.613281 286.613281c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094l-15.082032-15.082032c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0"/></g></svg>
                                <h3>Um erro ocorreu ERRO! </h3>
                                <p>Verifique todos os campos.</p>
                                </div>
                            `)
                        }
                    
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        // console.log('Error: ' + xhr.responseText);
                    }
                });
            }
        }
        i++
    });

}

var callMeNow = function(e){
    var el = $('form#form-call-me-now');
    var countCampos = $(el).find('input').length
    var i = 1; 

    $(el).find('input:required').each(function() {
        if ($(this).val() === '' || $(this).val() === undefined){
            $(this).closest('.validate').addClass('error')
        }else{
            $(this).closest('.validate').removeClass('error')
            if (i >= countCampos) {

                var formData = {
                    telefone: $(el).find('input[name="telefone"]').cleanVal()
                }
                $.ajax({
                    type: "POST",
                    url: "/call-me-now",
                    data: formData,
                    dataType: "json",
                    success: function (data) {
                        if(data.requestId){
                            $(el).html(`<div class="form-success">
                                <h3>Obrigado! </h3>
                                <p>Entraremos em contato.</p>
                                </div>
                            `)
                        }else{
                            $(el).append(`<div class="form-error">
                                <h3>Ocorreu um erro! </h3>
                                <p>Verifique o telefone informado.</p>
                                </div>
                            `)
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        // console.log('Error: ' + xhr.responseText);
                    }
                });
            }
        }
        i++
    });

}