(function(angular) {

  angular.module('app').factory('demoFactory', ['$q', '$http', demoFactory]);

  function demoFactory($q, $http) {
    var module = {};
    var self = module;
    self.allBooks = false;

    module.getAllbooks = function() {
    
       var defered = $q.defer();
       var promise = defered.promise;
       var url = 'http://127.0.0.1:8080/v1/libro';
       
     function successCallback(response) {
    	 self.allBooks = response.data;
        defered.resolve(response.data);
      }

      function errorCallback(error) {
        defered.reject(error);
      }

      if (self.allBooks === false) {
         $http.get(url).then(successCallback, errorCallback);
       } else {
          defered.resolve(self.allBooks);
       }

      return promise;
    };
    
    module.postBook = function(payload) {
        var defered = $q.defer();
        var promise = defered.promise;
        var url = 'http://127.0.0.1:8080/v1/libro';
        
        var lastIndex = self.allBooks[self.allBooks.length - 1].isbn + 1;
        payload.isbn = lastIndex;
        
      function successCallback(response) {
     	 self.allBooks.push(response.data);
         defered.resolve(response.data);
       }

       function errorCallback(error) {
         defered.reject(error);
       }

       $http.post(url, payload).then(successCallback, errorCallback);

       return promise;
    };

    module.addBook = function(newTitle) {
        var newBook = {};

        if ( !newTitle ) {
            return false;
        }
        newBook.id = allBooks.length;
        newBook.title = newTitle;
        self.allBooks.push(newBook);
        return true;
    };
    
    module.deleteBook = function(isbn) {
    	var url = 'http://127.0.0.1:8080/v1/libro/' + isbn;
    	var defered = $q.defer();
        var promise = defered.promise;
    	
    	function successCallback(response) {
            defered.resolve(response);
          }

          function errorCallback(error) {
            defered.reject(error);
          }

          $http.delete(url).then(successCallback, errorCallback);
          return promise;
    };
    
    module.resetBooks = function() {
    	self.allBooks = false;
    };
 

    return module;
  };

})(angular);


