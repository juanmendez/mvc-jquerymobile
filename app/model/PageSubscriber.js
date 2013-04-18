(function(model){

    /**
     * provides the interface required by PageWatcher.
     * Any of its subscribers require to extend from this class
     * and substitute any of its attributes.
     *
     * @param subscriber
     * @returns {*}
     * @constructor
     */
    var PageSubscriber = function( subscriber )
    {
        var self = this;

        var pub = {};

        pub.id = "";

        pub.getClassName = function()
        {
            return "pagesubscriber";
        }

        pub.show = function( event, ui ){
            cosole.log( "pagesubscriber", event, ui );
        }

        pub.hide = function( event, ui ){
            cosole.log( "pagesubscriber", event, ui );
        }

        pub.beforechange = function(event,ui)
        {
            console.log( "pagebeforechange", event, ui );
        }

        return $.extend( pub, subscriber );
    }

    model.PageSubscriber = PageSubscriber;

})(app.model);