/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Movie.Shop.Application',

    name: 'Movie.Shop',

    requires: [
        // This will automatically load all classes in the Movie.Shop namespace
        // so that application classes do not need to require each other.
        'Movie.Shop.*'
    ],

    // The name of the initial view to create.
    mainView: 'Movie.Shop.view.main.RentalTab'
});
