Ext.define('Movie.Shop.view.main.RentalTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'rentaltab',

    viewModel: {
        stores: {
            rentalStore: {
                type: 'rentalStore'
            }
        }
    },

    items: [{
        title: 'Rental Details',
        xtype: 'grid',
        bind: {
            store: '{rentalStore}'
        },
        columns: [{
            text: 'Customer Name',
            dataIndex: 'CustomerName'
        }, {
            text: 'Movie Name',
            dataIndex: 'MovieTitle'
        }, {
            text: 'Rental Date',
            dataIndex: 'rentalDate'
        }, {
            text: 'Return Date',
            dataIndex: 'returnDate',
            flex: 1
        }],
        height: 400,
        width: '100%',
        tbar: [{
            text: 'Add Rental',
            handler: 'onAddRental'
        }, {
            text: 'Update Return Date',
            handler: 'onUpdateReturnDate'
        }, '->', {
            xtype: 'textfield',
            fieldLabel: 'Search',
            emptyText: 'Search Rentals by name...',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onSearchRentals'
            },
            reference: 'searchTextField'
        }]
    }],
    controller: {
        loadRentals: function () {
            var rentalStore = this.getViewModel().getStore('rentalStore');
            if (!rentalStore) {
                console.error('RentalStore not found in ViewModel');
                return;
            }
            rentalStore.load();
        },
        onAddRental: function() {
            // Create a form panel for adding a rental
            var form = Ext.create('Ext.form.Panel', {
                title: 'Add Rental',
                bodyPadding: 10,
                width: 300,
                floating: true, // Display as a floating panel
                closable: true, // Allow closing the panel
                defaultType: 'textfield',
                items: [{
                    xtype: 'combo',
                    fieldLabel: 'Customer Name',
                    name: 'customerId',
                    store: 'CustomerStore', // Use the customer store for data
                    queryMode: 'local',
                    displayField: 'Name', // Display customer names
                    valueField: 'CustomerId', // Store customer IDs
                    allowBlank: false
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Movie',
                    name: 'movieId',
                    store: 'MovieStore', // Use the movie store for data
                    queryMode: 'local',
                    displayField: 'Title', // Display movie titles
                    valueField: 'MovieId', // Store movie IDs
                    allowBlank: false
                }, {
                    xtype: 'datefield',
                    fieldLabel: 'Rental Date',
                    name: 'rentalDate',
                    format: 'Y-m-d', // Date format
                    allowBlank: false
                }],
                buttons: [{
                    text: 'Submit',
                    handler: 'onSubmitRental'
                }]
            });
        
            // Show the form
            form.show();
        },  
        onSubmitRental: function (button) {
            var form = button.up('form');
            var values = form.getValues();
            var rentalStore = this.getViewModel().getStore('rentalStore');
            if (!rentalStore) {
                console.error('RentalStore not found in ViewModel');
                return;
            }

            rentalStore.add(values);
            rentalStore.sync({
                success: function () {
                    form.close();
                },
                failure: function () {
                    Ext.Msg.alert('Error', 'Failed to add rental');
                }
            });
        },      

        onUpdateReturnDate: function(button) {
            var grid = this.getView().down('grid');
            var selectedRecord = grid.getSelectionModel().getSelection()[0];
        
            if (!selectedRecord) {
                Ext.Msg.alert('Error', 'Please select a Rental to update');
                return;
            }

            var form = Ext.create('Ext.form.Panel', {
                title: 'Update Return Date',
                bodyPadding: 10,
                width: 300,
                floating: true,
                closable: true,
                defaultType: 'datefield',
                items: [{
                    fieldLabel: 'Rental ID',
                    name: 'RentalId',
                    hidden: true,
                    value: selectedRecord.get('RentalId')
                },{
                    fieldLabel: 'Customer ID',
                    name: 'CustomerId',
                    hidden: true,
                    value: selectedRecord.get('CustomerId')
                },{
                    fieldLabel: 'Movie ID',
                    name: 'MoveiId',
                    hidden: true,
                    value: selectedRecord.get('MovieId')
                },{
                    fieldLabel: 'Rental Date',
                    name: 'RentalDate',
                    hidden: true,
                    value: selectedRecord.get('RentalDate')
                },{
                    fieldLabel: 'Return Date',
                    name: 'ReturnDate',
                    value: new Date() // Set initial value to current date
                }],
                buttons: [{
                    text: 'Update',
                    handler: function(button) {
                        var form = button.up('form');
                        var values = form.getForm().getValues();
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        if (!selectedRecord) {
                            Ext.Msg.alert('Error', 'Please select a rental to update');
                            return;
                        }

                        // Ensure that the CustomerId is properly set
                        if (!values.hasOwnProperty('RentalId')) {
                            values['RentalId'] = selectedRecord.get('RentalId');
                        }
        
                        // Update the record with the new values
                        selectedRecord.set(values);
                        console.log('values1',values);
                        // Sync changes with the backend API
                        selectedRecord.store.sync({
                            success: function(batch, options) {
                                Ext.Msg.alert('Success', 'Rental updated successfully');
                                grid.getStore().load(); // Reload grid to reflect changes
                                form.close();
                            },
                            failure: function(batch, options) {
                                Ext.Msg.alert('Error', 'Failed to update rental');
                            }
                        });
                    }
                }]
            });

            form.show();
        },
        
        onDeleteRental: function() {
            var grid = this.getView().down('grid');
            var selectedRecord = grid.getSelection()[0];

            Ext.Msg.confirm('Delete Rental', 'Are you sure you want to delete this rental?', function(btn) {
                if (btn === 'yes') {
                    var rentalStore = Ext.getStore('RentalStore');
                    rentalStore.remove(selectedRecord); // Remove rental record from the store
                    rentalStore.sync({
                        success: function() {
                            Ext.Msg.alert('Success', 'Rental deleted successfully');
                        },
                        failure: function() {
                            Ext.Msg.alert('Error', 'Failed to delete rental');
                        }
                    });
                }
            });
        },
        onSearchCustomers: function () {
            var rentalStore = this.getViewModel().getStore('rentalStore');
            if (!rentalStore) {
                console.error('RentalStore not found in ViewModel');
                return;
            }
            var searchText = this.lookupReference('searchTextField').getValue().toLowerCase().trim();
            rentalStore.clearFilter(true);
            rentalStore.filterBy(function (record) {
                var name = record.get('MovieId').toLowerCase();
                return name.includes(searchText);
            });

            var grid = this.getView().down('grid');
            if (customerStore.getCount() === 0) {
                grid.setEmptyText('No rentals found matching the search criteria.');
            } else {
                grid.setEmptyText(null); // Clear emptyText if there are matching customers
            }
        }
    },
    listeners: {
        afterrender: 'loadRentals'
    }
});
