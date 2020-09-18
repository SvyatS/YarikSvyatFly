function CreateFlightApi(BPLA, start_flight, end_flight, polygon, weather){
	var csrftoken = getCookie('csrftoken');

	axios({
  		method: 'post',
  		url: '../api/createflight/',
  		data: {
    		'BPLA':BPLA,
    		'start_flight':start_flight,
    		'end_flight': end_flight,
			'polygon': polygon,
			'condition_weather' : weather.condition,	 
			'temperature_weather': weather.temperature,
			'speed_wind': weather.wind.speed,
      'gusting': weather.wind.gusting,
      'heading': weather.wind.heading,
      'visibility': weather.visibility,
      'dew_point': weather.dew_point,
  		},
  		headers: {
    		"X-CSRFToken": csrftoken, 
    		"content-type": "application/json"
  		}
	}).then(function (response) {
  		console.log(response)
	}).catch(function (error) {
  		console.log(error)
	});
}

function send_coords(points, fl_id){
  var csrftoken = getCookie('csrftoken');
  axios({
    method: 'post',
    url: '../api/generator/',
    data: {
      'coords': points,
      'id': fl_id
      },

      headers: {
        "X-CSRFToken": csrftoken, 
        "content-type": "application/json"
      }

  }).then(function (response) {
      console.log(response)
  }).catch(function (error) {
      console.log(error)
  });

}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}