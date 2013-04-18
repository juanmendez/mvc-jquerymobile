(function(utils){

    var TweetUtils = {};

    /**
     * Taken from the course in the link below, the regex expressions update the text content
     * to display links for urls, tweet users, and trends
     * @see jQuery Mobile by Ray Villalobos http://www.lynda.com/jQuery-tutorials/jQuery-Mobile-Web-Applications/104967-2.html
     * @param text
     * @returns {String}
     */
    TweetUtils.assignLinks = function( text )
    {
        text=text.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(i) {
            var url=i.link(i);
            return url;
        });

        text=text.replace(/[@]+[A-Za-z0-9-_]+/g, function(i) {
            var item = i.replace("@",'');
            var	url = i.link("http://twitter.com/"+ item);
            return url;
        });

        text=text.replace(/[#]+[A-Za-z0-9-_]+/g, function(i) {
            var item = i.replace("#", '%23');
            var url = i.link("http://search.twitter.com/search?q="+item);
            return url;
        });


        return text;
    }

    app.utils.TweetUtils = TweetUtils;
})(app.utils);