define(function (require) {

    var $         = require('jquery'),
        Backbone  = require('backbone');

    return Backbone.Model.extend({

        /* soundcloud track model
         * a sampling of the track fields returned by the soundcloud api
         ---------------------------------------------------------------- */

        defaults:  {
            artwork_url:    '',
            id:             '',
            title:          '',
            waveform_url:   '',
            user: {
                avatar_url:'',
                username:  ''
            }
        }

    });

});