// src/api/MotoGPApi.js
export const fetchMotoGPLiveData = async () => {
    try {
      const response = await fetch("https://api.motogp.pulselive.com/motogp/v1/timing-gateway/livetiming-lite");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching MotoGP live timing data:", error);
      throw error;
    }
  };
  