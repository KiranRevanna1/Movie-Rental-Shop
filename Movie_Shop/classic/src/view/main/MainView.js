Ext.define('Movie.Shop.view.main.MainView', {
    extend: 'Ext.container.Viewport', // Extending from Viewport for full-screen layout
    
    xtype: 'app-mainview',

    layout: 'fit', // Fit layout to take up the entire viewport

    items: [{
        xtype: 'tabpanel', // Using tab panel component
        tabBarPosition: 'top', // Positioning the tab bar at the top
        items: [{
            xtype: 'customertab' // Adding Customer Tab component
        }, {
            xtype: 'movietab' // Adding Movie Tab component
        }, {
            xtype: 'rentaltab' // Adding Rental Tab component
        }]
    }]
});
