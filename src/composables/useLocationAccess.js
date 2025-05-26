// src/composables/useLocationAccess.js
import { ref, onMounted } from "vue";

export function useLocationAccess(targetCountryCode) {
  const isAccessAllowed = ref(false);
  const isLoading = ref(true);

  onMounted(async () => {
    try {
      const response = await fetch(
        "http://ip-api.com/json/?fields=status,countryCode"
      );
      if (!response.ok) {
        throw new Error(
          `Geolocation API request failed with status: ${response.status}`
        );
      }
      const data = await response.json();

      if (data.status === "success") {
        if (
          data.countryCode &&
          data.countryCode.toUpperCase() === targetCountryCode.toUpperCase()
        ) {
          isAccessAllowed.value = false;
          console.log(`Access denied: User is in ${data.countryCode}`);
        } else {
          isAccessAllowed.value = true;
          console.log(
            `Access granted: User is in ${
              data.countryCode ||
              `Unknown (country not ${targetCountryCode.toUpperCase()})`
            }`
          );
        }
      } else {
        console.warn(
          "Geolocation check failed or IP is private. Allowing access by default."
        );
        isAccessAllowed.value = true;
      }
    } catch (error) {
      console.error("Error fetching geolocation:", error);
      isAccessAllowed.value = true;
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
