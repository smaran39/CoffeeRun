
/*Initailly you are not able to test the output of the many console.logs that we use in truck.js file. A simple fix is to
create another function that returns the value we log to console and test that string against the console output when we run the
function its contained in.*/


QUnit.test('Figure-8.10 DataStore ', function(assert) {
    var ds = window.myTruck.db;
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');
    assert.deepEqual({
        'm@bond.com': 'tea',
        'james@bond.com': 'eshpressho'
    }, ds.getAll(), 'getAll function returns two objects - passed');
    ds.remove('james@bond.com');
    assert.deepEqual({
        'm@bond.com': 'tea'
    }, ds.getAll(), 'getAll function returns one object after removing other - passed');
    assert.equal('tea', ds.get('m@bond.com'), 'get function,tea is the expected result- passed');
    var array_size = Object.keys(ds.getAll()).length;
    /*The Object.keys() method returns an array of a given object's own enumerable properties.
       so here, all the keys i.e., emailaddresses will be in the resulting array.*/
    assert.equal(1, array_size, 'after removing one emailaddress,remove function - passed');
});

QUnit.test('Figure-8.32 Truck', function(assert) {
    var myTruck = window.myTruck;

    var console_result1 = myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    });
    var orderInfo = window.myTruck.db.get('me@goldfinger.com');
    assert.ok(orderInfo.coffee == 'double mocha', 'Passed!'); //above line and this line is to check that order is created. Optional
    assert.ok(console_result1 == 'Adding order for me@goldfinger.com', 'Passed!');

    var console_result2 = myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });
    assert.ok(console_result2 == 'Adding order for dr@no.com', 'Passed!');

    var console_result3 = myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });
    assert.ok(console_result3 == 'Adding order for m@bond.com', 'Passed!');

    var db_size = Object.keys(myTruck.db.getAll()).length;
    assert.equal(db_size, 3, '3 orders are printed(existing)');

    var console_result6 = myTruck.printOrders();
    assert.equal(console_result6[0], 'Truck #ncc-1701 has pending orders:', 'Passed!');
    assert.equal((console_result6.length)-1,3, 'Printed 3 orders so Passed---');

    var console_result4 = window.myTruck.deliverOrder('me@goldfinger.com');
    assert.ok(console_result4 == 'Delivering order for me@goldfinger.com', 'Passed!');

    var console_result5 = window.myTruck.deliverOrder('m@bond.com');
    assert.ok(console_result5 == 'Delivering order for m@bond.com', 'Passed!');

    db_size = Object.keys(myTruck.db.getAll()).length;
//checking the length of array containing emailaddresses.
/*The Object.keys() method returns an array of a given object's own enumerable properties.
   so here, all the keys i.e., emailaddresses will be in the resulting array.*/
    assert.equal(console_result6[0], 'Truck #ncc-1701 has pending orders:', 'Passed!');
    assert.equal(db_size, 1, '1 order is printed(existing), after delivering 2 orders');
//checking the number of orders remaining after delivering two orders.
});
