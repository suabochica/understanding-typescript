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
const adressInput = document.getElementById('address')! as HTMLInputElement;

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
Rendering a map with Google Maps
----------------------------------------
Working with maps without credit card
----------------------------------------
