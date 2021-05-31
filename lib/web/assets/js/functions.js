$(document).ready(function(){

    $('#cep').mask('00000-000');
    $('#phone').mask('(00) 00000-0000');
    $('#fc-phone').mask('(00) 00000-0000');
    $('#cpf').mask('000.000.000-00');

    $('#datapicker').datepicker();

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

    $('form.form-banner').submit( function(){
        formSend();
        return false;
    });  

    $('button[type=submit]').click( function(){
        formSend($(this));
        return false;
    }); 
    
});


var formSend = function(e){
        
    var el = $('form.form-banner');
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
                // $('.form-cotacao').removeClass('current');
                // $('.' + $(el).data('btn')).addClass('current');
                // $('.nome-user').text($('input[name=nome]').val());
                $('form').html(`
                    <svg width="98" height="72" viewBox="0 0 98 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 40.2282L31.8404 66L92 6" stroke="#FAFA31" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h4> Obrigado! </h4>
                    <p>Entraremos em contato no horário selecionado.</p>
                `)
            }
        }
        i++
    });

}