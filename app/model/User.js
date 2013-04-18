(function(model)
{
	var User  = function()
	{
		var self = this;
		self.name = "juanmendezinfo";
		self.rpp = 5;
		
		var pub = {};

        /**
         * for simplicity setter and getters are created statically
         * i could have use this other method as well http://jsfiddle.net/juanmendez/uxQa4/
         * @param _name
         */
		pub.setName = function(_name){
			self.name = _name;

            console.log( "new name " + pub.getName() );
			$(pub).trigger(app.Ev.UPDATED_USER, {name:self.name, rpp:self.rpp });
		}
		
		pub.getName = function(){
			return self.name;
		}
		
		pub.setRPP = function(_rpp){
			self.rpp = _rpp;
			$(pub).trigger(app.Ev.UPDATED_USER, {name:self.name, rpp:self.rpp });
		}
		
		pub.getRPP = function(){
			return self.rpp;
		}
		
		return pub;
	};
	
	model.User = User();
})(app.model);
