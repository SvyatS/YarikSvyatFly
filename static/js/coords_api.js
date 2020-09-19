function get_coords_drones(){
    axios({
        method: 'get',
        url: '../api/coords/',
        headers: {
            "content-type": "application/json"
        }
    }).then(function (response) {
        let ans = response.data
        return ans;

    }).catch(function (error) {
        console.log(error)
    });
}