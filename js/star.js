function Stars(stars) {
    init: {
        this.buildUniverse(stars);
    }
}

Stars.prototype = {
    buildUniverse: function(stars) 
    {
        this.numberOfStars = stars | 2;
        this.calculateHorizon();
        this.generateStars();
        this.bindStarEvent();
        this.bindTelescopeEvent();
    },

    calculateHorizon: function() 
    {
        this.horizonWidth = parseInt($('#horizon').css('width'), 10);
        this.horizonHeight = parseInt($('#horizon').css('height'), 10);

    },

    generateStars: function() 
    {
        for(var index=0; index<this.numberOfStars; index++) {
            var starBirth = $('<div class="star"></div>');
            starBirth.css(this.generateCss());
            $('#horizon').append(starBirth);
        }
    },

    generateCss: function()
    {
        return {
            'left': this.generateLeftPosition(),
            'top': this.generateTopPosition()
        };
    },

    generateRandomPosition: function(max)
    {
        return Math.random() * max + 1; 
    },

    generateLeftPosition: function() 
    {
        return this.generateRandomPosition(this.horizonWidth) + 'px';
    },

    generateTopPosition: function() 
    {
        return this.generateRandomPosition(this.horizonHeight) + 'px';
    },

    bindStarEvent: function()
    {
        $(".star").droppable({
            // tolerance can be set to 'fit', 'intersect', 'pointer', or 'touch'
            tolerance: 'touch',
            over: function(event, ui) {
                $(this).addClass('starGrow');
            },
            out: function(event, ui) {
                $(this).removeClass('starGrow');
            },
        });
    },

    bindTelescopeEvent: function() 
    {
        $("#telescope").draggable({
            drag: function(event, ui) {
                //$(this).removeClass('dropClass');
            },

            stop: function(event, ui) {
                $(this).css({'left': '25px', 'top': '25px'});
                $('.star').removeClass('starGrow');
            }
        });
    }
}
