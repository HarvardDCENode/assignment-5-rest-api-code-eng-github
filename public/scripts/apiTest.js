
// root of the test form
var apiTestFormSelector = '#apiTestForm';

// testing read endpoint
function getHouse(house, callback) {
    console.log('****** GET HOUSE *******');
    console.log('fetching newly created house via api')

    $.ajax('/api/house/' + house._id, {
        method: 'GET',
        success: function(getHouse) {
            console.log(getHouse);
            callback();
        }
    });
}

// testing update endpoint
function updateHouse(house, callback) {
    console.log('****** UPDATE HOUSE *******');
    console.log('Now changing the price to 100000');

    $.ajax('/api/house/' + house._id, {
        method: 'POST',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            address: house.address,
            price: 100_000
        }),
        success: function(updatedHouse) {
            console.log(updatedHouse);
            callback();
        }
    });
}

// testing delete endpoint
function deleteHouse(house) {
    console.log('****** DELETE HOUSE *******');
    console.log('deleting house via api')

    $.ajax('/api/house/' + house._id, {
        method: 'DELETE',
        dataType: 'json',
        success: function() {
            console.log('house was deleted successfully');
            callback();
        }
    });
}


function loadHandler() {

    $(apiTestFormSelector).submit(function(event) {
        // prevent form from submitting to backend
        event.preventDefault();

        var addressText = $(apiTestFormSelector).find('textarea').val();
        var price = parseFloat($(apiTestFormSelector).find('input[name="price"]').val()) || 0;

        // echo address
        console.log('test house address:', addressText);
        console.log('test house price: ', price);

        // Start by testing create endpoint
        console.log('****** CREATE HOUSE *******');
        $.ajax('/api/house', {
            method: 'PUT',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                address: addressText,
                price: price
            }),
            success: function(createdHouse) {
                console.log('created house');
                console.log(createdHouse);

                getHouse(createdHouse, function() {
                    updateHouse(createdHouse, function() {
                        deleteHouse(createdHouse, function() {})
                    });
                });
            }
        });
    });

};


$(window).on('load', loadHandler);