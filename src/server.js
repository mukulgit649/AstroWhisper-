const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swisseph = require('swisseph');
const moment = require('moment-timezone');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/calculate', async (req, res) => {
  const { date, time, lat, lon, tz, style, ayanamsa } = req.body;

  // Convert local time to UTC
  const local = moment.tz(`${date} ${time}`, tz);
  const utc = local.clone().utc();
  const year = utc.year();
  const month = utc.month() + 1;
  const day = utc.date();
  const hour = utc.hour() + utc.minute() / 60;

  // Set sidereal mode for Vedic
  if (style === 'vedic') {
    swisseph.swe_set_sid_mode(swisseph.SE_SIDM_LAHIRI, 0, 0); // or use ayanamsa param
  } else {
    swisseph.swe_set_sid_mode(swisseph.SE_SIDM_FAGAN_BRADLEY, 0, 0); // for Western, use tropical
  }

  // Calculate planetary positions
  const planets = [
    swisseph.SE_SUN, swisseph.SE_MOON, swisseph.SE_MERCURY, swisseph.SE_VENUS,
    swisseph.SE_MARS, swisseph.SE_JUPITER, swisseph.SE_SATURN,
    swisseph.SE_URANUS, swisseph.SE_NEPTUNE, swisseph.SE_PLUTO, swisseph.SE_MEAN_NODE
  ];

  const results = {};
  for (let planet of planets) {
    const pos = swisseph.swe_calc_ut(
      swisseph.swe_julday(year, month, day, hour, swisseph.SE_GREG_CAL),
      planet,
      style === 'vedic' ? swisseph.SEFLG_SIDEREAL : swisseph.SEFLG_SWIEPH
    );
    results[planet] = pos;
  }

  // Calculate houses/ascendant
  const houseRes = swisseph.swe_houses(
    swisseph.swe_julday(year, month, day, hour, swisseph.SE_GREG_CAL),
    style === 'vedic' ? swisseph.SEFLG_SIDEREAL : swisseph.SEFLG_SWIEPH,
    lat,
    lon
  );

  res.json({
    planets: results,
    houses: houseRes
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Astro backend running on port ${PORT}`));
