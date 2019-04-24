let logar = () => {

    let email   = $$('#loginemail').val();
    let senha   = $$('#loginsenha').val();
    let x       = 0;
    let html    = '';

    $.ajax({

            url:localStorage.getItem('DOMINIO')+'appweb/app_admin.php',
            type:'POST',
            beforeSend: function(){

                app.dialog.preloader()
            },
            data:{
                    email: email,
                    senha: senha,
                    tipo:'verifica_dados'
                 },
            dataType:'JSON',
            success:function(r){

                app.dialog.close();

                if(r.NotFound == 'NotFound'){ /* Usuario não encontrado */

                    app.dialog.alert('Usuario não encontrado.');

                }else
                if(r.length == 1){ /* Mono Usuario */

                    localStorage.setItem('id_condominio',r[x].id_condominio);
                    carrega_info_usuario();
                    
                }else
                if(r.length > 1){ /* Multi Usuario */

                    for(x in r ){ 

                        html += '<option value='+r[x].id_condominio+'>'+initcap(r[x].condominio)+'</option>';
                    }
                    
                    $('#l_condominios').html('');
                    $('#l_condominios').html('<option value="">Selecione uma opção ...</option>'+html);
                    $('.abrirmultiuser').click();   
                       
                }
    
            },
            error:function(r){
                app.dialog.close();
                app.dialog.alert('Erro contate o administrador do sistema.');
            }
    })

}

let carrega_info_usuario = () => {

    let id_condominio = $('#l_condominios').val() != null ? $('#l_condominios').val():localStorage.getItem('id_condominio');
    let usuario       = $('#loginemail').val();
    let senha         = $('#loginsenha').val();

    $.ajax({
        url:localStorage.getItem('DOMINIO')+'appweb/app_admin.php',
        type:'POST',
        beforeSend: function(){
                
            app.dialog.preloader()
        },
        data:{
                id_condominio:id_condominio,
                email:usuario,
                senha:senha,
                tipo:'carrega_dados'
             },
        dataType:'JSON',
        success:function(r){

            app.dialog.close();
            /* Carrega dados sessao */
            localStorage.setItem('nome_morador',r[0].nome);
            localStorage.setItem('id_usuario_condominio',r[0].id_usuario_condominio);
            localStorage.setItem('id_condominio',r[0].id_condominio);

            /* Carrega dados html */
            
            $('.m_nome_morador').text(initcap(r[0].nome));
            $('#go_feed').get(0).click();
            $('.l_multiusu_close').get(0).click();
            setTimeout(function(){

                carreta_grafico();

            },500);     
            
            //navigator.geolocation.watchPosition(GravarGeolocation, onError); 

        },
        error:function(r){
            app.dialog.alert('Erro.');
        }
    })

}

let logOut = () => {

    window.location = "index.html";
    localStorage.removeItem('id_condominio');
    localStorage.removeItem('nome_morador');
    localStorage.removeItem('id_usuario_condominio');

}

