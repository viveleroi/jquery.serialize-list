  /**
     * jQuery Serialize List
     * Copyright (c) 2009 Mike Botsko, Botsko.net LLC
     * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
     * Copyright notice and license must remain intact for legal use
     * Version .1
     *
     * Serialize an unordered or ordered list item. Optional ability
     * to determine which attributes are included. The serialization
     * will be read by PHP as a multidimensional array which you may
     * use for saving state.
     */
(function($){
    $.fn.serializelist = function(options) {
        // Extend the configuration options with user-provided
        var defaults = {
            prepend: 'ul',
            is_child: false,
            attributes: ['id', 'class']
        };
        var opts = $.extend(defaults, options);
        var serialStr     = '';

        if(!opts.is_child){ opts.prepend = '&'+opts.prepend; }

        // Begin the core plugin
        this.each(function() {
            var ul_obj = this;

            var li_count     = 0;
            $(this).children().each(function(){

                for(att in opts.attributes){
                    serialStr += opts.prepend+'['+li_count+']['+opts.attributes[att]+']='+$(this).attr(opts.attributes[att]);
                }

                // append any children elements
                var child_base = opts.prepend+'['+li_count+'][children]';
                $(this).children().each(function(){
                    if(this.tagName == 'UL' || this.tagName == 'OL'){
                        serialStr += $(this).serializelist({'prepend': child_base, 'is_child': true});
                    }
                });
                li_count++;
            });
        });
        return(serialStr);
    };
})(jQuery);
