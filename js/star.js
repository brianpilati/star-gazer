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
            var starSize = this.generateStarSize();
            var starColor = this.generateStarColor(starSize);
            var starBirth = $('<div class="' + starSize + ' star ' + starColor + '"></div>');
            if (starSize === "super") {
                starBirth.append('<div class="craters"><div class="superCraters"></div></div>');
            }
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

    generateStarColor: function(starSize)
    {
        if (starSize === 'super') {
            return 'white';
        } else {
            return 'white';
        }
    },

    generateStarSize: function()
    {
        var size = 'small';
        var randomSize = Math.random() * 100 + 1;
        if (randomSize > 99) {
            size = 'super';
        } else if (randomSize > 90) {
            size = 'large';
        } else if (randomSize > 55) {
            size = 'medium';
        }
        return size;
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
                var starClass = $(this).attr('class');
                if (starClass.match(/^large/g)) {
                    $(this).addClass('largeGrowth');
                } else if (starClass.match(/^super/g)) {
                    $(this).addClass('superGrowth');
                    $(this).find('.craters').show();
                } else if (starClass.match(/^medium/g)) {
                    $(this).addClass('mediumGrowth');
                } else {
                    $(this).addClass('smallGrowth');
                }
            },
            out: function(event, ui) {
                var starClass = $(this).attr('class');
                if (starClass.match(/^large/g)) {
                    $(this).removeClass('largeGrowth');
                } else if (starClass.match(/^super/g)) {
                    $(this).removeClass('superGrowth');
                    $(this).find('.craters').hide();
                } else if (starClass.match(/^medium/g)) {
                    $(this).removeClass('mediumGrowth');
                } else {
                    $(this).removeClass('smallGrowth');
                }
            },
        });
    },

    bindTelescopeEvent: function() 
    {
        $("#telescope").draggable({
            stop: function(event, ui) {
                $(this).css({'left': '25px', 'top': '25px'});
                $('.star').removeClass('smallGrowth');
                $('.star').removeClass('mediumGrowth');
                $('.star').removeClass('largeGrowth');
                $('.star').removeClass('superGrowth');
                $('.craters').hide();
            }
        });
    }
}
