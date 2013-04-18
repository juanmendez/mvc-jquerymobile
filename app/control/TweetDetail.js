(function(app)
{
    //shortcuts
    var proxy = app.proxy.TweetProxy;
    var Subscriber = app.model.PageSubscriber, Watcher = app.control.PageWatcher;

    /**
     * TweetDetail control handles TWEET_DETAIL event from app and
     * takes care of changing the page as well as caching the id of the
     * tweet to print.
     */
	var TweetDetail = function(id)
	{
        var self = this;
        self.id = id;
        self.tweet_id = -1;

        var $page = $("#"+id);

        var sections = app.utils.PageUtils.getSections($page);

        self.detail_handler = function(event, id )
        {
           self.tweet_id = id;

            $.mobile.changePage("#pageTweetDetail");
        }

        $(app).on( app.Ev.TWEET_DETAIL, self.detail_handler );

        //upon page shown, display current tweet, otherwise notify and make home button available.
        self.showHandler = function(event,ui)
        {
            if( self.tweet_id > 0 )
            {

                var collection = proxy.collection;
                $.each( collection, function(i,objTweet){

                    if( objTweet.id === self.tweet_id )
                    {
                        var strHtml = '<p><img src="' + objTweet.profile_image_url+'">' + app.utils.TweetUtils.assignLinks(objTweet.text, true) + '</p>';
                        sections.content.html(strHtml);

                        $( sections.content.find("a")).attr('target', '_blank' );

                        return false;  //break;
                    }
                } ) ;
            }
            else
            {

                var msg = "<h3>No Tweet Found</h3>";
                msg += '<a href="#pageTweetList" data-role="button" data-mini="true">Visit Home</a>';

                sections.content.html(msg);
            }
        }

        self.hideHandler = function(event,ui )
        {
            sections.content.empty();
            self.tweet_id = -1;
        }

        Watcher.subscribe( new Subscriber({ id:self.id, show:self.showHandler, hide:self.hideHandler}) );
	};

	app.control.TweetDetail = TweetDetail;
})(app);
