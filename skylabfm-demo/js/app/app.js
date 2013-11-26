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
        SavedSearches   = require('app/df-search-collection'),
        SavedSearchView = require('app/df-search-view');

    return Backbone.View.extend({

        trackList: [],
        sc_options: '&show_artwork=true&auto_play=true&show_comments=true&enable_api=true&sharing=true&color=00BCD3',

        el: '#main',

        events: {
            'submit form': 'doSearch',
            'click .track': 'clickTrack'
        },

        initialize: function () {
            $('#offline').remove();
            this.spinner = new Spinner();

            this.dfAuth = new DfAuth();
            this.listenTo(this.dfAuth, 'dreamfactory: authenticated', this.initSearch);

            this.collection = new TrackCollection();
            this.listenTo(this.collection, 'reset', this.showTracks);
        }, 

        initSearch: function (authmodel) {
            console.log("dreamfactory: authenticated");
            this.stopListening(this.dfAuth, 'dreamfactory: authenticated');
            this.auth = authmodel.attributes;
            $('#spinner').hide();
            $('#thequery').fadeIn();
            this.savedsearchview = new SavedSearchView(authmodel.attributes);
            this.savedsearchview.render();
        },

        doSearch: function (event) {
            $('#spinner').show();
            this.clearTracks();
            this.collection.search(event.target[0].value);
            this.savedsearchview.saveSearch(event.target[0].value);
        },

        showTracks: function(event) {
            var $listEl = $('#results', this.el);
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
            $('.track').removeClass('isPlaying');
            var trackid = event.currentTarget.dataset.trackid;   // 'dataset'?  http://api.jquery.com/data/
            var url     = 'http://api.soundcloud.com/tracks/' + trackid;
            var iframe  = document.querySelector('#widget');
            iframe.src  = 'https://w.soundcloud.com/player/?url=' + url + this.sc_options;  

            var TODO    = SC.Widget(iframe);  // with SC.Widget we can listen to when the iframe says the song is done
            this.trackmodel = this.collection.get({id:trackid});

            // TODO: model should supply right artwork if no images
            $('html').css('background-image', "url('" + this.trackmodel.get('artwork_url') + "')").css('background-size','34%');
            this.$('#player-wrapper').fadeIn();
            this.$('.track.'+trackid).addClass('isPlaying');
        }

    }); 

});
