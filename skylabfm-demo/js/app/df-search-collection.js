define(function (require) {

    var $        = require('jquery'),
        _        = require('underscore'),
        Backbone = require('backbone'),
        DfAuth   = require('app/df-auth-model');

    return Backbone.Collection.extend({

        initialize: function (authmodel) {
            var sessionId = authmodel.auth.attributes.sessionId;

            $.ajaxSetup({ headers: { 
                'X-DreamFactory-Session-Token': sessionId, 
                'X-DreamFactory-Application-Name': 'skylabfm-demo'
            }});

            this.model = Backbone.Model.extend({
                defaults: {
                    userid: 'test'
                },
                // urlRoot: aB.baseurl + "/db/searches"
                // above not working, fix is: github.com/jashkenas/backbone/issues/789
                url: function() {
                    return  aB.baseurl + "/db/searches" + (this.has("id") ? "/" + this.get("id") : "");
                }
            });
        }

    });


});

