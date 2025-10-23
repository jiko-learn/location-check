# location-check

Simple browser-based location checker that verifies whether the user's current geolocation is within a configured radius from a target point.

Files
- [index.html](index.html)
- [README.md](README.md)

How it works
- Uses the browser Geolocation API and the functions defined in [index.html](index.html).
- Distance is computed with the Haversine implementation in [`calculateDistance`](index.html).
- Location flow is controlled by [`checkLocation`](index.html), which updates UI states via [`showState`](index.html) and [`hideAllStates`](index.html).

Configurable constants (in [index.html](index.html))
- [`TARGET_LAT`](index.html) — target latitude.
- [`TARGET_LNG`](index.html) — target longitude.
- [`RANGE_METERS`](index.html) — allowed radius in meters.

Usage
1. Open the page in a browser:  
   $BROWSER file:///workspaces/location-check/index.html
2. Grant location access when prompted. The UI will show one of:
   - In range (authorized) — distance displayed from center.
   - Out of range — current distance shown.
   - Error — permission or device issues.

Troubleshooting
- Ensure location services are enabled and the browser has permission to access location.
- If location isn't available, retry using the "Try Again" or "Refresh Location" buttons, which call [`checkLocation`](index.html).

Notes
- All location processing is done locally in the browser; no location data is stored or sent.