define(function (require) {

    var $               = require('jquery'),
        _               = require('underscore'),
        Backbone        = require('backbone'),
        Player          = require('player'),
        DfAuth          = require('app/df-auth-model'),
        JSON2           = require('json2'),
        Spinner         = require('app/spinner-view'),
        Soundcloud      = require('soundcloud'),
        Track           = require('app/sc-track-model'),
        TrackCollection = require('app/sc-track-collection'),
        TrackView       = require('app/sc-track-view'),
        SavedSearches   = require('app/df-search-collection');

    return Backbone.View.extend({

        trackList: [],

        el: '#main',

        events: {
            'submit form': 'startSearch',
            'click .track': 'clickTrack'
        },

        initialize: function () {
            this.spinner = new Spinner();

            this.dfAuth = new DfAuth();
            this.dfAuth.on('dreamfactory: authenticated', this.initSearch);

            this.collection = new TrackCollection();
            this.listenTo(this.collection, 'reset', this.showTracks);
        }, 

        startSearch: function (event) {
            $('#thequery').hide();
            $('#spinner').show();
            this.collection.search(event.target[0].value);
        },

        initSearch: function (authmodel) {
            $('#spinner').hide();
            $('#thequery').fadeIn();
            this.savedSearches = new SavedSearches({auth:authmodel});
        },

        showTracks: function(event) {
            $('#thequery').fadeIn();
            var $listEl = $('#results', this.el);
            this.clearTracks();
            _.each(this.collection.models, function (track) {
                var trackView = new TrackView({model: track}).render();
                this.trackList.push(trackView);
                $listEl.append(trackView.el);
            }, this);
            $listEl.css('display','inline-block'); // inline-block centering, instead of show()
            $('#spinner').hide();
        },

        clearTracks: function() {
            _.each(this.trackList, function(item){
                item.remove();
            });
            this.trackList = [];
        },

        clickTrack: function (event) {
            var trackid = event.currentTarget.dataset.trackid;
            this.trackmodel = this.collection.get({id:trackid});
            var url = 'http://api.soundcloud.com/tracks/' + trackid;
            var sc_options = '&show_artwork=true&auto_play=true&show_comments=true&enable_api=true&sharing=true&color=00BCD3'
              
            var iframe = document.querySelector('#widget');
            iframe.src = 'https://w.soundcloud.com/player/?url=' + url + sc_options;    
            var nerp = SC.Widget(iframe);  
            this.$('#player-wrapper').fadeIn();
            if (this.trackmodel.get('artwork_url'))
              var bg = "url('" + this.trackmodel.get('artwork_url') + "')";
                
            $('html').css('background-image', bg).css('background-size','34%')//.css('background-repeat','no-repeat');

        }

    }); 

});
