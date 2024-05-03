// RentalStore.js
Ext.define('Movie.Shop.store.RentalStore', {
    extend: 'Ext.data.Store',
    alias: 'store.rentalStore',
    model: 'Movie.Shop.model.RentalModel',
    storeId: 'rentalStore',
    proxy: {
        type: 'rest',
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json'
        },
        api: {
            read: 'https://localhost:44342/api/rentals',
            create: 'https://localhost:44342/api/rentals',
            update: 'https://localhost:44342/api/rentals',
            destroy: 'https://localhost:44342/api/rentals'
        },
        idParam: 'RentalId', // Specify the name of the ID parameter in the URL\
        paramAsJson: true,
        noCache: false
    },
    autoLoad: false,
    autoSync : false,
});
