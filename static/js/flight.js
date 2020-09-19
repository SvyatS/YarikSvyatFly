const AIRMAP_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsX2lkIjoiY3JlZGVudGlhbHxtREFaOEVndXE3a25wQkZvRTJ4OU90azdxNXh4IiwiYXBwbGljYXRpb25faWQiOiJhcHBsaWNhdGlvbnwyRTVFSlJMSG01Z1B6RFR2ek1XRHVtTEp3eCIsIm9yZ2FuaXphdGlvbl9pZCI6ImRldmVsb3Blcnx6a0R3NnhlRkdLUG5SOGNXV0JrR1hjRTkyZ1dwIiwiaWF0IjoxNTk4MTA2ODY2fQ.UH9BpGP9-T4rqAWFcbXWQZ6ZjM1CE0pkhTo-GSZmbAU'
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic3Z5YXRvc2xhdjIwMDIiLCJhIjoiY2tlNXJkemVhMHc0eTJ6bDZiMHFxODNpOSJ9.HU1Pn9ZK5bH3Y6LTzqwEPA'
if (AIRMAP_API_KEY && MAPBOX_ACCESS_TOKEN) {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [85, 56.4],
    zoom: 10
    });

    mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js');
    map.addControl(new MapboxLanguage({
        defaultLanguage: 'ru'
    }));


    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: 'poi',
        // see https://docs.mapbox.com/api/search/#geocoding-response-object for information about the schema of each response feature
        render: function(item) {
        // extract the item's maki icon or use a default
        var maki = item.properties.maki || 'marker';
        return ("<div class='geocoder-dropdown-item'><img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/" 
                +maki +"-15.svg'><span class='geocoder-dropdown-text'>" +item.text +'</span></div>');
        },
        mapboxgl: mapboxgl
    });
    map.addControl(geocoder);

    Polygon = [];

    var coords_drones = [];


     axios({
        method: 'get',
        url: '../api/coords/',
        headers: {
            "content-type": "application/json"
        }
    }).then(function (response) {
        coords_drones = response.data
    }).catch(function (error) {
        console.log(error)
    });
    

    var apply = false; 

    map.on('load', function() {
        map.addSource('maine', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                        Polygon
                    ]
                }
            }
        });
    
        map.addLayer({
            'id': 'maine',
            'type': 'fill',
            'source': 'maine',
            'layout': {},
            'paint': {
                'fill-color': '#088',
                'fill-opacity': 0.8
            }
        });

        map.loadImage(
            'http://127.0.0.1:8000/static/img/drone_small.png',
            function (error, image) {
                if (error) throw error;
                    map.addImage('custom-marker', image);
                // Add a GeoJSON source with 2 points
                map.addSource('points', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': coords_drones.ans
                    }
                });
 
                // Add a symbol layer
                map.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'points',
                    'layout': {
                        'icon-image': 'custom-marker',
                        // get the title name from the source's "title" property
                        'text-field': ['get', 'title'],
                        'text-font': [
                            'Open Sans Semibold',
                            'Arial Unicode MS Bold'
                        ],
                        'text-offset': [0, 1.25],
                        'text-anchor': 'top'
                    }
                });
            }
        );
    });

    var weather_class = document.getElementById("weather");
    document.getElementsByClassName('flight')[0].style.display = "none"

    
    function update_poligon(){
        data = {
            'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                        Polygon
                    ]
                }
            }

        map.getSource('maine').setData(data);

   }

    var start_time, end_time;
    var weather;


   function apply_polygon(){
        apply = false;
        document.getElementsByClassName('flight')[0].style.display = "block";
        StartStop();
        start_time = Date.now();
        let x = Polygon[0][0]
        let y = Polygon[0][1]
        let url = 'https://api.airmap.com/advisory/v1/weather?latitude=' + y + '&longitude=' + x 
        axios({
            method: 'get',
            url: url,
            headers: {
              "X-API-Key": AIRMAP_API_KEY, 
              "content-type": "application/json"
            }
      }).then(function (response) {
            weather = response.data.data.weather[0]
            let answer = 'Информация о погоде:<br>' + weather.condition + '<br>' + 
                        'температура: ' + weather.temperature + ' градусов C<br>' +
                        'скорость ветра: ' + weather.wind.speed + ' миль/час<br>'
            weather_class.innerHTML = answer
      }).catch(function (error) {
            console.log(error)
      });
       
    //   console.log(answer)
       
   }

   function end_flight(){
        end_time = Date.now();
        BPLA = document.getElementById("BPLA").value;
        index_id = BPLA.indexOf('id ');
        BPLA_id = BPLA.substring(index_id+3);
        CreateFlightApi(BPLA_id, start_time, end_time, Polygon, weather);
        document.getElementsByClassName('flight')[0].style.display = "none";
        alert("Время полета: "+dh+":"+dm+":"+ds);
        StartStop();

   }

   function select_polygon(){
        apply = true;
        Polygon = []
        update_poligon();
   }

    map.on('click', function(e) {
        if(apply){
            point = []
            point.push(e.lngLat.lng);
            point.push(e.lngLat.lat);
            Polygon.push(point);
            update_poligon();
        }
    });


    const config = {
        "airmap": {
            "api_key": AIRMAP_API_KEY
        },
        "auth0": {
            "client_id": "bff502e6-7aa5-4529-b1ed-d9cf71f3decc",
            "callback_url": ""
        },
        "mapbox": {
            "access_token": MAPBOX_ACCESS_TOKEN
        }
    }

    const options = {
        preferredRulesets: [
            'usa_part_107',
            'deu_rules_waiver'
        ],
        overrideRulesets: [
            // 'usa_part_107'
        ],
        enableRecommendedRulesets: true,
        theme: 'light'
        /* refer to the docs for a comprehensive list of options */
    }


    const plugin = new this.AirMap.ContextualAirspacePlugin(config, options);
    map.addControl(plugin, 'top-left')

    // Example for how ruleset changes are surfaced to the consuming application.
    plugin.on('jurisdictionChange', (data) => console.log('jurisdictionChange', data))
    plugin.on('airspaceLayerClick', (data) => console.log('airspaceLayerClick', data))

    // Example for how the consuming app can call the plugin for jurisdictions or selected rulesets.
    setTimeout(() => {
        console.log({
            jurisdictions: plugin.getJurisdictions(),
            selectedRulelsets: plugin.getSelectedRulesets()
        })
    }, 5000)
} else {
    console.error(
        'Missing AIRMAP_API_KEY or MAPBOX_ACCESS_TOKEN. ' +
        'These are required for developing locally.\n\n' +
        'Please save these values in localStorage by entering the following in your browser console:\n\n' +
        'localStorage.setItem(\'AIRMAP_API_KEY\', \'<your_key>\');\n' +
        'localStorage.setItem(\'MAPBOX_ACCESS_TOKEN\', \'<your_token>\');\n\n'
    );
}




