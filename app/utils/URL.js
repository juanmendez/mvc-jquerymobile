(function(utils){

    /**
     * returns the parameter value, if found
     * @type {{getParamName: Function}}
     */
   utils.URL = { getParamName:function(name){
       var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
       return results[1] || 0;
   }};
})(app.utils);