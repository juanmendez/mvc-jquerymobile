(function(proxy){
	var TweetProxy = function(){
		var self = this;

        var TWEET_PATH = "http://search.twitter.com/search.json?callback=?&rpp=";
		var pub = {collection:[]};
		
		pub.getTweets = function( user )
		{
			var strUrl = TWEET_PATH + user.getRPP() + "&q=from:" + user.getName();
	  
			  // Get the tweets and append them to the list
			  $.ajax({
			    url: strUrl,
			    dataType: 'json',
			    success: function(data) {

                    pub.collection = data.results;
					$(pub).trigger( app.Ev.TWEETS_READY, {collection:data.results} );
			    },
				error: function() { 
				 	$(pub).trigger(app.Ev.TWEETS_ERROR);
			    }
			  });
		}
		
		return pub;
	};
	
	proxy.TweetProxy = TweetProxy();
})(app.proxy);
