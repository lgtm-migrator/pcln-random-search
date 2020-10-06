import random from 'lodash/random'
import queryString from 'query-string'
import {format, addDays} from 'date-fns'
import moment from 'moment'

import { envs } from "../../constants";

// https://www.priceline.com
// /m/fly/search/NYC-SFO-20190424/SFO-NYC-20190426/
// ?cabin-class=ECO
// &no-date-search=false
// &search-type=1111
// &num-adults=1
// &num-youths=1
// &num-children=1
// &num-infants=1

const ROOT_URL = "www.priceline.com";
const SEARCH_URL = "/m/fly/search/";
const CABIN_CLASSES = ["ECO", "PEC", "BUS", "FST"];
const CITIES = ["NYC", "PHL", "WAS", "LAS", "LAX", "IAH"];
const DATE_FORMAT = "yyyyMMdd";

function _cabinClass() {
  const index = random(0, CABIN_CLASSES.length);
  return CABIN_CLASSES[index];
}

function _cities() {
  const cityCopy = [...CITIES];
  const origin = cityCopy.splice(random(0, cityCopy.length - 1), 1)[0];
  const destination = cityCopy.splice(random(0, cityCopy.length - 1), 1)[0];
  const destinationMd = cityCopy.splice(random(0, cityCopy.length - 1), 1)[0];
  return { origin, destination, destinationMd };
}

function _dates() {
  const departDate = addDays(new Date(), random(0, 35));
  const returnDate = addDays(departDate, random(0, 9));
  return {
    departDate: format(departDate, DATE_FORMAT),
    returnDate: format(returnDate, DATE_FORMAT),
  };
}

function multiDestSlice() {
  let departDate = addDays(new Date(), random(0, 35));
  const { origin, destination, destinationMd } = _cities();
  const slices = [
    origin,
    destination,
    destination,
    destinationMd,
    destinationMd,
    origin,
  ];

  for (let i = 0; i < 3; i++) {
    const departDateStr = format(departDate, DATE_FORMAT);
    const orig = slices[i];
    const dest = slices[i + 1];

    slices.push(`${orig}-${dest}-${departDateStr}`);

    departDate = addDays(departDate, random(1, 3));
  }

  return slices.join("/");
}

function _slices(tripType) {
  const { origin, destination } = _cities();
  const { departDate, returnDate } = _dates();

  if (tripType === "RT") {
    return `${origin}-${destination}-${departDate}/${destination}-${origin}-${returnDate}/`;
  } else if (tripType === "OW") {
    return `${origin}-${destination}-${departDate}`;
  }

  return multiDestSlice();
}

function _expressDealSlices(tripType) {
  const origin = 'NYC'
  const destination = 'SFO'
  // Get date of upcoming Sunday
  const departDate = moment().weekday(7).format('YYYYMMD')
  // Add 3 days to depart date
  const returnDate = moment(departDate).add(3, 'days').format('YYYYMMD')

  if (tripType === 'RT') {
    return `${origin}-${destination}-${departDate}/${destination}-${origin}-${returnDate}/`
  } else if (tripType === 'OW') {
    return `${origin}-${destination}-${departDate}`
  }

  return multiDestSlice()
}

function _passengers(max = 8) {
  // Does not cover unaccompanied minor case
  const numAdults = random(1, max);
  const numChildren = random(0, max - numAdults);
  const numYouths = random(0, max - (numAdults + numChildren));
  const numInfants =
    numAdults + numChildren + numYouths <= max - 1 ? random(0, 1) : 0;
  return {
    "num-adults": numAdults,
    "num-children": numChildren,
    "num-youths": numYouths,
    "num-infants": numInfants,
  };
}

export function randomFlight(env, maxPassengers, tripType) {
  // Static params
  const staticQp = {
    "no-date-search": false,
    "search-type": 1111,
  };
  const slices = _slices(tripType);
  const qp = queryString.stringify({
    "cabin-class": _cabinClass(),
    ..._passengers(maxPassengers),
    ...staticQp,
  });
  const envUrl = envs[env].urlRoot;
  return `https://${envUrl || ROOT_URL}${SEARCH_URL}${slices}?${qp}`;
}

export function expressDealFlight(env, maxPassengers, tripType) {
  // Static params
  const staticQp = {
    'no-date-search': false,
    'search-type': 1111
  }
  const slices = _expressDealSlices(tripType)
  const qp = queryString.stringify({
    'cabin-class': 'ECO',
    ..._passengers(maxPassengers),
    ...staticQp,
  })
  const envUrl = envs[env].urlRoot
  return `https://${envUrl || ROOT_URL}${SEARCH_URL}${slices}?${qp}`
}
