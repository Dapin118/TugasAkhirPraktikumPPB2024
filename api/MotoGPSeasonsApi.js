// api/MotoGPSeasonsApi.js
export const fetchSeasonsData = async () => {
  const url = `https://api.motogp.pulselive.com/motogp/v1/results/seasons`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching seasons data:", error);
    throw error;
  }
};
