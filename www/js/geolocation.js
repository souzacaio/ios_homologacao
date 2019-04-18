
    var GravarGeolocation = function(position) {
        /*alert('Latitude: '            + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');*/

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

    function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
      }