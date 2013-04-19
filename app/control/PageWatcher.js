(function(control, document){

    /**
     * singleton which keeps an eye on page events.
     * using the observer pattern, page-subscribers are then notify
     * assuring they are extending class PageSubscriber
     *
     * the reason behind this observer is because the initial page might not
     * notify its control for the change.
     */
    var Watcher = function(){
        var pub = {};
        var subscribers = {};
        var self = this;
        self.last_show = {};

        self.subscribed = function(s)
        {
            return subscribers[s.id] !== undefined;
        }

        self.pop = function(s)
        {
            delete subscribers[s.id];
        }

        self.push = function(s)
        {
            subscribers[s.id] = s;
        }

        pub.subscribe = function( s )
        {
            if( s.getClassName() !== "pagesubscriber" )
            {
                console.error( "@PageWatcher: object is not an instance of PageSubscriber", s );
                return;
            }
            else
            if(self.subscribed(s))
            {
                console.error( "@PageWatcher: subscriber is already registered to subscribe", s );
                return;
            }

            self.push(s);

            if( !$.isEmptyObject( self.last_show ) )
            {
                if( self.last_show.id == s.id )
                {
                    s.show( self.last_show.event, self.last_show.ui );
                }
            }
        }

        pub.unsubscribe = function( s )
        {
            if( s.getClassName() !== "pagesubscriber" )
            {
                console.error( "@PageWatcher: object is not an instance of PageSubscriber", s );
                return;
            }
            else
            if(!self.subscribed(s))
            {
                console.error( "@PageWatcher: object is not registered to unsubscribe", s );
                return;
            }

            self.pop(s);
        }

        $(document).on("pagebeforechange", function(event,ui){

            var id = event.target.getAttribute("id");

            if( subscribers[id] )
            {
                subscribers[id].beforechange( event, ui );
            }
        });

        $(document).on( "pageshow", function(event,ui){
            var id = event.target.getAttribute("id");

            self.last_show = { id:id, event:event, ui:ui };
            if( subscribers[id] )
            {
                subscribers[id].show( event, ui );
            }
        });

        $(document).on("pagehide", function(event,ui){

            var id = event.target.getAttribute("id");

            if( subscribers[id] )
            {
                subscribers[id].hide( event, ui );
            }
        });

        return pub;
    }

    control.PageWatcher = Watcher();
})(app.control, document);
