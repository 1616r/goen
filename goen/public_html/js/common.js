/* jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/*/
// t: current time, b: begInnIng value, c: change In value, d: duration

/* パーティクル */
var top_canvas, context, NUM_NODES, minDist, springAmount, rgb, nodes, looper;  

function nodes_init() {
  createNodes();
	context.lineWidth = 1;
	looper = setInterval(nodes_loop, 1000/30);
}

/*  */
function createNodes() {
	nodes = [];
	for (var i=0; i<NUM_NODES; i++) {
		var node = {
			radius: 1.5,
			x: Math.random()*wW,
			y: Math.random()*wH,
			vx: Math.random()*6-3,
			vy: Math.random()*6-3,
			mass: 1,
			update: function() {
				this.x += this.vx/5;
				this.y += this.vy/5;
				if (this.x > wW) {
					this.x = 0;
				} else if (this.x < 0) {
					this.x = wW;
				}
				if (this.y > wH) {
					this.y = 0;
				} else if (this.y < 0) {
					this.y = wH;
				}
			},
			draw: function() {
				context.fillStyle = "rgb("+rgb+")";
				context.beginPath();
				context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
				context.closePath();
				context.fill();
			}
		};
		nodes.push(node);
	}
}

function nodes_loop() {
	context.clearRect(0, 0, top_canvas.width, top_canvas.height);
    for (i=0; i<NUM_NODES; i++) {
        nodes[i].update();
    	  nodes[i].draw();
    }
	  for (i=0; i<NUM_NODES-1; i++) {
		  var node1 = nodes[i];
		  for (var j=i+1; j<NUM_NODES; j++) {
			  var node2 = nodes[j];
			  spring(node1, node2);
		  }
	  }
}

function spring(na, nb) {
	var dx = nb.x - na.x;
	var dy = nb.y - na.y;
	var dist = Math.sqrt(dx*dx + dy*dy);

	if (dist<minDist) {
		context.beginPath();
		context.strokeStyle = "rgba("+rgb+","+(1-dist/minDist)+")";
		context.moveTo(na.x, na.y);
		context.lineTo(nb.x, nb.y);
		context.stroke();
		context.closePath();
		var ax = dx*springAmount;
		var ay = dy*springAmount;
		na.vx += ax;
		na.vy += ay;
		nb.vx -= ax;
		nb.vy -= ay;
	}
}

$(window).bind('load',function(){
	top_canvas = document.getElementById('top_canvas');
	
	if ( ! top_canvas || top_canvas.getContext ) {
		return false;
	}
	
	context = top_canvas.getContext('2d');

	NUM_NODES = 40;
	minDist = 160;
	springAmount = 0.0002;
	rgb = '255,255,255';

	nodes_init();

});





jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend( jQuery.easing,{def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {return jQuery.easing[jQuery.easing.def](x, t, b, c, d); },
	easeInQuad: function (x, t, b, c, d) {return c*(t/=d)*t + b; },
	easeOutQuad: function (x, t, b, c, d) {return -c *(t/=d)*(t-2) + b; },
	easeInOutQuad: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t + b; return -c/2 * ((--t)*(t-2) - 1) + b; },
	easeInCubic: function (x, t, b, c, d) {return c*(t/=d)*t*t + b; },
	easeOutCubic: function (x, t, b, c, d) {return c*((t=t/d-1)*t*t + 1) + b; },
	easeInOutCubic: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t + b; return c/2*((t-=2)*t*t + 2) + b; },
	easeInQuart: function (x, t, b, c, d) {return c*(t/=d)*t*t*t + b; },
	easeOutQuart: function (x, t, b, c, d) {return -c * ((t=t/d-1)*t*t*t - 1) + b; },
	easeInOutQuart: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t*t + b; return -c/2 * ((t-=2)*t*t*t - 2) + b; },
	easeInQuint: function (x, t, b, c, d) {return c*(t/=d)*t*t*t*t + b; },
	easeOutQuint: function (x, t, b, c, d) {return c*((t=t/d-1)*t*t*t*t + 1) + b; },
	easeInOutQuint: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b; return c/2*((t-=2)*t*t*t*t + 2) + b; },
	easeInSine: function (x, t, b, c, d) {return -c * Math.cos(t/d * (Math.PI/2)) + c + b; },
	easeOutSine: function (x, t, b, c, d) {return c * Math.sin(t/d * (Math.PI/2)) + b; },
	easeInOutSine: function (x, t, b, c, d) {return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b; },
	easeInExpo: function (x, t, b, c, d) {return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b; },
	easeOutExpo: function (x, t, b, c, d) {return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b; },
	easeInOutExpo: function (x, t, b, c, d) {if (t==0) return b; if (t==d) return b+c; if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b; return c/2 * (-Math.pow(2, -10 * --t) + 2) + b; },
	easeInCirc: function (x, t, b, c, d) {return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b; },
	easeOutCirc: function (x, t, b, c, d) {return c * Math.sqrt(1 - (t=t/d-1)*t) + b; },
	easeInOutCirc: function (x, t, b, c, d) {if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b; return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b; },
	easeInElastic: function (x, t, b, c, d) {var s=1.70158;var p=0;var a=c; if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3; if (a < Math.abs(c)) { a=c; var s=p/4; } else var s = p/(2*Math.PI) * Math.asin (c/a); return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b; },
	easeOutElastic: function (x, t, b, c, d) {var s=1.70158;var p=0;var a=c; if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3; if (a < Math.abs(c)) { a=c; var s=p/4; } else var s = p/(2*Math.PI) * Math.asin (c/a); return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b; },
	easeInOutElastic: function (x, t, b, c, d) {var s=1.70158;var p=0;var a=c; if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5); if (a < Math.abs(c)) { a=c; var s=p/4; } else var s = p/(2*Math.PI) * Math.asin (c/a); if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b; return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b; },
	easeInBack: function (x, t, b, c, d, s) {if (s == undefined) s = 1.70158; return c*(t/=d)*t*((s+1)*t - s) + b; },
	easeOutBack: function (x, t, b, c, d, s) {if (s == undefined) s = 1.70158; return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b; },
	easeInOutBack: function (x, t, b, c, d, s) {if (s == undefined) s = 1.70158; if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b; return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b; },
	easeInBounce: function (x, t, b, c, d) {return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b; },
	easeOutBounce: function (x, t, b, c, d) {if ((t/=d) < (1/2.75)) {return c*(7.5625*t*t) + b; } else if (t < (2/2.75)) {return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b; } else if (t < (2.5/2.75)) {return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b; } else {return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b; } },
	easeInOutBounce: function (x, t, b, c, d) {if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b; return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b; }
});

