/* github.com/andrewbaldock/skylabfm */
define(["jquery", "json2", "backbone", "app/df_auth"], function($,Backbone,df_auth) {
  aB.fn.Songs = function() {
  	require(['backbone','app/df_auth'], function (Backbone, df_auth) {
  	
			//////////////////////////
			// 
			//  0. AJAX
			// 
			//////////////////////////
  		$.ajaxSetup({ headers: { 
  			'X-DreamFactory-Session-Token':aB.sessionId, 
  			'X-DreamFactory-Application-Name':'skylabfm'
  		}});
  		
			//////////////////////////
			// 
			//  1. MODEL
			// 
			//////////////////////////
			aB.Song = Backbone.Model.extend({
				defaults: {
					userid:aB.userid
				},
				// urlRoot: aB.baseurl + "/db/searches"
				// above not working, fix is: github.com/jashkenas/backbone/issues/789
				url: function() {
        			return  aB.baseurl + "/db/songs" + (this.has("id") ? "/" + this.get("id") : "");
    			}
			});
			
			//////////////////////////
			// 
			//  2. COLLECTION
			// 
			//////////////////////////
			var SongCollection = Backbone.Collection.extend({
				model: aB.Song,
				url: aB.baseurl + "/db/songs?filter=userid%3D'" + aB.userid + "'&fields=id,songId,rating",
				parse: function(resp) {
						console.log('pre-parse: "resp.record":');
						console.log(resp.record);
						return resp.record;
				} 
			});
			

	
			//////////////////////////
			// 
			//  4. START
			// 
			//////////////////////////
			$('#spinner').show('fastest');
			if(typeof aB.searchCollection == 'undefined') {
				aB.searchCollection = new SearchCollection();
			} else {
				//searchcollection exixsts.  refresh its url in case user is logged in
				if(aB.userid != 'none') {
					aB.searchCollection.url = aB.baseurl + "/db/searches?filter=userid%3D'" + aB.userid + "'&fields=id,query";
				}
			};

			aB.addTempsToUserCollection = function() {
				if(aB.tempUserSearches && aB.usertype !== 'temp') {
					var loggedInUserSearches = aB.searchView.toArray();
					_.each(aB.tempUserSearches, function (query) {
						if($.inArray(query, loggedInUserSearches) == -1){
						     aB.searchView.saveModel(query);
						}
		            });
		            aB.tempUserSearches = null;
				}
			}

			aB.loadSearches = function(){
				aB.searchCollection.fetch({
					success: function() {
						console.log('backbone got ' + aB.searchCollection.length + ' search records');
						if(typeof aB.searchView == 'undefined') {
							aB.searchView = new SearchView({collection: aB.searchCollection});
							
						} 
						//push new results into existing collectionview
						aB.searchView.render();
						aB.searchView.showAll();
						aB.addTempsToUserCollection();
					
					},
					error: function() {
							console.log('backbone collection activated: oh noes fetch fail');
					}
				}); 
				$('#spinner').hide('fastest');
			}
			aB.loadSearches();
			
    }) // end require	
  };  // end aB.fn.Searches
});  // end define
