(function( app )
{
	var user = app.model.User, proxy = app.proxy.TweetProxy;
    var Subscriber = app.model.PageSubscriber, Watcher = app.control.PageWatcher;

    /**
     * TweetList controls pageTweetList page.
     * It listens for User object to have changes and
     * for the next time its page shows, refresh tweets.
     *
     * @param id
     * @constructor
     */
	var TweetList = function( id )
	{
        var self = this;
        self.id = id;

		var $page = $("#"+id);

        var sections = app.utils.PageUtils.getSections($page);
		self.boolUpdate = true;

        var messenger = sections.content.find( "#listmessenger");

        /**
         * once tweets arrive, go on and display them.
         * @param event
         * @param data
         */
		self.proxy_handler = function( event, data ){

            //noinspection JSUnresolvedFunction
            var $list = sections.content.find("ul");

            var collection = data.collection;
      		var len = collection.length;

            $list.empty();

          if (len === 0)
          {
            // Update the list $page to reflect that no tweets were found
            messenger.html("<h3>No Tweets Found for " + user.getName() +" </h3>");

            // and we're done.
            return;
		  }
		  else
		  {
            var html = '';
            var tweet = {};

		  	for (var i = 0; i < len; i++) {

                tweet = collection[i];

		        // Build HTML that contains the desired information
		        var strHtml = '<li><a href="#" data-twt-id="'+ tweet.id + '">';
		        strHtml += '<img src="'+ tweet.profile_image_url+'">';
		        strHtml += tweet.text;
		        strHtml += '</a></li>\n';

		        html += strHtml;
		  	}

		  	$list.append( html );
		  	$list.listview("refresh");

		  }
		  
		  // Hide the $page loading dialog
		  $.mobile.hidePageLoadingMsg();
		}
		$(proxy).on(app.Ev.TWEETS_READY, self.proxy_handler );

		/**
		 * user changes, determine a refresh in
		 * the listing.
		 */
		self.user_handler = function(event, data ){
			
			self.boolUpdate = true;
            console.log( "changes to user", data );
		}
		$(user).on(app.Ev.UPDATED_USER, self.user_handler );


		self.list_handler = function(event)
		{
			var target = $(event.target);
            var id = target.jqmData("twt-id");

            if( id !== undefined )
            {
                $(app).trigger(app.Ev.TWEET_DETAIL, id );
            }
		}

		self.turn_listhandler = function( is_on )
		{
			var $list = sections.content.find("ul");

			if( is_on )
			{
				$list.on( "tap", self.list_handler );
			}
			else
			{
				$list.off( "tap", self.list_handler );
			}
		}


        //upon page shown, turn on element listeners
        //check if page requires a refresh of its content
       self.showHandler = function(event,ui)
       {
           if( self.boolUpdate )
           {
               $.mobile.showPageLoadingMsg();
               proxy.getTweets( user );
           }

           self.turn_listhandler(true);
       }

       //upon page hidden, turn off element listeners
       self.hideHandler = function(event,ui )
       {
           self.boolUpdate = false;
           self.turn_listhandler(false);
           messenger.html('');
       }

       Watcher.subscribe( new Subscriber({ id:self.id, show:self.showHandler, hide:self.hideHandler}) );
	};

	app.control.TweetList = TweetList;
})(app);