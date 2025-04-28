// tripcase
// By John Wells (https://github.com/madmod)
//
// Command line interface to the unofficial TripCase API client.
//
'use strict';
const util = require('util');
const _ = require('lodash');
const debug = require('debug')('tripcase-cli');


// Download trip images
const download = require('download');
async function downloadImage(url, destination) {
    try {
        debug(`Starting image download from ${url}...`);
        await download(url, destination, { extract: true });
        debug('Download of image complete!');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Convert callback-based methods to promise-based methods

async function fetchAllData(api) {
  const loginAsync = util.promisify(api.login.bind(api));
  const getTripsAsync = util.promisify(api.getTrips.bind(api));
  const getTripDetailsAsync = util.promisify(api.getTripDetails.bind(api));
  try {
    const user = (await loginAsync()).body;
    debug('Logged in successfully');

    debug('Fetching trips...');
    const trips = _.uniqBy([
      // Assuming the body contains the trip data in JSON format
      ...(await getTripsAsync(true, false)).body,
      ...(await getTripsAsync(true, true)).body,
      ...(await getTripsAsync(false, false)).body,
      ...(await getTripsAsync(false, true)).body,
    ], 'id');

    for (let trip of trips) {
      debug(`fetching details for ${trip.name}...`);
      const tripDetailsRes = await getTripDetailsAsync(trip.id);
      const tripDetails = tripDetailsRes.body; // Again, assuming the body has the details in JSON format
      downloadImage(tripDetails['closest_image_mobi_xlarge'],'./export/images/');
      trip.details = tripDetails;
      debug(`done.`);
    }

    return { user, trips };

  } catch (err) {
    console.error('An error occurred:', err);
  }
}
exports.fetchAllData = fetchAllData;
