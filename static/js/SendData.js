function CreateFlightApi(BPLA, start_flight, end_flight, polygon){
	var csrftoken = getCookie('csrftoken');

	axios({
  		method: 'post',
  		url: '../api/createflight/',
  		data: {
    		'BPLA':BPLA,
    		'start_flight':start_flight,
    		'end_flight': end_flight,
    		'polygon': polygon
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