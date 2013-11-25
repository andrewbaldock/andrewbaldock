define(function (require) {

    var $         = require('jquery'),
        Backbone  = require('backbone');

    return Backbone.Model.extend({

        initialize: function () {
            this.getDreamFactoryToken();
        },

        defaults: function() {
            return {
                baseurl:   'https://dsp-skylabfm-demo.cloud.dreamfactory.com/rest',
                apikey:    '?app_name=skylabfm-demo',
                sessionId: ''
            };
        },

        getDreamFactoryToken: function () {
            var me = this; // so we can pass in the scope
            $('#spinner').show();
            
            $.ajax({
                type: "POST",
                url: this.get('baseurl') + '/user/session' + this.get('apikey'),
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({email:'andrewbaldock@yahoo.com',password:'p4ssw0rd'}),

                success: function (response) {
                    console.log("dreamfactory: authenticated");
                    me.set({sessionId:response.session_id});
                    me.trigger("dreamfactory: authenticated", me);
                },
                
                error: function (response, textStatus, xError) {
                    console.log(response.responseText);
                    $('#spinner').hide();
                }
                
            });
        }

    });

});