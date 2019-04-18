
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
        navigator.geolocation.watchPosition(mapa,mapa_erro);
    }

    function mapa_erro() {
        app.dialog.alert('Erro ao gerar localização');
    }

    function mapa(position) {

        alert(1);
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
    }