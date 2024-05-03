/**
 * This view is an example list of people.
 */
Ext.define('Movie.Shop.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'Movie.Shop.store.CustomerStore'
    ],

    title: 'CustomerStore',

    store: {
        type: 'CustomerStore'
    },

    columns: [
        { text: 'Name',  dataIndex: 'name' },
        { text: 'Email', dataIndex: 'email', flex: 1 },
        { text: 'Phone', dataIndex: 'phone', flex: 1 }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
