function CreateFlightApi(BPLA, start_flight, end_flight, polygon){
	axios.post('../api/createflight/', {
		BPLA: BPLA,
		start_flight: start_flight,
		end_flight: end_flight,
		polygon: polygon
	},

	{"X-CSRFToken": csrfToken},

	).then(res => {
    	console.log(res); // Результат ответа от сервера
	});
}