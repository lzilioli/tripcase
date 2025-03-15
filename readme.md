# tripcase [![Build Status](https://travis-ci.org/madmod/tripcase.svg?branch=master)](https://travis-ci.org/madmod/tripcase)


# @lzilioli Changes 2025:

[TripCase is retiring](https://www.reddit.com/r/travel/comments/1imzlga/tripcase_retiring/). We need a better way to export.

Heavily modified fork of https://github.com/madmod/tripcase

You can export your flights to an .ics file with the following steps.
You can then import this to iCalendar.

It also exports all trip info to export/all-trips.json, which you could further process
using AI (or have AI enhance the script, or write a new script) to further map the data.
Open an issue in the repo and I can see if we can make a more helpful format.
At least what is here allows you to stuff your data somewhere for now.

I tested with nodejs version 20. I recommend you use nvm. [Install instructions](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script).

Once you have nvm:

```
git clone https://github.com/lzilioli/tripcase.git
cd tripcase
nvm install # install node 20 (specified in the .nvmrc)
nvm use # switch to version 20 (specified in the .nvmrc)
npm install

# creates file at export/flights.ics and export/flight-info.json, export/trips-with-flights.json, export/all-trips.json
npm run flights <username> <password>
```

Support: [Buy me a Coffee](https://buymeacoffee.com/lzilioli)

---

# Former README:

An unofficial TripCase API client.

This uses the internal TripCase mobile API which may change without notice.

## Install

```
$ npm install --save tripcase
```


## Usage

```js
var TripCase = require('tripcase');

var tripcase = new TripCase({
  email: 'user@example.com',
  password: 'supersecret'
});

tripcase.login(function (err, res, body) {
  if (err) throw err;

  tripcase.getTrips(function (err, res, trips) {
    if (err) throw err;
    console.log('upcoming trips', trips);
  });
});
```


## CLI

```
$ npm install --global tripcase
```
```
$ tripcase username password
```


## License

MIT © [madmod](http://johnathanwells.com)

