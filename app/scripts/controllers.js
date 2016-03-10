angular.module('starter.controllers', [])

  .controller('AppCtrl',['$scope','LoginService', '$ionicModal', '$timeout', '$ionicPopup', '$state', 'topService','$cordovaCamera',function($scope,LoginService, $ionicModal, $timeout, $ionicPopup, $state, topService, $cordovaCamera) {


    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      id:1,
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Create the register modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register.html', {
      id:2,
      scope: $scope
    }).then(function(modal) {
      $scope.modal2 = modal;
    });

    $ionicModal.fromTemplateUrl('templates/editarPerfil.html', {
      id:3,
      scope: $scope
    }).then(function(modal) {
      $scope.modal3 = modal;
    });

    $ionicModal.fromTemplateUrl('templates/premios.html', {
      id:4,
      scope: $scope
    }).then(function(modal) {
      $scope.modal4 = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function(index) {

      if (index == 1) $scope.modal.hide();
      else $scope.modal2.hide();

    };

    // Open the login modal
    $scope.login = function(index) {
      if (index == 1){

        $scope.modal.show();
        $scope.closeLogin(2);

      } else{
        $scope.modal2.show();
        $scope.closeLogin(1);

        }
    };

    $scope.perfil = function(){

      $scope.modal3.show();
    };

    $scope.closePerfil = function() {
        $scope.modal3.hide();

    };

    $scope.premios = function(){

      $scope.modal4.show();
    };

    $scope.closePremios = function() {
      $scope.modal4.hide();

    };
    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {

      var nom = $scope.loginData.username;
      var pass = $scope.loginData.password;

      LoginService.loginUser(nom, pass).success(function(data) {
        sessionStorage.setItem(nom, pass);
        llenarPerfil(nom);


        $state.go('app.playlists');

      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error!',
          template: 'Nombre de usuario/contraseña incorrecto',
        });
      });
      $scope.loginData.password = '';
      $timeout(function() {
        $scope.closeLogin(1);
        $scope.closeLogin(2);
      }, 1000);
    };


    // Esconde el icono de cerrar sesión si no hay un usuario logeado
    $scope.isLoggedIn = function() {

      if($scope.loginData.username !== 'undefined'){
        var nom = $scope.loginData.username;
        if(sessionStorage.getItem(nom) !== null ) {
          return true;
        } else {
          return false;
        }
      }else{
        return false;
      }


    };

    $scope.guardarCambios = function(){

      var nom = $scope.usuario.username;
      var pass = $scope.usuario.pass;
      var nomCom = $scope.usuario.nombre;
      var fecha = $scope.usuario.fecha;
      var email = $scope.usuario.email;
      var option = $scope.usuario.carrera;
      $scope.imagenPerfil = $scope.usuario.imagen;

      var re = new RegExp("^\\w+\@ucenfotec.ac.cr\$");
      var exr = /^[0-9a-z_\-\.]+@ucenfotec\.ac.cr/i;

      if (exr.test(email)){
        var value = [pass,nomCom,fecha,email,$scope.usuario.cantPuntos, option, nom,  $scope.imagenPerfil];
        localStorage.setItem(nom, JSON.stringify(value));

        var alertPopup = $ionicPopup.alert({
          title: 'Exitoso!!',
          template: 'Registrado correctamente'
        });

        $scope.closePerfil();

      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'Correo electrónico incorrecto!!',
          template: 'Ingrese un correo electrónico válido.'
        });

      }
    };


    llenarPerfil = function(name){
      $scope.usuario = [];
      var array = JSON.parse(localStorage.getItem(name));
      var newdate = array[2].split("/").reverse().join("-");
      $scope.usuario = {nombre:array[1], email:array[3], cantPuntos:array[4],imagen:array[7],fecha:newdate, username: array[1], carrera:array[5], pass:array[0]};
    };


    $scope.register = function(){

      var nom = $scope.loginData.username;
      var pass = $scope.loginData.password;
      var nomCom = $scope.loginData.nombre;
      var fecha = $scope.loginData.fecha;
      var email = $scope.loginData.email;
      var e = document.getElementById('carreras');
      var option = e.options[e.selectedIndex].text;
      $scope.imagenPerfil = "images/perfil_cenfotec.jpg";

      var date = new Date(fecha);
      var date2 =  date.getDate() + '/' + date.getMonth() + 1 +  '/' +  date.getFullYear();

      var re = new RegExp("^\\w+\@ucenfotec.ac.cr\$");
      var exr = /^[0-9a-z_\-\.]+@ucenfotec\.ac.cr/i;

        if (exr.test(email)){

          if(pass === 'undefined' || nom === 'undefined'|| nomCom === 'undefined' || email === 'undefined'){
            var alertPopup = $ionicPopup.alert({
              title: 'Datos incorrectos!!',
              template: 'Los campos nombre usuario, nombre, email y contraseña son obligatorios.'
            });
          }else{
            var value = [pass,nomCom,date2,email,0, option, nom,  $scope.imagenPerfil];
            localStorage.setItem(nom, JSON.stringify(value));

            var value2 = ['123','Mariana Mendoza', date2, 'mmendozac@ucenfotec.ac.cr',600 ,option,'marymen',$scope.imagenPerfil];
            localStorage.setItem('marimen', JSON.stringify(value2));

            var value2 = ['123','Julio Cesar Mena', date2, 'jmarinm@ucenfotec.ac.cr',200 ,option,'juanCas',$scope.imagenPerfil];
            localStorage.setItem('juanCas', JSON.stringify(value2));

            var value2 = ['123','Carolina Corrales', date2, 'ccorralesb@ucenfotec.ac.cr',1000 ,option,'caroCo',$scope.imagenPerfil];
            localStorage.setItem('caroCo', JSON.stringify(value2));

            var value2 = ['123','Edith Saborio', date2, 'esaboriog@ucenfotec.ac.cr',500 ,option,'editCo',$scope.imagenPerfil];
            localStorage.setItem('editCo', JSON.stringify(value2));

            var value2 = ['123','Nathalia Castro ', date2, 'ncastrof@ucenfotec.ac.cr',100 ,option,'nathyGu',$scope.imagenPerfil];
            localStorage.setItem('nathyGu', JSON.stringify(value2));

            var value2 = ['123','Isabella Torres', date2, 'itorres@ucenfotec.ac.cr',100 ,'Desarrollo de Software','isatorres',$scope.imagenPerfil];
            localStorage.setItem('isatorres', JSON.stringify(value2));


            var value2 = ['123','Luna Juarez', date2, 'luju@ucenfotec.ac.cr',0 ,'Ciberseguridad','luju',$scope.imagenPerfil];
            localStorage.setItem('luju', JSON.stringify(value2));



            var alertPopup = $ionicPopup.alert({
              title: 'Exitoso!!',
              template: 'Registrado correctamente'
            });

            $scope.loginData.password = '';
            $scope.closeLogin(2);
          }

        } else {
          var alertPopup = $ionicPopup.alert({
            title: 'Correo electrónico incorrecto!!',
            template: 'Ingrese un correo electrónico válido.'
          });

        }

    };

    $scope.$on('$destroy', function() {
      console.log('Destroying modals...');

      $scope.modal.remove();
      $scope.modal2.remove();
    });

    // Limpia la variable de sesión al hacer click en Cerrar Sesión

    $scope.logout = function() {

      $state.go('app.playlists');
      var nom = $scope.loginData.username;
      $scope.loginData = {};
      sessionStorage.removeItem(nom);


    };

    $scope.listarTop10 = function(datos){
      var e = document.getElementById('carreraSelected');
      var option = e.options[e.selectedIndex].text;
      $scope.personas = topService.top(option);

    };

    $scope.iniciar= function(value){
      $scope.personas = topService.top(value);
    };

    $scope.openEditProfileModal = function(username){
      $scope.perfil(username);
    }



      $scope.uploadPicture = function(){
        var options = {
          quality: 90,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 600,
          targetHeight: 600,
          saveToPhotoAlbum: false,
          correctOrientation:true
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {

          var base64pic = "data:image/jpeg;base64," + imageData;

            var nom = $scope.usuario.username;
            var pass = $scope.usuario.pass;
            var nomCom = $scope.usuario.nombre;
            var fecha = $scope.usuario.fecha;
            var email = $scope.usuario.email;
            var option = $scope.usuario.carrera;

            var value = [pass,nomCom,fecha,email,$scope.usuario.cantPuntos, option, nom, imageData];
            localStorage.setItem(nom, JSON.stringify(value));
            $scope.usuario.imagen = imageData;
            llenarPerfil(nom);

        }, function(err) {
          console.log('Error al seleccionar la foto: ' + err);
        });
      };


  }])