/* backgroundSize */
(function($,window,document,Math,undefined) {

var div = $( "<div>" )[0], rsrc = /url\(["']?(.*?)["']?\)/, watched = [], positions = {top: 0, left: 0, bottom: 1, right: 1, center: .5 };

if ( "backgroundSize" in div.style && !$.debugBGS ) { return; }

$.cssHooks.backgroundSize = {
	set: function( elem, value ) {
		var firstTime = !$.data( elem, "bgsImg" ),
			pos,
			$wrapper, $img;
		$.data( elem, "bgsValue", value );
		if ( firstTime ) {
			watched.push( elem );
			$.refreshBackgroundDimensions( elem, true );
			$wrapper = $( "<div>" ).css({position: "absolute", zIndex: -1, top: 0, right: 0, left: 0, bottom: 0, overflow: "hidden"});
			$img = $( "<img>" ).css({
				position: "absolute"
			}).appendTo( $wrapper ),

			$wrapper.prependTo( elem );

			$.data( elem, "bgsImg", $img[0] );

			pos = (
				$.css( elem, "backgroundPosition" ) ||
				$.css( elem, "backgroundPositionX" ) + " " + $.css( elem, "backgroundPositionY" )
			).split(" ");
			$.data( elem, "bgsPos", [
				positions[ pos[0] ] || parseFloat( pos[0] ) / 100,
				positions[ pos[1] ] || parseFloat( pos[1] ) / 100
			]);
			$.css( elem, "zIndex" ) == "auto" && ( elem.style.zIndex = 0 );
			$.css( elem, "position" ) == "static" && ( elem.style.position = "relative" );

			$.refreshBackgroundImage( elem );

		} else {
			$.refreshBackground( elem );
		}
	},

	get: function( elem ) {
		return $.data( elem, "bgsValue" ) || "";
	}
};

$.cssHooks.backgroundImage = {
	set: function( elem, value ) {
		return $.data( elem, "bgsImg") ?
			$.refreshBackgroundImage( elem, value ) :
			value;
	}
};

$.refreshBackgroundDimensions = function( elem, noBgRefresh ) {
	var $elem = $(elem),
		currDim = {
			width: $elem.innerWidth(),
			height: $elem.innerHeight()
		},
		prevDim = $.data( elem, "bgsDim" ),
		changed = !prevDim ||
			currDim.width != prevDim.width ||
			currDim.height != prevDim.height;

	$.data( elem, "bgsDim", currDim );

	if ( changed && !noBgRefresh ) {
		$.refreshBackground( elem );
	}
};

$.refreshBackgroundImage = function( elem, value ) {
	var img = $.data( elem, "bgsImg" ),
		currSrc = ( rsrc.exec( value || $.css( elem, "backgroundImage" ) ) || [] )[1],
		prevSrc = img && img.src,
		changed = currSrc != prevSrc,
		imgWidth, imgHeight;

	if ( changed ) {
		img.style.height = img.style.width = "auto";

		img.onload = function() {
			var dim = {
				width: img.width,
				height: img.height
			};
			if ( dim.width == 1 && dim.height == 1 ) { return; }

			$.data( elem, "bgsImgDim", dim );
			$.data( elem, "bgsConstrain", false );

			$.refreshBackground( elem );

			img.style.visibility = "visible";

			img.onload = null;
		};

		img.style.visibility = "hidden";
		img.src = currSrc;

		if ( img.readyState || img.complete ) {
			img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
			img.src = currSrc;
		}

		elem.style.backgroundImage = "none";
	}
};

$.refreshBackground = function( elem ) {
	var value = $.data( elem, "bgsValue" ),
		elemDim = $.data( elem, "bgsDim" ),
		imgDim = $.data( elem, "bgsImgDim" ),
		$img = $( $.data( elem, "bgsImg" ) ),
		pos = $.data( elem, "bgsPos" ),
		prevConstrain = $.data( elem, "bgsConstrain" ),
		currConstrain,
		elemRatio = elemDim.width / elemDim.height,
		imgRatio = imgDim.width / imgDim.height,
		delta;

	if ( value == "contain" ) {
		if ( imgRatio > elemRatio ) {
			$.data( elem, "bgsConstrain", ( currConstrain = "width" ) );

			delta = Math.floor( ( elemDim.height - elemDim.width / imgRatio ) * pos[1] );

			$img.css({
				top: delta
			});
			if ( currConstrain != prevConstrain ) {
				$img.css({
					width: "100%",
					height: "auto",
					left: 0
				});
			}

		} else {
			$.data( elem, "bgsConstrain", ( currConstrain = "height" ) );

			delta = Math.floor( ( elemDim.width - elemDim.height * imgRatio ) * pos[0] );

			$img.css({
				left: delta
			});

			if ( currConstrain != prevConstrain ) {
				$img.css({
					height: "100%",
					width: "auto",
					top: 0
				});
			}
		}

	} else if ( value == "cover" ) {
		if ( imgRatio > elemRatio ) {
			$.data( elem, "bgsConstrain", ( currConstrain = "height" ) );

			delta = Math.floor( ( elemDim.height * imgRatio - elemDim.width ) * pos[0] );

			$img.css({
				left: -delta
			});

			if ( currConstrain != prevConstrain ) {
				$img.css({
					height:"100%",
					width: "auto",
					top: 0
				});
			}

		} else {
			$.data( elem, "bgsConstrain", ( currConstrain = "width" ) );

			delta = Math.floor( ( elemDim.width / imgRatio - elemDim.height ) * pos[1] );

			$img.css({
				top: -delta
			});

			if ( currConstrain != prevConstrain ) {
				$img.css({
					width: "100%",
					height: "auto",
					left: 0
				});
			}
		}
	}
}

var $event = $.event,
	$special,
	dummy = {_:0},
	frame = 0,
	wasResized, animRunning;

$special = $event.special.throttledresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		var context = this,
			args = arguments;

		wasResized = true;

        if ( !animRunning ) {
        	$(dummy).animate(dummy, { duration: Infinity, step: function() {
	        	frame++;

	        	if ( frame > $special.threshold && wasResized || execAsap ) {
        			event.type = "throttledresize";
	        		$event.dispatch.apply( context, args );
	        		wasResized = false;
	        		frame = 0;
	        	}
	        	if ( frame > 9 ) {
	        		$(dummy).stop();
	        		animRunning = false;
	        		frame = 0;
	        	}
	        }});
	        animRunning = true;
        }
	},
	threshold: 1
};

$(window).on("throttledresize", function() {$(watched).each(function() {$.refreshBackgroundDimensions( this ); }); });
})(jQuery,window,document,Math);

