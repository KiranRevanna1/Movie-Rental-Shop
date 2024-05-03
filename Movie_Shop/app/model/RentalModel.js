// RentalModel.js
Ext.define('Movie.Shop.model.RentalModel', {
    extend: 'Movie.Shop.model.Base',

    fields: [
        { name: 'RentalId', type: 'int' },
        { name : 'id',mapping:'RentalId',type: 'int' },
        { name: 'CustomerId', type: 'int' },
        { name: 'MovieId', type: 'int' },
        { name: 'RentalDate', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'ReturnDate', type: 'date', dateFormat: 'Y-m-d' }
        // Add more fields as needed
    ],
    idproperty: 'id',
});
