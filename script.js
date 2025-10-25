// Target location coordinates
//const TARGET_LAT = 13.948103;
//const TARGET_LNG = 100.593083;
const TARGET_LAT = 13.84517;
const TARGET_LNG = 100.57225;
const RANGE_METERS = 150;
let autoRedirectTimeout;

// Target URL - hardcoded directly since base64 provides no real security
const TARGET_URL = 'https://sites.google.com/ku.th/01418113/%E0%B8%AB%E0%B8%99%E0%B8%B2%E0%B8%AB%E0%B8%A5%E0%B8%81?authuser=0';

function redirectToTarget() {
  clearTimeout(autoRedirectTimeout);
  // Validate URL before redirecting to prevent potential security issues
  if (isValidUrl(TARGET_URL)) {
    window.location.href = TARGET_URL;
  } else {
    console.error('Invalid target URL');
    // Optionally show an error to the user
    document.getElementById('errorMessage').textContent = 'Invalid redirect URL';
    showState('error');
  }
}

// Function to validate URL format
function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

// Hide all state divs
function hideAllStates() {
  document.getElementById("loading").classList.add("hidden");
  document.getElementById("inRange").classList.add("hidden");
  document.getElementById("outOfRange").classList.add("hidden");
  document.getElementById("error").classList.add("hidden");
  document.getElementById("refreshButton").classList.add("hidden");
}

// Show specific state
function showState(stateId, showRefresh = true) {
  hideAllStates();
  document.getElementById(stateId).classList.remove("hidden");
  if (showRefresh && stateId !== "loading") {
    document.getElementById("refreshButton").classList.remove("hidden");
  }
}

// Check user's location
function checkLocation() {
  showState("loading", false);

  if (!navigator.geolocation) {
    document.getElementById("errorMessage").textContent =
      "Geolocation is not supported by your browser";
    showState("error");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    // Success callback
    (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      const distance = calculateDistance(
        userLat,
        userLng,
        TARGET_LAT,
        TARGET_LNG
      );
      const distanceRounded = Math.round(distance);

      if (distance <= RANGE_METERS) {
        // User is in range
        document.getElementById("distanceInRange").textContent =
          distanceRounded;
        document.getElementById(
          "userCoordsInRange"
        ).textContent = `${userLat.toFixed(6)}, ${userLng.toFixed(6)}`;
        showState("inRange");
        // Set auto-redirect after 10 seconds
        autoRedirectTimeout = setTimeout(redirectToTarget, 10000);
      } else {
        // User is out of range
        document.getElementById("distanceOutRange").textContent =
          distanceRounded;
        showState("outOfRange");
      }
    },
    // Error callback
    (error) => {
      let errorMsg = "Unable to retrieve your location";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMsg =
            "Location access was denied. Please enable location permissions.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMsg = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMsg = "Location request timed out.";
          break;
      }
      document.getElementById("errorMessage").textContent = errorMsg;
      showState("error");
    },
    // Options
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
}

// Check location on page load
window.addEventListener("load", checkLocation);
