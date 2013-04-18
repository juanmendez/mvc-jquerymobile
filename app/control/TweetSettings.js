(function(app)
{
    var user = app.model.User;
    var Subscriber = app.model.PageSubscriber, Watcher = app.control.PageWatcher;

    var TweetSettings = function(id)
    {
        var self = this;
        self.id = id;

        var $page = $("#"+self.id);
        var $username = $($page.find("#username")[0]);
        var $slider = $($page.find("#slider")[0]);

        self.updateName = function(){

            user.setName( $username.val() );
        }

        self.updateRPP = function(){

            user.setRPP( $slider.val() );
        }

        self.init = function(){

            $username.val(user.getName());

            $slider = $($page.find("#slider")[0]);
            $slider.val(user.getRPP()).slider("refresh");
        }


        //upon page shown, turn on element listeners and refresh element content
        self.showHandler = function(event,ui)
        {
            self.init();
            $username.on( "change", self.updateName );
            $slider.on( "slidestop", self.updateRPP  );
        }

        //upon page hidden, turn off element listeners
        self.hideHandler = function(event,ui )
        {
            $username.off( "change", self.updateName );
            $slider.off( "slidestop", self.updateRPP  );
        }

        Watcher.subscribe( new Subscriber({ id:self.id, show:self.showHandler, hide:self.hideHandler}) );
    };

    app.control.TweetSettings = TweetSettings;
})(app);