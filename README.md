# Location-check

Simple browser-based location checker that verifies whether the user's current geolocation is within a configured radius from a target point.

Files
- [index.html](index.html)
- [script.js](script.js)
- [README.md](README.md)

How it works
- Uses the browser Geolocation API and the functions defined in [script.js](script.js).
- Distance is computed with the Haversine implementation in [`calculateDistance`](script.js).
- Location flow is controlled by [`checkLocation`](script.js), which updates UI states via [`showState`](script.js) and [`hideAllStates`](script.js).

Configurable constants (in [script.js](script.js))
- [`TARGET_LAT`](script.js) — target latitude.
- [`TARGET_LNG`](script.js) — target longitude.
- [`RANGE_METERS`](script.js) — allowed radius in meters.

Usage
1. Open the page in a browser:  
   $BROWSER file:///workspaces/location-check/index.html
2. Grant location access when prompted. The UI will show one of:
   - In range (authorized) — distance displayed from center.
   - Out of range — current distance shown.
   - Error — permission or device issues.

Troubleshooting
- Ensure location services are enabled and the browser has permission to access location.
- If location isn't available, retry using the "Try Again" or "Refresh Location" buttons, which call [`checkLocation`](script.js).

Notes
- All location processing is done locally in the browser; no location data is stored or sent.