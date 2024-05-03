// MovieModel.js
Ext.define('Movie.Shop.model.MovieModel', {
    extend: 'Movie.Shop.model.Base',

    fields: [
        { name: 'MovieId', type: 'int' },
        { name : 'id',mapping:'MovieId',type: 'int' },
        { name: 'Title', type: 'string' },
        { name: 'Director', type: 'string' },
        { name: 'Year', type: 'int' }
        // Add more fields as needed
    ],
    idproperty: 'id',
});
