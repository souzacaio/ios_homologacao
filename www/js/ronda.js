
let carreta_grafico = () => {

    var demoGauge = app.gauge.create({
        el: '.demo-gauge',
        type: 'circle',
        value: 0.9,
        size: 250,
        borderColor: '#2196f3',
        borderWidth: 10,
        valueText: '90%',
        valueFontSize: 41,
        valueTextColor: '#2196f3',
        labelText: 'Rondas Concluídas',
      
    });

}

let carrega_ronda = () => {

    let html      = '';
    let x         = 0;
    let contador  = 1;

    $.ajax({

        url:localStorage.getItem('DOMINIO')+'appweb/app_admin.php',
        type:'POST',
        beforeSend: function(){
            app.dialog.preloader()
        },
        dataType:'JSON',
        data:{
            tipo:'carrega_rondas',
            id_condominio:localStorage.getItem('id_condominio')
        },
        success:function(r){
           
            $('#carrega_rondas').html('');

            setTimeout(function(){
                app.dialog.close();
                for(x in r){
                
                    html += '<li onclick="carrega_rota('+r[x].id_ronda+')">'+
                                '<a href="/rota/" class="item-link item-content">'+
                                '<div class="item-inner">'+
                                '<div class="item-title-row">'+
                                    '<div class="item-title"><strong>Ronda '+contador+'</strong></div>'+
                                    '<div class="item-after" style="margin-left: 159px;">'+
                                        '<i class="icon icon-fill f7-icons if-not-md">sort_up<span class="badge color-red">'+r[x].qtd_rotas+'</span></i>'+
                                    '</div>'+
                                    '<div class="item-after">'+r[x].horario.substr(11,5)+'</div>'+
                                    '</div>'+
                                    '<div class="item-subtitle">'+r[x].descricao+'</div>'+
                                    '<div class="item-text">Parar em todos os pontos. Verificar requisitos minimos do quadra de avisos. Em casos atipicos.</div>'+
                                '</div>'+
                                '</a>'+
                            '</li>';
                            contador += 1;    
                }
                
                $('#carrega_rondas').append(html);

            },500);           
           
        },
        error:function(r){
            app.dialog.close();

        }
    })
}


let carrega_rota = (id_ronda) => {

    let html      = '';
    let x         = 0;
    let contador  = 1;

    $.ajax({

        url:localStorage.getItem('DOMINIO')+'appweb/app_admin.php',
        type:'POST',
        beforeSend: function(){
            app.dialog.preloader()
        },
        dataType:'JSON',
        data:{
            tipo:'carrega_rotas',
            id_ronda:id_ronda
        },
        success:function(r){
            
            $('#carrega_rotas').html('');

            setTimeout(function(){
                app.dialog.close();
                for(x in r){
                
                    html += '<li><a href="/pontos/" onclick="carrega_ponto('+r[x].id_ronda_sub+')" class="">Rota '+r[x].descricao+'</a></li>';
                    contador += 1;    
                }
                
                $('#carrega_rotas').html(html);

            },500);           
           
        },
        error:function(r){
            app.dialog.close();

        }
    })
}


let carrega_ponto = (id_ronda_sub) => {

    let html      = '';
    let texto     = '';
    let x         = 0;
    let tamanho   = 0;
    let contador  = 1;
   
    $.ajax({

        url:localStorage.getItem('DOMINIO')+'appweb/app_admin.php',
        type:'POST',
        beforeSend: function(){
            app.dialog.preloader()
        },
        dataType:'JSON',
        data:{
            tipo:'carrega_pontos',
            id_ronda_sub:id_ronda_sub
        },
        success:function(r){
            app.dialog.close();
            tamanho = r.length;

            for(x in r){

                    html += '<li class="item-content">'+
                                '<div class="item-media"><img src="https://cdn6.aptoide.com/imgs/e/b/b/ebb413bdbd2d1169d012599072e454fc_icon.png?w=240" width="44"></div>'+
                                    '<div class="item-inner">'+
                                        '<div class="item-title-row">'+
                                            '<div class="item-title"><strong style="color:#034eb7">'+initcap(r[x].descricao)+'</strong></div>'+
                                            '</div>'+
                                    '<div class="item-subtitle">Tempo Espera - '+r[x].tempo_espera+' Minutos </div>'+
                                '</div>'+
                            '</li>';    
            }

            if(tamanho > 1){

                texto = ' Pontos';

            }else{

                texto = ' Ponto';

            }

            $('#carrega_pontos').html(html);
            $('.qtdpontos').html(tamanho+texto);
                       
        },
        error:function(r){
            app.dialog.close();
        },
    })
}

