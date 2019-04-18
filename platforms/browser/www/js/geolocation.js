

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
                app.dialog.close();
                $('#carrega_rondas').html('');
                for(x in r){
                    
                    html += '<li>'+
                                '<a href="/rota/" class="item-link item-content">'+
                                '<div class="item-inner">'+
                                '<div class="item-title-row">'+
                                    '<div class="item-title"><strong>Ronda '+contador+'</strong></div>'+
                                    '<div class="item-after" style="margin-left: 159px;">'+
                                        '<i class="icon icon-fill f7-icons if-not-md">sort_up<span class="badge color-red">'+r[x].qtd_rotas+'</span></i>'+
                                    '</div>'+
                                    '<div class="item-after">'+r[x].horario.substr(0,5)+'</div>'+
                                    '</div>'+
                                    '<div class="item-subtitle">'+r[x].descricao+'</div>'+
                                    '<div class="item-text">Parar em todos os pontos. Verificar requisitos minimos do quadra de avisos. Em casos atipicos.</div>'+
                                '</div>'+
                                '</a>'+
                            '</li>';
                            contador += 1;    
                }

                $('#carrega_rondas').append(html);
                
            },
            error:function(r){
                app.dialog.close();

            }
        })
    }


    var GravarGeolocation = function(position) {  
        $.ajax({

            url:localStorage.getItem('DOMINIO')+'appweb/app_admin.php',
            type:'POST',
            data:{
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    id_usuario_condominio:localStorage.getItem('id_usuario_condominio'),
                    tipo:'grava_localizacao'
                    },

            success:function(r){
                //app.dialog.alert('deu certo');
                
            },
            error:function(r){
                // app.dialog.alert('Erro ao gravar localização.');
            }
        })
    };

    
    function onError(error) {
        /*alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');*/

    }


    function carrega_mapa() {
        navigator.geolocation.watchPosition(mapa,mapa_erro,{ timeout: 30000 });
    }


    function mapa_erro() {
        app.dialog.alert('Erro ao gerar localização');
    }


    function mapa(position) {

        var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
        var map = new google.maps.Map(document.getElementById('map_canvas'), {
          zoom: 18,
          center: myLatLng
        });
      
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: ''
        });

        GravarGeolocation(position);
    }


    