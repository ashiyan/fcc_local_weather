/*globals $, document */

$(document).ready(function () {
	
	var api = "http://api.openweathermap.org/data/2.5/weather?",
		 city = "",
		 units = "&units=metric",
		 appid = "&APPID=20c9fdfdc3e23b2092a7db5892b30e33",
		 cb = "&callback=JSON_CALLBACK",
		 metric_system = true,
		 current_temp = 0;
	
	$.ajax ({
		url: '//freegeoip.net/json/',
		type: 'POST',
		dataType: 'jsonp',
		success: function(location) {
			city = "lat=" + location.latitude + "&lon=" + location.longitude;
			$(".city").text(location.city);
			$(".country").text(location.country_name);
			
			$.ajax ({
				url: api + city + units + appid + cb,
				dataType: 'jsonp',
				success: function(forecast) {
					current_temp = forecast.main.temp;
					$(".temp").text(Math.round(current_temp));
					$(".units").text("\xB0" + "C");
					$(".description").text(forecast.weather[0].main);
					$(".icon").attr("src", "http://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png");
				},
				error: function() {
					$(".forecast").hide();
					$(".icon").hide();
					$(".error").text("The weather for your place is not available now. Try later.");
				}
			});
		},
		error: function() {
			$(".forecast").hide();
			$(".icon").hide();
			$(".error").text("Your city is not found. Sorry about that.");
		}
	});
	
	$(".units").on("click", function() {
		if (metric_system) {
			$(".temp").text(Math.round(current_temp * 9 / 5 + 32));
			$(".units").text("\xB0" + "F");
			metric_system = false;
		}
		else {
			$(".temp").text(Math.round(current_temp));
			$(".units").text("\xB0" + "C");
			metric_system = true;
		}
	});
});
