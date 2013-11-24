/* github.com/andrewbaldock/skylabfm */

define(["jquery", "json2"], function($) {
  aB.fn.df_auth = function() {
  
  		var baseurl = "https://dsp-skylabfm.cloud.dreamfactory.com/rest";
  		var apikey = '?app_name=skylabfm';
  		
			// LOGIN
      // authenticate dreamfactory.com cloud app backend with system user

      $('#spinner').show('fastest');

      $.ajax({
        type: "POST",
        url: baseurl + '/user/session' + apikey,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({email:'andrewbaldock@yahoo.com',password:'skyl4bfm'}),

        success: function (response) {
        		console.log("got dreamfactory token");
        		aB.sessionId = response.session_id;	
        		aB.fn.Searches();
        },
        
        error: function (response, textStatus, xError) {
            $('#spinner').hide('fastest');
            console.log(response.responseText);
        } 
        
    	});
    
    
  };
});
