(function(window) {
    'use strict';
    var App = window.App || {};

    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }
/* This function 'consoleLog' is written especially (or only) for the QUnit tasks.According to the actual functions from textbook,
the functions do NOT return anything. But for QUnit testing purposes, we need to compare the string printed on console to the expected
result. Go through 'tests.js' file for more clarity. */
    function consoleLog(string) {
        console.log(string);
        return string;
    }
    Truck.prototype.createOrder = function(order) {
/*changed the actual code for QUnit test-cases.*/
        var log = consoleLog('Adding order for ' + order.emailAddress);
        this.db.add(order.emailAddress, order);
        return log;
    };

    Truck.prototype.deliverOrder = function(customerId) {
/*changed the actual code for QUnit test-cases.*/
        var log = consoleLog('Delivering order for ' + customerId);
        this.db.remove(customerId);
        return log;
    };

    Truck.prototype.printOrders = function() {
        var consoleOutput = [];
        var customerIdArray = Object.keys(this.db.getAll());
/*changed the actual code for QUnit test-cases.*/
        var log = consoleLog('Truck #' + this.truckId + ' has pending orders:');
        consoleOutput.push(log);
        customerIdArray.forEach(function(id) {
            log = consoleLog(this.db.get(id));
            consoleOutput.push(log);
        }.bind(this));
        return consoleOutput; //for the purpose of Qunit testing
    };

    App.Truck = Truck;
    window.App = App;
})(window);
