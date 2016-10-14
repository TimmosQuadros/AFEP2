var myApp = angular.module('DemoApp', ['ngRoute']);
var newcar = {};
myApp.config(function ($routeProvider) {
    $routeProvider
            .when("/addCar", {
                templateUrl: "view/form.html",
                controller: "CarController"
            })
            .otherwise({
                redirectTo: "/"
            });
});

myApp.factory('CarFactory', function () {
    var cars = [
        {id: 1, year: 1997, registered: new Date(1999, 3, 15), make: 'Ford', model: 'E350', description: 'ac, abs, moon', price: 3000}
        , {id: 2, year: 1999, registered: new Date(1996, 3, 12), make: 'Chevy', model: 'Venture', description: 'None', price: 4900}
        , {id: 3, year: 2000, registered: new Date(199, 12, 22), make: 'Chevy', model: 'Venture', description: '', price: 5000}
        , {id: 4, year: 1996, registered: new Date(2002, 3, 15), make: 'Jeep', model: 'Grand Cherokee', description: 'Moon roof', price: 4799}];

    var nextId = 5;

    var getCars = function () {
        return cars;
    };

    var deleteCar = function (id) {
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].id === id) {
                cars.splice(i, 1);
                return;
            }
        }
    };

    var addEditCar = function (newcar) {
        if (newcar.id === null) {
            newcar.id = nextId++;
            cars.push(newcar);
        } else {
            for (var i = 0; i < cars.length; i++) {
                if (cars[i].id === newcar.id) {
                    cars[i] = newcar;
                    break;
                }
            }
        }
    };
    
    var addCar = function (newcar){
        newcar.id = nextId++;
        cars.push(newcar);
    };
    
    var editCar = function(newcar){
       for (var i = 0; i < cars.length; i++) {
                if (cars[i].id === newcar.id) {
                    cars[i] = newcar;
                    break;
                }
       } 
    };

    return {
        getCars: getCars,
        deleteCar: deleteCar,
        addEditCar: addEditCar,
        addCar: addCar,
        editCar: editCar
    };
});


myApp.controller('CarController', ["$scope", "CarFactory", function ($scope, CarFactory) {
        var self = this;

        //self.newcar = newcar;
        self.cars = CarFactory.getCars();
        self.title = "Cars Demo App";
        self.predicate = "year";
        self.reverse = false;
        self.nextId = 5;
        self.showForm = false;
        self.edit = false;

        self.setShowForm = function (set) {
            this.showForm = set;
        };

        self.deleteCar = function (car) {
            CarFactory.deleteCar(car.id);
        };
        self.addEditCar = function () {
            if(self.edit){
                CarFactory.editCar(self.newcar);
            }else{
                cartmp = {id: null, year: self.newcar.year, registered: self.newcar.registered, make: self.newcar.make, model: self.newcar.model, description: self.newcar.description, price: self.newcar.price};
                CarFactory.addCar(cartmp);
            }
        };
        
        self.addCar = function (car){
            CarFactory.addCar(car);
        };

        self.editCar = function (car) {
            CarFactory.editCar(car);
        };

        self.resetCar = function () {
            self.newcar = {};
        };
        
        self.setCarFormData = function (car){
            self.newcar=car;
        };

        self.setEdit = function (value) {
            self.edit = value;
        };

    }]);

