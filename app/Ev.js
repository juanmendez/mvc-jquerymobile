(function(app){

    /**
     * creating event names as contants, helps the application avoid typos
     * while trying to handle and dispatch events
     */
    var Ev = {};

    var ns = "jqmTweet";
    Ev.TWEET_NULL = ns + ".tweet_null";
    Ev.UPDATED_USER = ns + ".updated_user";
    Ev.TWEETS_READY = ns + ".proxy.tweets_ready";
    Ev.TWEETS_ERROR = ns + ".proxy.tweets_error";

    Ev.TWEET_DETAIL = ns + ".tweet_detail";

    app.Ev = Ev;

})(app);
