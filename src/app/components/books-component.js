(function(angular) {

  angular.module('app').component('booksComponent', {
    templateUrl: 'app/components/books-template.html',
    controller: ['$log', 'demoFactory', books],
    controllerAs : 'booksComponent'
  });

  function books($log, demoFactory) {
    var vm = this;
    
    vm.$onInit = function() {
      vm.mainTitle = 'Libros';

      var payload = {};
      
	  demoFactory.getAllbooks().then(function(data) {
          if ( data ) {
        	  vm.allbooks = data;
        	  $log.log('get  ', vm.allbooks);
          }
       });
    }
    
    vm.actions = {};
    
    vm.actions.addBook = function() {
    	var payload = {"autor": autor.value,	
    				  "disponible": true,
    					"fecPublicacion": "01/01/2017",
    					"titulo": titulo.value
    					};
    	demoFactory.postBook(payload).then(function(data) {
    		 $log.log('post ', data);
    	});
    }
    
    
    vm.actions.deleteBook = function(isbn) {
    	demoFactory.deleteBook(isbn).then(function(data) {
    		 $log.log('delete ', data);
    		 
    		 demoFactory.resetBooks();
    		 demoFactory.getAllbooks().then(function(data) {
    			 $log.log('get ', data);
    	          if ( data ) {
    	        	  vm.allbooks = data;
    	        	  $log.log('getygvy ', vm.allbooks);
    	          }
    	       });
    	});
    }
    
  }

})(angular);