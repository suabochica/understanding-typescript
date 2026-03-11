Select and share a place app
===============================================

Now in the last module we learned how to work with third party libraries in typescript and that's exactly what we'll build up on this module.

We will build a tiny application a very simple Web site where we will use third party libraries to send HTTP requests and also to render a map.

With the help of google maps. So that is what we'll do. And of course we'll do all of this with typescript.

Index
-----------------------------------------

1. Project setup
2. Getting user input
3. Setting up a Google API key
4. Using axios to fetch coordinates for an entered address
5. Rendering a map with Google Maps
6. Working with maps without credit card

Project setup
----------------------------------------

The project setup of this project will be similar to the setup on the planner app. Here we will just share the contents of the `package.json` file, to get the references of the required packages:

```json
{
  "name": "maps-app",
  "version": "1.0.0",
  "description": "Share your location app",
  "main": "src/app.js",
  "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "webpack-dev-server",
      "build": "webpack --config webpack.config.prod.js"
  },
  "author": "Sergio L. Benitez D.",
    "license": "ISC",
    "devDependencies": {
        "clean-webpack-plugin": "^3.0.0",
        "ts-loader": "^8.0.4",
        "typescript": "^4.0.3",
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
    }
}
```

Getting user input
----------------------------------------
To get the user input we have to retrieve the form information when the user submit the code. The next snippet shows how we get the DOM element, and how we associate a handler to the submit event on the form:

```typescript
const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    // TODO: send this to Google API
}

form.addEventListener('submit', searchAddressHandler);
```
Setting up a Google API key
----------------------------------------

To get a google API key, you have to go to the next page, create an account, specify the service you want to use, and request the APO Key:

- [Get API Key](https://developers.google.com/maps/documentation/geocoding/get-api-key)

For this project, we will use the Maps API and the Geocode API. The first one will let us use the maps in Google, and the second one is for to translate an address into an latitud, longitud or vice versa. Once we get the API key, we can continue to generate the request to process the location information.

Using axios to fetch coordinates for an entered address
----------------------------------------

Let's recall the use of third party libraries, and let's set up the `axios` package, to send the HTTP requests:

```
npm install --save axios
```

Now, let's import the package, and we can start used inside the `app.ts` file. A cool thing with axios, it is that it expose his type definitions, so your TypeScript project will be able to auto complete with the methods expose by axios.


```typescript
import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
const GOOGLE_API_KEY = 'YOUR_API_KEY'

type GoogleGeocodingResponse = {
    results: {geometry: {location: { lat: number; lng: number}}}[];
    status: 'OK' | 'ZERO_RESULTS';
}

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
        .then(response => {
            console.log(response);
            if (response.data.status !== 'OK') {
                throw new Error('Could not fetch location!');
            }

            const coordinates = response.data.results[0].geometry.location;
        })
        .catch(err => {
        alert(err.message);
            console.log(err);
        });
}

form.addEventListener('submit', searchAddressHandler);
```

Additionally, in this code we set the custom type `GoogleGeocodingResponse`, just to formalize the expected response from the Geocoding API. This response have more properties, but for this case, we will just define the properties that are relevant for the project.

Finally, for the `address` parameter of the request, we use the `encodeURI` method of JavaScript, to pass the information that the user types in the form, in the expected format that require the request. So far, we will get the latitud and the longitude of the address that the user sets in the form.

Rendering a map with Google Maps
----------------------------------------

To render the map, you have to import an script inside your `index.html` file as shown below:

```html
<script defer
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
</script>
```

Now, inside the get request of the `app.ts` file, we will use the coordinates of the geocoding process to render the map, as we show in the next code:

```typescript
declare var google: any;
...
function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
        .then(response => {
            if (response.data.status !== 'OK') {
                throw new Error('Could not fetch location!');
            }

            const coordinates = response.data.results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById("map"), {
                center: coordinates,
                zoom: 8,
            });

            new google.maps.Marker({position: coordinates, map: map});
        })
        .catch(err => {
            alert(err.message);
            console.log(err);
        });
}
```

An important thing here, is that we are telling to TypeScript that the `google` object is a global object via the `declare` syntax. This code works as expected but we have an issue, and is that if we have a error instancing the google object, like a typo error, we will just identify the error in production stage, not in development. To fix that, we can use the `@types` packages of TypeScript:

```bash
npm i --save-dev @types/googlemaps
```

This way, we can get rid of the `declare` syntax, and we are making safer the code in development stage, also we can take advantage of the auto completion feature for the google object.

Working with maps without credit card
----------------------------------------

Using Google Maps unfortunately requires a credit card, even though you got a generous free tier which you very likely wouldn't exceed.

If you got no credit card, you can look into OpenLayers as an alternative (here's how to render a map with it: https://openlayers.org/en/latest/doc/quickstart.html).

In our concrete example, this would render a map:

```html
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.1.1/css/ol.css" type="text/css">
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.1.1/build/ol.js"></script>
```

And, in `app.ts`, use this code:

```typescript
declare var ol: any;

function searchAddressHandler(event: Event) {
  event.preventDefault();

  const coordinates = {lat: 40.41, lng: -73.99}; // Can't fetch coordinates from Google API, use dummy ones

  document.getElementById('map')!.innerHTML = ''; // clear <p> from <div id="map">
  new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
      zoom: 16
    })
  });
}
```

You can explore the OpenLayers docs to learn how to render a broad variety of different things.

Resources
----------------------------------------

Attached you find all the code snapshots for this module - you also find them attached to individual lectures throughout this module.

These links might also be interesting:

- [Google Maps Pricing](https://cloud.google.com/maps-platform/pricing/sheet/)
- [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/start)
- [Google Maps JS SDK](https://developers.google.com/maps/documentation/javascript/tutorial)
