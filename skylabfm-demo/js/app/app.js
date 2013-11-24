define(function (require) {

    var $               = require('jquery'),
        _               = require('underscore'),
        Backbone        = require('backbone'),
        Player          = require('player'),
        DfAuth          = require('app/df-auth-model'),
        JSON2           = require('json2'),
        Spinner         = require('spin'),
        Soundcloud      = require('soundcloud'),
        Track           = require('app/sc-track-model'),
        TrackCollection = require('app/sc-track-collection');

    return Backbone.View.extend({

        el: '#main',

        events: {
            'submit form': 'startSearch'
        },

        initialize: function () {
            this.initSpinner();

            this.dfAuth = new DfAuth();
            this.dfAuth.getDreamFactoryToken();
            this.dfAuth.on('dreamfactory: authenticated', this.render);

            this.collection = new TrackCollection();
            this.collection.initialize();
            this.listenTo(this.collection, 'reset', this.showSearch)
        }, 

        render: function () {
            this.showSearch();
        },

        startSearch: function (event) {
            $('#thequery').hide();
            $('#spinner').show();
            this.collection.search(event.target[0].value);
        },

        showSearch: function (event) {
            $('#spinner').hide();
            $('#thequery').fadeIn();
            console.log(this.collection);            
        },

        initSpinner: function () {
            var opts = {
              lines: 20, // The number of lines to draw
              length: 5, // The length of each line
              width: 16, // The line thickness
              radius: 25, // The radius of the inner circle
              corners: 1, // Corner roundness (0..1)
              rotate: 0, // The rotation offset
              direction: 1, // 1: clockwise, -1: counterclockwise
              color: '#16A5CE', // #rgb or #rrggbb or array of colors
              speed: 0.8, // Rounds per second
              trail: 30, // Afterglow percentage
              shadow: false, // Whether to render a shadow
              hwaccel: false, // Whether to use hardware acceleration
              className: 'spinner', // The CSS class to assign to the spinner
              zIndex: 2e9, // The z-index (defaults to 2000000000)
              top: 'auto', // Top position relative to parent in px
              left: 'auto' // Left position relative to parent in px
            };
            var target = document.getElementById('spinner');
            var spinner = new Spinner(opts).spin(target);
        },

    }); 

});
