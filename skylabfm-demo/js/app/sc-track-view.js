define(function (require) {

    "use strict";

    var $             = require('jquery'),
        _             = require('underscore'),
        Backbone      = require('backbone'),
        tpl           = require('text!tpl/Track.html'),
        template      = _.template(tpl);

    return Backbone.View.extend({


        tagName: "div",

        events: {
            "click":                        "handleClick"
        },

        initialize: function () {
            /*
            this.listenTo(this.model,"change", this.render);
            this.listenTo(this.model,"destroy", this.remove); */
        },

        render: function () {
            this.$el.html(template(this));
            console.log('yup');
            return this;
        },

        handleRowClick: function(event){
            if (event.target.hasAttribute("href") && event.target.href.indexOf("#remove-service") != -1){
                // this is more then likely the "delete" path. let the other handler deal with this
            } else {
                event.preventDefault();
            /*    if(this.adminMode) {
                    if(this.model.get('modelType') === 'autoattendant') {
                        var aaID = this.model.id - this.idmod; 
                        Backbone.history.navigate('edit-autoattendant/' + aaID,true);
                    } else {
                        Backbone.history.navigate('edit-user/' + this.model.id,true);
                    }
                }*/
            } 
        }

    });

});