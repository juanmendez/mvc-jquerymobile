(function(utils)
{
	var PageUtils = function(){
		
		var pub = {};

        /**
         * finds role within a page element
         * @param $page element
         * @param role  rolename
         * @returns {*} jquery object
         */
		pub.getRole = function( $page, role ){
			
			var s = $page.find( ":jqmData(role='" + role +"')");
			
			if( s.length == 0 )
			{
				return null;
			}
			
			return $(s[0]);
		}

        /**
         * based on page element, it retrieves the header/content/footer in it
         * and it gets returned in an object
         *
         * @param $page element
         * @returns {{header: jqueryElement, content: jqueryElement, footer: jqueryElement}}
         */
		pub.getSections = function( $page )
		{
			return {header:pub.getRole( $page,"header"),
				content:pub.getRole( $page,"content"),
				footer:pub.getRole( $page,"footer")}
		}


        pub.getPageName = function() {
            var index = document.URL.lastIndexOf("/") + 1;
            var filename = document.URL.substr(index);
            index = filename.lastIndexOf(".");
            filename = filename.substr( 0, index);

            if( filename == '' || filename == 'index.php' )
                filename = "home";

            return filename;
        }

        pub.getPage = function( ui )
        {
            var filename;

            if( ui instanceof Document )
            {
                filename = pub.getPageName();
            }
            else
            {
                filename = $(ui).attr("id" );
            }

            return filename;
        }
		
		
		return pub;
	}
	
	app.utils.PageUtils = PageUtils();
		
 })(app.utils);
