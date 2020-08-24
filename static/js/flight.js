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

