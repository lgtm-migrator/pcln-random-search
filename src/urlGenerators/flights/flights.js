const random = require('lodash/random')
const queryParams = require('query-string')
const { format, addDays } = require('date-fns')

// https://www.priceline.com
// /m/fly/search/NYC-SFO-20190424/SFO-NYC-20190426/
// ?cabin-class=ECO
// &no-date-search=false
// &search-type=1111
// &num-adults=1
// &num-youths=1
// &num-children=1
// &num-infants=1

const ROOT_URL = 'www.priceline.com'
const SEARCH_URL = '/m/fly/search/'
const CABIN_CLASSES = ['ECO', 'PEC', 'BUS', 'FST']
const CITIES = ['NYC', 'PHL', 'WAS', 'LAS', 'LAX', 'IAH']
const DATE_FORMAT = 'YYYYMMDD'

function _cabinClass() {
  const index = random(0, CABIN_CLASSES.length)
  return CABIN_CLASSES[index]
}

function _cities() {
  const cityCopy = [...CITIES]
  const origin = cityCopy.splice(random(0, cityCopy.length - 1), 1)[0]
  const destination = cityCopy.splice(random(0, cityCopy.length - 1), 1)[0]
  return { origin, destination }
}

function _dates() {
  const departDate = addDays(new Date(), random(0, 35))
  const returnDate = addDays(departDate, random(0, 9))
  return {
    departDate: format(departDate, DATE_FORMAT),
    returnDate: format(returnDate, DATE_FORMAT)
  }
}

function _slices() {
  const { origin, destination } = _cities()
  const { departDate, returnDate } = _dates()
  return `${origin}-${destination}-${departDate}/${destination}-${origin}-${returnDate}/`
}

function _passengers() {
  // Does not cover unaccompanied minor case
  const numAdults = random(1, 8);
  const numChildren = random(0, 8 - numAdults);
  const numYouths = random(0, 8 - (numAdults + numChildren));
  const numInfants = (numAdults + numChildren + numYouths) <= 7 ? random(0, 1) : 0;
  return {
    'num-adults': numAdults,
    'num-children': numChildren,
    'num-youths': numYouths,
    'num-infants': numInfants
  }
}

export function randomFlight(envUrl) {
  // Static params
  const staticQp = {
    'no-date-search': false,
    'search-type': 1111
  }
  const slices = _slices()
  const qp = queryParams.stringify({
    'cabin-class': _cabinClass(),
    ..._passengers(),
    ...staticQp,
  })
  return `https://${envUrl || ROOT_URL}${SEARCH_URL}${slices}?${qp}`
}