$(function(){
	$('.lt-ie9 .top').css( "background-size", "cover" );
	initialize();

	wH = $(window).height();
	wW =$(window).width();
	$('.top').height(wH);

	$(window).on('scroll', function() {
		sT = $(window).scrollTop();

		var pArea = $('#petly_canvas').offset().top;
		var pItemArea = $('.product h2').offset().top;


		if(sT > wH*2/3){
			$('.globalnav').addClass('show');
		}else{
			$('.globalnav').removeClass('show');
			$('.navbtn').removeClass('on')
			$('#g_menu').removeClass('show');
			$('.overlay').removeClass('show');
		}
		if(sT > wH){
			$('.circle').addClass('show');
		}else{
			$('.circle').removeClass('show');
			$('.top').css({'background-position-y': sT/2});
			$('#canvas').css({'opacity': 10 - sT/20});
		}

		// $('.srElm').enter();
		$('#vision_canvas').enter({ play:vision_init });
		$('#petly_canvas').enter({ play:petry_init });
		$('#profile_canvas').enter({ play:profile_init });
		$('.delay').enter();

		$('.diamond_pic').each(function(index, el) {
			var $this = $(this);
			var eT = $this.offset().top;
			if(eT < sT + wH*0.2) {
				if( $this.is('.on') ){
				 	$this.removeClass('on');
				 }
			}else if(eT < sT + wH*0.7) {
				if( $this.is('.on') ){
					return;
				}else{
					$this.addClass('on');
				}
			}else{
				if( $this.is('.on') ){
				 	$this.removeClass('on');
				}
			};
		});
	});

	$('a[href^=#]').click(function() {
		var speed = 700;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$('body,html').animate({scrollTop:position}, speed, 'easeOutQuint');
		return false;
   });


});

$(window).on('load', function(event) {
	$('#loader').addClass('loaded');

	setTimeout(function(){
		$('#loader').remove();
		init();
		$('#vision_canvas').enter({ play:vision_init });
		$('#petly_canvas').enter({ play:petry_init });
		$('#profile_canvas').enter({ play:profile_init });
		$('.delay').enter();
	},1000);

	setTimeout(function(){
		$('.top_header .logo').fadeIn(800);
	},1600);
	setTimeout(function(){
		$('.top_header nav').fadeIn(800);
	},2400);
	setTimeout(function(){
		$('.top .bar_scr').addClass('show').animate({'bottom': -10}, 500);
	},2800);
});

$(document).on({
	'click': function(event){
		event.preventDefault();
		$(this).toggleClass('on')
		$('#g_menu').toggleClass('show');
		$('.overlay').toggleClass('show');
	}
},'.navbtn');
$(document).on({
	'click': function(event){
		$('.navbtn').toggleClass('on')
		$('#g_menu').toggleClass('show');
		$('.overlay').toggleClass('show');
	}
},'#g_menu a');

// $(document).on({
// 	'mouseenter': function(event){
// 		$(this).find('.share_icon').hide();
// 		$(this).find('.share_body').show();
// 	},
// 	'mouseleabe': function(event){
// 		$(this).find('.share_icon').show();
// 		$(this).find('.share_body').hide();
// 	}
// },'#g_menu .share li');


