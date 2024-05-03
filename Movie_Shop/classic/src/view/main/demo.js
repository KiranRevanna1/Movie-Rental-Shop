Ext.define('Movie.Shop.view.main.demo',{
    extend: 'Ext.tab.Panel',
    xtype: 'demo',
    items: [
        {
            title: 'Movie Details',
        columns: [
            { text: 'Movie ID', dataIndex: 'MovieId' },
            { text: 'Title', dataIndex: 'Title' },
            { text: 'Genre', dataIndex: 'Genre' },
            { text: 'Release Year', dataIndex: 'ReleaseYear' },
            { text: 'Rental Rate', dataIndex: 'RentalRate' },
            { text: 'Availability Status', dataIndex: 'AvailabilityStatus' }
        ],
        }
    ]
})
// Ext.define('Movie.Shop.view.main.demo', {
//     extend: 'Ext.tab.Panel',

//     title: 'Movie Details',
//     columns: [
//         { text: 'Movie ID', dataIndex: 'MovieId' },
//         { text: 'Title', dataIndex: 'Title' },
//         { text: 'Genre', dataIndex: 'Genre' },
//         { text: 'Release Year', dataIndex: 'ReleaseYear' },
//         { text: 'Rental Rate', dataIndex: 'RentalRate' },
//         { text: 'Availability Status', dataIndex: 'AvailabilityStatus' }
//     ],

//     // listeners: {
//     //     afterrender: 'loadMovies' // Call loadMovies function after the view is rendered
//     // },

//     // tbar: {
//     //     layout: {
//     //         type: 'hbox',
//     //         pack: 'end' // Align items to the end (right side)
//     //     },
//     //     items: [{
//     //         xtype: 'button',
//     //         text: 'Add New Movie',
//     //         handler: 'onAddNewMovie', // Define a handler function for the button click event
//     //         style: {
//     //             backgroundColor: 'rgba(173, 216, 230, 0.8)' ,// Set text color to white
//     //             color: 'white'
//     //         }
//     //     }]
//     // }
// });