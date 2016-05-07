(function($){
  $.fn.extend({
    BubbleEngine: function(options) {
      var defaults = {
        particleSizeMin:            0,
        particleSizeMax:            60,
        particleSourceX:            200,
        particleSourceY:            500,
        particleAnimationDuration:  3000,
        particleAnimationVariance:  2000,
        particleScatteringX:        500,
        particleScatteringY:        200,
        particleDirection:          'right' /* 'right', 'left', 'center'*/,
        gravity:                    -100,
        imgSource:                  'images/bubble.png',
        RenewBubbles:               'on'
      };
      var options = $.extend(defaults, options);
      options.couter = 0;

      //-----------------------------------------------------------------------
      //Public Functions ------------------------------------------------------
      //-----------------------------------------------------------------------
      this.settings = function( particleSizeMin, particleSizeMax, particleSourceX, particleSourceY, particleAnimationDuration, particleAnimationVariance, particleScatteringX, particleScatteringY, particleDirection, imgSource ) {
        if (particleSizeMin)           options.particleSizeMin           = particleSizeMin;
        if (particleSizeMax)           options.particleSizeMax           = particleSizeMax;
        if (particleSourceX)           options.particleSourceX           = particleSourceX;
        if (particleSourceY)           options.particleSourceY           = particleSourceY;
        if (particleAnimationDuration) options.particleAnimationDuration = particleAnimationDuration;
        if (particleAnimationVariance) options.particleAnimationVariance = particleAnimationVariance;
        if (particleScatteringX)       options.particleScatteringX       = particleScatteringX;
        if (particleScatteringY)       options.particleScatteringY       = particleScatteringY;
        if (particleDirection)         options.particleDirection         = particleDirection;
        if (imgSource)                 options.imgSource                 = imgSource;
      }
      this.getConfig = function() {
        ConfigValues = new Array(options.particleSizeMin, options.particleSizeMax, options.particleAnimationDuration, options.particleScatteringX, options.particleScatteringY, options.imgSource);
        return(ConfigValues);
      };
      this.getCounter = function() {
        return(options.couter);
      };
      this.removeBubbles = function() {
        options.RenewBubbles = 'off';
        options.couter = 0;
      };
      this.addBubbles = function(number) {
        if (!number) number = 25;
        options.RenewBubbles = 'on';
        for (i=1;i<=number;i++) {
          options.couter++;
          window.setTimeout(function() {
            GenerateElement();
          }, Math.floor(Math.random()*3000));
        }
      };
      
      //-----------------------------------------------------------------------
      //Private Functions -----------------------------------------------------
      //-----------------------------------------------------------------------
      function GetRandom( min, max ) {
        if( min > max ) {
          return( -1 );
        }
        if( min == max ) {
          return( min );
        }
        return( min + parseInt( Math.random() * ( max-min+1 ) ) );
      }

      //-----------------------------------------------------------------------
      function GenerateElement(){
        var animationEndY     = options.particleSourceY + options.gravity + GetRandom( -options.particleScatteringY, options.particleScatteringY );
        if (options.particleDirection == 'left') {
          var animationEndX     = options.particleSourceX - GetRandom( 0, options.particleScatteringX );
        } else if (options.particleDirection == 'right') {
          var animationEndX     = options.particleSourceX + GetRandom( 0, options.particleScatteringX );
        } else if (options.particleDirection == 'center') {
          var animationEndX     = options.particleSourceX + GetRandom( -options.particleScatteringX, options.particleScatteringX );
        }
        var animationDuration = options.particleAnimationDuration + GetRandom( 0, options.particleAnimationVariance );
        var particleSize      = GetRandom( options.particleSizeMin, options.particleSizeMax )
        var div = jQuery('<img class="bubble '+options.ids+'" src="'+options.imgSource+'">').css({
          position: 'absolute',
          top:      options.particleSourceY,
          left:     options.particleSourceX,
          width:    particleSize,
          height:   particleSize
        }).appendTo('body');
        div.animate({
          left:     animationEndX,
          top:      [animationEndY, 'easeOutCubic']
        }, {
          queue:    false,
          duration: animationDuration,
          complete: function() {
            $(this).remove();
            if (options.RenewBubbles == 'on') {
              GenerateElement();
            } else {
            }
          }
        });	
      }		
      
      //-----------------------------------------------------------------------
      return this.each(function() {
        var o =options;
        var obj = $(this);			
        o.ids = Math.floor(Math.random()*1000);
      });
    }
  });
})(jQuery);