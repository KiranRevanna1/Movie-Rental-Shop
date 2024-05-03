// MovieStore.js
Ext.define('Movie.Shop.store.MovieStore', {
    extend: 'Ext.data.Store',
    alias: 'store.movieStore',
    model: 'Movie.Shop.model.MovieModel',
    storeId: 'movieStore',
    proxy: {
        type: 'rest',
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json'
        },
        api: {
            read: 'https://localhost:44342/api/movies',
            create: 'https://localhost:44342/api/movies',
            update: 'https://localhost:44342/api/movies',
            destroy: 'https://localhost:44342/api/movies'
        },
        idParam: 'MovieId', // Specify the name of the ID parameter in the URL\
        paramAsJson: true,
        noCache: false
    },
    autoLoad: false,
    autoSync : false,
});
