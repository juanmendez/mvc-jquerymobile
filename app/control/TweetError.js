(function(app)
{
	var user = app.model.User, proxy = app.proxy.TweetProxy;
    var Subscriber = app.model.PageSubscriber, Watcher = app.control.PageWatcher;


	var TweetError = function(id)
	{
        var pub = {}; //return public object upon instantiation

        var self = this;
        self.id = id;

        var $page = $("#"+id);
		var sections = app.utils.PageUtils.getSections($page);
		
		self.errorMsg = "";


        /**
         * listens for proxy's event and detects if it needs to display
         * a dialog which tells the user there are no tweets under username.
         * @param event
         * @param data
         */
		self.proxy_handler = function( event, data ){
      		var sections = app.utils.PageUtils.getSections($page);
			
			if (data.collection.length === 0)
			{
	  			// display an error message in the error dialog
			  	self.errorMsg = "<h3>No Tweets Found</h3>";
				self.errorMsg += "<p>No tweets found for the Twitter user name " + user.getName() + ".</p>";
				
				//http://goo.gl/Y8hTd
				$("#show-error-page").click();
			}
		}
		$(proxy).on(app.Ev.TWEETS_READY, self.proxy_handler );

        self.showHandler = function(event,ui)
        {
            sections.content.html( self.errorMsg );
        }

        //clean message, and content
        self.hideHandler = function(event,ui )
        {
            self.errorMsg = "";
            sections.content.html('');
        }

        Watcher.subscribe( new Subscriber({ id:self.id, show:self.showHandler, hide:self.hideHandler}) );
	};

	app.control.TweetError = TweetError;
})(app);
