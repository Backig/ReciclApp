/**
 * Created by macbookair11 on 18/9/15.
 */

angular.module('starter.services', [])

  .service('LoginService', function($q) {
    return {
      loginUser: function(name, pw) {

        var deferred = $q.defer();
        var promise = deferred.promise;
        var x;
        var clave;
        var existe = false;

        for (x=0; x<=localStorage.length-1; x++)  {
          clave = localStorage.key(x);
          var array = JSON.parse(localStorage.getItem(clave));

          if (name == clave && pw == array[0]) {
            existe = true;
            break;
          }
        }

        if (existe) {
          deferred.resolve('Bienvenido ' + name + '!');
        } else {
          deferred.reject('Credenciales incorrectos.');
        }
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }
    }
  })


.service('topService', function($q) {
  return {
    top: function(value) {

      var personas1 = [];
      var personas2 = [];
      var personas3 = [];
      var array;

      for (x=0; x<=localStorage.length-1; x++){
        clave = localStorage.key(x);
        array = JSON.parse(localStorage.getItem(clave));
        if(array[5] == value){
          personas1.push(array);

        }
      }

      personas1 = personas1.sort(deMayorAMenor);


      for(y=0; y<= personas1.length-1; y++){
        array = JSON.parse(localStorage.getItem(personas1[y][6]));
        console.log(personas1[y][6]);
        console.log(array);
        if(y < 10){
          if(array !== null){
            personas2.push(array);
          }

        }
      }

      console.log(personas2);
      personas3 = personas2.sort(deMayorAMenor);

      return personas3;


    }
  }

    function deMayorAMenor(elem1, elem2) {
      return elem2[4]-elem1[4];
    };
})
