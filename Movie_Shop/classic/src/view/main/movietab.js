Ext.define('Movie.Shop.view.main.MovieTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'movietab',

    viewModel: {
        stores: {
            movieStore: {
                type: 'movieStore'
            }
        }
    },

    items: [{
        title: 'Movie Details',
        xtype: 'grid',
        bind: {
            store: '{movieStore}'
        },
        columns: [{
            text: 'Title',
            dataIndex: 'Title',
            flex: 1
        }, {
            text: 'Director',
            dataIndex: 'Director',
            flex: 1
        }, {
            text: 'Year',
            dataIndex: 'Year',
            flex: 1
        }],
        height: 400,
        width: '100%',
        tbar: [{
            text: 'Add Movie',
            handler: 'onAddMovie'
        }, {
            text: 'Edit Movie',
            handler: 'onUpdateMovie'
        }, {
            text: 'Delete Movie',
            handler: 'onDeleteMovie'
        }, '->', {
            xtype: 'textfield',
            fieldLabel: 'Search',
            emptyText: 'Search Movies by name...',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onSearchMovies'
            },
            reference: 'searchTextField'
        }]
    }],


    controller: {
        loadMovies: function () {
            var movieStore = this.getViewModel().getStore('movieStore');
            if (!movieStore) {
                console.error('movieStore not found in ViewModel');
                return;
            }
            movieStore.load();
        },
        onAddMovie: function() {
            var form = Ext.create('Ext.form.Panel', {
                title: 'Add Movie',
                bodyPadding: 10,
                width: 300,
                floating: true,
                closable: true,
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'Title',
                    name: 'Title'
                }, {
                    fieldLabel: 'Director',
                    name: 'Director'
                }, {
                    fieldLabel: 'Year',
                    name: 'Year',
                    xtype: 'numberfield'
                }],
                buttons: [{
                    text: 'Submit',
                    handler: 'onSubmitMovie'
                }]
            });

            form.show();
        },

        onSubmitMovie: function(button) {
            var form = button.up('form');
            var values = form.getValues();
            var movieStore = this.getViewModel().getStore('movieStore');
            if (!movieStore) {
                console.error('MovieStore not found in ViewModel');
                return;
            }

            movieStore.add(values);
            movieStore.sync({
                success: function() {
                    form.close();
                },
                failure: function() {
                    Ext.Msg.alert('Error', 'Failed to add movie');
                }
            });
        },

        onUpdateMovie: function(button) {
            var grid = this.getView().down('grid');
            var selectedRecord = grid.getSelectionModel().getSelection()[0];
        
            if (!selectedRecord) {
                Ext.Msg.alert('Error', 'Please select a Movie to update');
                return;
            }

            var form = Ext.create('Ext.form.Panel', {
                title: 'Edit Movie',
                bodyPadding: 10,
                width: 300,
                floating: true,
                closable: true,
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'Movie ID',
                    name: 'MovieId',
                    hidden: true,
                    value: selectedRecord.get('MovieId')
                },{
                    fieldLabel: 'Title',
                    name: 'Title',
                    value: selectedRecord.get('Title')
                }, {
                    fieldLabel: 'Director',
                    name: 'Director',
                    value: selectedRecord.get('Director')
                }, {
                    fieldLabel: 'Year',
                    name: 'Year',
                    xtype: 'numberfield',
                    value: selectedRecord.get('Year')
                }],
                buttons: [{
                    text: 'Update',
                    handler: function(button) {
                        var form = button.up('form');
                        var values = form.getForm().getValues();
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        if (!selectedRecord) {
                            Ext.Msg.alert('Error', 'Please select a Movie to update');
                            return;
                        }

                        // Ensure that the MovieId is properly set
                        if (!values.hasOwnProperty('MovieId')) {
                            values['MovieId'] = selectedRecord.get('MovieId');
                        }

                         // Update the record with the new values
                        selectedRecord.set(values);
                        console.log('values1',values);
                        selectedRecord.store.sync({
                            success: function(batch, options) {
                                Ext.Msg.alert('Success', 'Movie updated successfully');
                                grid.getStore().load(); // Reload grid to reflect changes
                                form.close();
                            },
                            failure: function(batch, options) {
                                Ext.Msg.alert('Error', 'Failed to update Movie');
                            }
                        });
                    }
                }]
            });

            form.show();
        },

        onDeleteMovie: function() {
            var grid = this.getView().down('grid');
            var selectedRecord = grid.getSelection()[0];

            Ext.Msg.confirm('Delete Movie', 'Are you sure you want to delete this movie?', function(btn) {
                if (btn === 'yes') {
                    var movieStore = Ext.getStore('movieStore');
                    movieStore.remove(selectedRecord);
                    movieStore.sync({
                        success: function() {
                            Ext.Msg.alert('Success', 'Movie deleted successfully');
                        },
                        failure: function() {
                            Ext.Msg.alert('Error', 'Failed to delete movie');
                        }
                    });
                }
            });
        },

        onSearchMovies: function () {
            var movieStore = this.getViewModel().getStore('movieStore');
            if (!movieStore) {
                console.error('MovieStore not found in ViewModel');
                return;
            }
            var searchText = this.lookupReference('searchTextField').getValue().toLowerCase().trim();
            movieStore.clearFilter(true);
            movieStore.filterBy(function (record) {
                var name = record.get('Title').toLowerCase();
                return name.includes(searchText);
            });

            var grid = this.getView().down('grid');
            if (movieStore.getCount() === 0) {
                grid.setEmptyText('No Movies found matching the search criteria.');
            } else {
                grid.setEmptyText(null); // Clear emptyText if there are matching customers
            }
        }
    },
    listeners: {
        afterrender: 'loadMovies'
    }
});