.controller('PlaylistsCtrl', function($scope) {


})

  .controller('Top10Ctrl',['$scope','topService',function($scope, topService){


    $scope.iniciar= function(value){
      $scope.personas = topService.top(value);
    };

    $scope.listarTop10 = function(){

      var e = document.getElementById('carreraSelected');
      var option = e.options[e.selectedIndex].text;
      console.log(options);
      $scope.personas = topService.top(option);

    }

  }])

  .controller('scannerCtrl',['$scope', '$ionicPopup','$ionicModal', 'topService','$ionicActionSheet','$state' ,function($scope, $ionicPopup, $ionicModal,topService, $ionicActionSheet, $state){
    $scope.scanBarcode = function() {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          var nom = $scope.loginData.username;
          var num = result.text;
          var score = num.substring(2,6);
          var puntos = 0;
          for (x=0; x<=localStorage.length-1; x++)  {
            clave = localStorage.key(x);
            var array = JSON.parse(localStorage.getItem(clave));
            if (nom == clave) {
               puntos = parseInt(score) + array[4];
              var value = [array[0],array[1],array[2],array[3],puntos,array[5],array[6],array[7]];
               localStorage.setItem(clave, JSON.stringify(value));
               var alertPopup = $ionicPopup.alert({
                title: 'Exitoso!!' ,
                template: 'Usted ha registrado ' + score + ' puntos.'
            });

              var e = document.getElementById('carreraSelected');
              var option = e.options[e.selectedIndex].text;
              $scope.personas = topService.top(option);
              $state.go('app.top10');
            }
          }
        },
        function (error) {
          alert("Scanning failed: " + error);
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/scanerManual.html', {
      id:1,
      scope: $scope
    }).then(function(modal) {
      $scope.modal5 = modal;
    });

    $scope.scannerManual = function(){
      $scope.modal5.show();
    };

    $scope.closeScanner = function(index) {
      if (index == 1) $scope.modal5.hide();
    };

    $scope.registrarManual = function(){
      var val = document.getElementById('comment-textarea').value;
      var nom = $scope.loginData.username;
      var score = val.split("-");
      var puntos = 0;
      if(typeof $scope.loginData.username === 'undefined'){
        var alertPopup = $ionicPopup.alert({
          title: 'Error!!' ,
          template: 'Debe iniciar sesión primero.'
        });
        $scope.modal5.hide();
      }else{
        for (x=0; x<=localStorage.length-1; x++)  {
          clave = localStorage.key(x);
          var array = JSON.parse(localStorage.getItem(clave));
          if (nom == clave) {
            puntos = parseInt(score[1]) + array[4];
            var value = [array[0],array[1],array[2],array[3],puntos,array[5],array[6],array[7]];
            localStorage.setItem(clave, JSON.stringify(value));
            var alertPopup = $ionicPopup.alert({
              title: 'Exitoso!!' ,
              template: 'Usted ha registrado ' + score[1] + ' puntos.'
            });
            var e = document.getElementById('carreraSelected');
            var option = e.options[e.selectedIndex].text;
            $scope.personas = topService.top(option);
          }
        }
        document.getElementById('comment-textarea').value = "";
        $scope.modal5.hide();
        $state.go('app.top10');
      }
    };

    $scope.action = function(){
      $ionicActionSheet.show({
        titleText: 'Opciones de escáner',
        buttons: [
          { text: '<i class="icon ion-android-hand balanced"></i> Escáner Manual' },
          { text: '<i class="icon ion-ios-camera energized"></i> Escáner con camara' },
        ],
        cancelText: 'Cancel',
        cancel: function() {
          console.log('CANCELLED');
        },
        buttonClicked: function(index) {
          $scope.buttonClick(index);
          return true;
        },

      });

    };

    $scope.buttonClick = function(index){
      if(index == 0){
        $scope.scannerManual();
      }else{
        $scope.scanBarcode();
      }
    };

  }])

.controller('PlaylistCtrl', function($scope, $stateParams) {


});



