Ext.define('Movie.Shop.view.main.CustomerTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'customertab',

    viewModel: {
        stores: {
            customerStore: {
                type: 'customerStore'
            }
        }
    },

    items: [{
        title: 'Customer Details',
        xtype: 'grid',
        bind: {
            store: '{customerStore}'
        },
        columns: [{
            text: 'Name',
            dataIndex: 'Name'
        }, {
            text: 'Email',
            dataIndex: 'Email',
            
        }],
        height: 400,
        width: '100%',
        tbar: [{
            text: 'Add Customer',
            handler: 'onAddCustomer'
        }, {
            text: 'Edit Customer',
            handler: 'onUpdateCustomer'
        }, {
            text: 'Delete Customer',
            handler: 'onDeleteCustomer'
        }, '->', {
            xtype: 'textfield',
            fieldLabel: 'Search',
            emptyText: 'Search customers by name...',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onSearchCustomers'
            },
            reference: 'searchTextField'
        }]
    }],

    controller: {
        loadCustomers: function () {
            var customerStore = this.getViewModel().getStore('customerStore');
            if (!customerStore) {
                console.error('CustomerStore not found in ViewModel');
                return;
            }
            customerStore.load();
        },
        onAddCustomer: function () {
            var form = Ext.create('Ext.form.Panel', {
                title: 'Add Customer',
                bodyPadding: 10,
                width: 300,
                floating: true,
                closable: true,
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'Name',
                    name: 'Name'
                }, {
                    fieldLabel: 'Email',
                    name: 'Email'
                }],
                buttons: [{
                    text: 'Submit',
                    handler: 'onSubmit'
                }]
            });

            form.show();
        },
        onSubmit: function (button) {
            var form = button.up('form');
            var values = form.getValues();
            var customerStore = this.getViewModel().getStore('customerStore');
            if (!customerStore) {
                console.error('CustomerStore not found in ViewModel');
                return;
            }

            customerStore.add(values);
            customerStore.sync({
                success: function () {
                    form.close();
                },
                failure: function () {
                    Ext.Msg.alert('Error', 'Failed to add customer');
                }
            });
        },
        onUpdateCustomer: function(button) {
            var grid = this.getView().down('grid');
            var selectedRecord = grid.getSelectionModel().getSelection()[0];
        
            if (!selectedRecord) {
                Ext.Msg.alert('Error', 'Please select a customer to update');
                return;
            }
        
            var form = Ext.create('Ext.form.Panel', {
                title: 'Edit Customer',
                bodyPadding: 10,
                width: 300,
                floating: true,
                closable: true,
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'Customer ID',
                    name: 'CustomerId',
                    hidden: true,
                    value: selectedRecord.get('CustomerId')
                }, {
                    fieldLabel: 'Name',
                    name: 'Name',
                    value: selectedRecord.get('Name')
                }, {
                    fieldLabel: 'Email',
                    name: 'Email',
                    value: selectedRecord.get('Email')
                }],
                buttons: [{
                    text: 'Update',
                    handler: function(button) {
                        var form = button.up('form');
                        var values = form.getForm().getValues(); // Get form values
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        if (!selectedRecord) {
                            Ext.Msg.alert('Error', 'Please select a customer to update');
                            return;
                        }
        
                        // Ensure that the CustomerId is properly set
                        if (!values.hasOwnProperty('CustomerId')) {
                            values['CustomerId'] = selectedRecord.get('CustomerId');
                        }
        
                        // Update the record with the new values
                        selectedRecord.set(values);
                        console.log('values1',values);
                        // Sync changes with the backend API
                        selectedRecord.store.sync({
                            success: function(batch, options) {
                                Ext.Msg.alert('Success', 'Customer updated successfully');
                                grid.getStore().load(); // Reload grid to reflect changes
                                form.close();
                            },
                            failure: function(batch, options) {
                                Ext.Msg.alert('Error', 'Failed to update customer');
                            }
                        });
                    }
                }]
            });
        
            form.show();
        },        

        onDeleteCustomer: function() {
            var grid = this.getView().down('grid');
            var selectedRecord = grid.getSelection()[0];

            Ext.Msg.confirm('Delete Customer', 'Are you sure you want to delete this customer?', function(btn) {
                if (btn === 'yes') {
                    var customerStore = Ext.getStore('customerStore');
                    customerStore.remove(selectedRecord);
                    customerStore.sync({
                        success: function() {
                            Ext.Msg.alert('Success', 'Customer deleted successfully');
                        },
                        failure: function() {
                            Ext.Msg.alert('Error', 'Failed to delete customer');
                        }
                    });
                }
            });
        },
        
        onSearchCustomers: function () {
            var customerStore = this.getViewModel().getStore('customerStore');
            if (!customerStore) {
                console.error('CustomerStore not found in ViewModel');
                return;
            }
            var searchText = this.lookupReference('searchTextField').getValue().toLowerCase().trim();
            customerStore.clearFilter(true);
            customerStore.filterBy(function (record) {
                var name = record.get('Name').toLowerCase();
                return name.includes(searchText);
            });

            var grid = this.getView().down('grid');
            if (customerStore.getCount() === 0) {
                grid.setEmptyText('No customers found matching the search criteria.');
            } else {
                grid.setEmptyText(null); // Clear emptyText if there are matching customers
            }
        }
    },

    listeners: {
        afterrender: 'loadCustomers'
    }
});
