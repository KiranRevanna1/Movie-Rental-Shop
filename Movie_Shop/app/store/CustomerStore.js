// CustomerStore.js
Ext.define('Movie.Shop.store.CustomerStore', {
    extend: 'Ext.data.Store',
    alias: 'store.customerStore',
    model: 'Movie.Shop.model.CustomerModel',
    storeId: 'customerStore',
    proxy: {
        type: 'rest',
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json'
        },
        api: {
            read: 'https://localhost:44342/api/customers',
            create: 'https://localhost:44342/api/customers',
            update: 'https://localhost:44342/api/customers',
            destroy: 'https://localhost:44342/api/customers'
        },
         idParam: 'CustomerId', // Specify the name of the ID parameter in the URL\
         paramAsJson: true,
        noCache: false
    },
    autoLoad: false,
    autoSync: false
});
