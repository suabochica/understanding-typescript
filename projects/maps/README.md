Mapper
=======

Let's build a tiny application to use third party libraries to send HTTP request and also render a map with the help of Google Maps.

Goal
----

Let's build a web application where we can enter an address, then I want to look at this address and convert it into a pair of coordinates with help of Google's APIs. This coordinate will shown on a map with help of Google Maps JavaScript SDK.

🚦 Requisites
-------------

You need an account in Google Cloud Platform (GCP) to get and API key for the [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview). Please look up the Google's pricing page to learn more about costs associated with using Google APIs.

To render maps, please check out the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)

🚀 Launch
---------

To run the web app execute the next command:

```bash
npm run start
```

This loads the server in the next router:

- http://localhost:8080

🧰 Tech Stack
-------------

- typescript
- axios
- webpack
- google maps types