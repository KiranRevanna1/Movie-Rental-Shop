// CustomerModel.js
Ext.define('Movie.Shop.model.CustomerModel', {
    extend: 'Movie.Shop.model.Base',
    fields: [

        { name: 'CustomerId', type: 'int' },
        { name : 'id',mapping:'CustomerId',type: 'int' },
        { name: 'Name', type: 'string' },
        { name: 'Email', type: 'string' }
    ],
    idproperty: 'id',
});
