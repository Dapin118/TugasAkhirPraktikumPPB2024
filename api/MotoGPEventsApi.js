const API_BASE_URL = 'https://api.motogp.pulselive.com/motogp/v1';

/**
 * Mengambil data acara berdasarkan tahun musim.
 * @param {number} seasonYear - Tahun musim MotoGP.
 * @returns {Promise<Array>} - Daftar acara untuk musim tertentu.
 */
export const fetchEventsBySeason = async (seasonYear) => {
  const eventsUrl = `${API_BASE_URL}/events?seasonYear=${seasonYear}`;
  try {
    const response = await fetch(eventsUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch events for season ${seasonYear}`);
    }
    const events = await response.json();
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
