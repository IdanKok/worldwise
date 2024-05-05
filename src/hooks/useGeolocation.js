import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  // State hooks to manage the loading status, the current position, and any errors.
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  // Function to get the current geolocation of the device.
  function getPosition() {
    // Check if the geolocation API is available in the browser.
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    // Set loading state to true while fetching the position.
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // On successful fetch, update the position state with the new coordinates.
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false); // Set loading state to false after fetching.
      },
      (error) => {
        // On error, update the error state with the error message.
        setError(error.message);
        setIsLoading(false); // Set loading state to false after error.
      }
    );
  }

  // Return the states and the getPosition function so they can be used by components.
  return { isLoading, position, error, getPosition };
}
