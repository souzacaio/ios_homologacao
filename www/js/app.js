
// Dom7
var $$ = Dom7;
localStorage.setItem('DOMINIO','https://www.controlcondo.com.br/controlcondo/v2/')
// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'ControlCondo',
        lastName: 'Firstcontrol',
      },
    };
  },
  // App root methods
  methods: {
    login_falha: function () {
      app.dialog.alert('Usuario não encontrado ou sem privilégio.');
    },
  },
  // App routes
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});


var registrar = {
	
	 setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "572833270659"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);
            document.getElementById('chave').value = data.registrationId;

            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
    }
}


let  initcap = (valor) => {

    var string     = valor.toLowerCase();
    var string_a   = string.split(' ');
    var x          = 0;
    var primeira_m = 0;
    var formatado  = '';
    
    for(x in string_a){
        
        primeira_m  = string_a[x].substr(0,1).toUpperCase();
        formatado  +=  primeira_m+string_a[x].substr(1)+' ';
    
    }
    
    return formatado;
}


let loader = () => {

    app.dialog.preloader();
    setTimeout(function () {
        app.dialog.close();
        return true
    }, 4000);
}


let voltar = (page) => {

    setTimeout(function(){
        $('div[data-name="'+page+'"] a')[0].click(); 
    },700);

}


