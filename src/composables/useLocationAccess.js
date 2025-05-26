// src/composables/useLocationAccess.js
import { ref, onMounted } from "vue";

export function useLocationAccess(targetCountryCode) {
  // It's often safer to default to false and explicitly set to true when conditions are met.
  // Or, if your default behavior is "allow unless explicitly denied", then true is fine.
  // Based on your original logic, it seems you default to ALLOWING access on error/uncertainty.
  const isAccessAllowed = ref(true); // Defaulting to true as per original error handling logic
  const isLoading = ref(true);

  onMounted(async () => {
    try {
      // For higher rate limits and more reliable service, consider getting a free token from ipinfo.io
      // and appending it to the URL: e.g., https://ipinfo.io/json?token=YOUR_TOKEN_HERE
      const response = await fetch("https://ipinfo.io/json");

      if (!response.ok) {
        // This handles network errors or HTTP statuses like 4xx, 5xx
        throw new Error(
          `Geolocation API request failed with status: ${response.status}`
        );
      }

      const data = await response.json();
      // ipinfo.io response structure is different.
      // Example: { "ip": "...", "hostname": "...", "city": "...", "region": "...", "country": "US", ... }
      // We need the 'country' field.

      const fetchedCountryCode = data.country; // ipinfo.io uses 'country'

      if (fetchedCountryCode) {
        // Successfully fetched country code
        if (
          fetchedCountryCode.toUpperCase() === targetCountryCode.toUpperCase()
        ) {
          isAccessAllowed.value = false; // DENY access if user is in the target country
          console.log(
            `Access DENIED: User is in ${fetchedCountryCode} (target: ${targetCountryCode.toUpperCase()})`
          );
        } else {
          isAccessAllowed.value = true; // ALLOW access if user is NOT in the target country
          console.log(
            `Access GRANTED: User is in ${fetchedCountryCode} (not target: ${targetCountryCode.toUpperCase()})`
          );
        }
      } else {
        // This case handles scenarios where ipinfo.io returns a 200 OK
        // but no country information (e.g., for a local IP, or if 'country' field is missing)
        console.warn(
          "Geolocation check successful, but country code not found in ipinfo.io response. Allowing access by default."
        );
        isAccessAllowed.value = true; // Default to allowing access
      }
    } catch (error) {
      console.error("Error fetching geolocation:", error);
      isAccessAllowed.value = true; // Default to allowing access on any API error
      console.warn("Allowing access due to geolocation API error.");
    } finally {
      isLoading.value = false;
    }
  });

  return {
    isAccessAllowed,
    isLoading,
  };
}