(function($) {
    $.fn.enter = function(config){
    	sT = $(window).scrollTop();
	    var defaults = {play : 'none'};
        var options=$.extend(defaults, config);
        return this.each(function(i){
			var $this = $(this);
			var eT = $this.offset().top;
			if(eT < sT + wH*0.8) {
				if( $this.is('.in') ){
					return;
				}else{
					$this.addClass('in');
					if(defaults.play != 'none'){
						defaults.play();
					}
				}
			}else{
				if( $this.is('.in') ){
				 	$this.removeClass('in');
				 }
			};
        });
	}
})(jQuery);


// canvas
var canvas, stage, exportRoot;
function init() {
	canvas = document.getElementById("canvas");
	exportRoot = new lib.text2();

	stage = new createjs.Stage(canvas);
	stage.addChild(exportRoot);
	stage.update();

	createjs.Ticker.setFPS(lib.properties.fps);
	createjs.Ticker.addEventListener("tick", stage);
}

function petry_init() {
	canvas = document.getElementById("petly_canvas");
	exportRoot = new lib.petry2();

	stage = new createjs.Stage(canvas);
	stage.addChild(exportRoot);
	stage.update();

	createjs.Ticker.setFPS(lib.properties.fps);
	createjs.Ticker.addEventListener("tick", stage);
}

function profile_init() {
	canvas = document.getElementById("profile_canvas");
	exportRoot = new lib.text_cp();

	stage = new createjs.Stage(canvas);
	stage.addChild(exportRoot);
	stage.update();

	createjs.Ticker.setFPS(lib.properties.fps);
	createjs.Ticker.addEventListener("tick", stage);
}

function vision_init() {
	canvas = document.getElementById("vision_canvas");
	exportRoot = new lib.vision();

	stage = new createjs.Stage(canvas);
	stage.addChild(exportRoot);
	stage.update();

	createjs.Ticker.setFPS(lib.properties.fps);
	createjs.Ticker.addEventListener("tick", stage);
}


// googlemap
var map;
var cent = new google.maps.LatLng(35.661289,139.703602); // 中心の座標
var MY_MAPTYPE_ID = 'cool';
function initialize() {
	//***** デザインのカスタマイズ部分 *****//
	var stylez = [
		{
			"stylers": [
				{ "saturation": -100 },
				{ "gamma": 1.11 },
				{ "visibility": "simplified" },
				{ "invert_lightness": false }
			]
			},{
			"featureType": "water",
			"stylers": [
				{ "color": "#DFDFDF" }
			]
			},{
			"featureType": "road",
			"stylers": [
				{ "visibility": "on" },
				{ "color": "#f6f6f6" }
			]
		}
	];
	//***** デザインのカスタマイズ部分 *****//
	var mapOptions = {
		zoom: 10,                  // マップの拡大値
		center: cent,
		scrollwheel: false,
		draggable: false,
		mapTypeControlOptions: {
		mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
		},
		mapTypeId: MY_MAPTYPE_ID,
		mapTypeControl: false,//falseでマップ名及び航空写真（マップタイプ）の非表示
		mapTypeControlOptions: {
		    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
		    position: google.maps.ControlPosition.BOTTOM_CENTER //マップタイプの位置
		},
		panControl: false,//falseで非表示
		zoomControl: false,//falseで非表示
		scaleControl: false,//falseで非表示
		streetViewControl: false//falseで非表示
	};
	map = new google.maps.Map(document.getElementById("map"),mapOptions);
	var styledMapOptions = {name: "sample"};
	var jayzMapType = new google.maps.StyledMapType(stylez, styledMapOptions);map.mapTypes.set(MY_MAPTYPE_ID, jayzMapType);
	var markerOpts = {
		position: new google.maps.LatLng(35.661289,139.703602), // マーカの座標
		map: map,
		//title: "MAP",			// マップの名称
		icon:"http://rinn.co.jp/common/img/pin_black.png"	// マーカーアイコンを画像に変更
	};
	var marker = new google.maps.Marker(markerOpts);
	var infowin = new google.maps.InfoWindow({content:"<div class='bb'><p class='name'>RINN Inc. <a href='http://goo.gl/maps/gWRsJ' target='_blank'><img src='http://rinn.co.jp/common/img/icon_map.png' alt='MAP' class='maplink'></a></p><p class='add'>東京都渋谷区渋谷1-17-1 TOC第2ビル3F PoRTAL</p></div>"});
	google.maps.event.addListener(marker, 'click', function(){infowin.open(map, marker);});
}






