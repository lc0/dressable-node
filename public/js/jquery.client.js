// In case we leave a console.*** in the code without native support
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info, log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c;})(window.console=window.console||{});

(function ($) {

	// Shorthand jQuery selector cache. Only use on selectors for the DOM that won't change.
	var $$ = (function() {
		var cache = {};
		return function(selector) {
			if (!cache[selector]) {
				cache[selector] = $(selector);
			}
			return cache[selector];
		};
	})();

	var socketIoClient = io.connect(null, {
		'port': '#socketIoPort#',
		'rememberTransport': true,
		'transports': ['websocket', 'xhr-multipart', 'xhr-polling', 'htmlfile', 'flashsocket']
	});
	socketIoClient.on('connect', function () {
		$$('#connected').addClass('on').find('strong').text('Online');
	});

	var image = $.trim($('#image').val());
	var service = $.trim($('#service').val());
	socketIoClient.on('message', function(msg) {
		var $li = $('<li>').text(msg).append($('<img class="avatar">').attr('src', image));
		if (service) {
			$li.append($('<img class="service">').attr('src', service));
		}
/*
		$$('#bubble ul').prepend($li);
		$$('#bubble').scrollTop(98).stop().animate({
			'scrollTop': '0'
		}, 500);
		setTimeout(function() {
			$li.remove();
		}, 5000);

		setTimeout(function() {
			socketIoClient.send('pong');
		}, 1000);

*/
	});

	socketIoClient.on('disconnect', function() {
		$$('#connected').removeClass('on').find('strong').text('Offline');
	});

	map = L.map('indexMap').setView([51.505, -0.09], 13);
	L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
		}).addTo(map);


	function onLocationFound(e) {
		var radius = e.accuracy / 2;

		L.marker(e.latlng).addTo(map)
			.bindPopup("You are within " + radius + " meters from this point").openPopup();

		L.circle(e.latlng, radius).addTo(map);
	}

	function onLocationError(e) {
		alert(e.message);
	}

	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);

	map.locate({setView: true, maxZoom: 14});




})(jQuery);
