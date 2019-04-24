

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


    var map,
        currentPositionMarker,
        mapCenter = new google.maps.LatLng(40.700683, -73.925972),
        map;

    function initializeMap()
    {
        map = new google.maps.Map(document.getElementById('map_canvas'), {
            zoom: 18,
            center: mapCenter,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            });
    }

    function locError(error) {
        // the current position could not be located
        alert("The current position could not be found!");
    }

    function setCurrentPosition(pos) {
        currentPositionMarker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(
                pos.coords.latitude,
                pos.coords.longitude
            ),
            title: "Current Position"
        });
        map.panTo(new google.maps.LatLng(
                pos.coords.latitude,
                pos.coords.longitude
            ));
    }

    function displayAndWatch(position) {
        // set current position
        setCurrentPosition(position);
        // watch position
        watchCurrentPosition();
    }

    function watchCurrentPosition() {
        var positionTimer = navigator.geolocation.watchPosition(
            function (position) {
                setMarkerPosition(
                    currentPositionMarker,
                    position
                );
                //GravarGeolocation(position);
            });
    }

    function setMarkerPosition(marker, position) {
        marker.setPosition(
            new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude)
        );
    }

    function initLocationProcedure() {
        initializeMap();
        $('.main_mapa').show();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
        } else {
            alert("Your browser does not support the Geolocation API");
        }
    }

