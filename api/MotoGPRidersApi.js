const API_BASE_URL = "https://api.motogp.pulselive.com/motogp/v1";

/**
 * Mengambil data pembalap dari API MotoGP.
 * @returns {Promise<Array>} - Daftar pembalap
 */
export const fetchRiders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/riders`);
    if (!response.ok) {
      throw new Error("Failed to fetch riders data");
    }
    const data = await response.json();

    // Memetakan data pembalap
    const riders = data.map((rider) => ({
      id: rider.id,
      name: rider.name,
      surname: rider.surname,
      birth_city: rider.birth_city,
      birth_date: rider.birth_date,
      team: rider.current_career_step?.team?.name || "Unknown Team",
      team_id: rider.current_career_step?.team?.id || "unknown",
      team_picture: rider.current_career_step?.team?.picture || null,
      category: rider.current_career_step?.category?.name || "Unknown Category",
      portrait: rider.current_career_step?.pictures?.portrait || null,
    }));
    return riders;
  } catch (error) {
    console.error("Error fetching riders data:", error);
    throw error;
  }
};

/**
 * Mengambil data tim berdasarkan data pembalap.
 * @returns {Promise<Array>} - Daftar tim
 */
export const fetchTeams = async () => {
  try {
    const riders = await fetchRiders(); // Menggunakan data pembalap dari fetchRiders
    const teams = Array.from(
      new Map(
        riders.map((rider) => [
          rider.team_id, // ID unik untuk setiap tim
          {
            id: rider.team_id,
            name: rider.team,
            picture: rider.team_picture,
            category: rider.category,
            riders: riders
              .filter((r) => r.team_id === rider.team_id)
              .map((r) => `${r.name} ${r.surname}`),
          },
        ])
      ).values()
    );
    return teams;
  } catch (error) {
    console.error("Error fetching teams data:", error);
    throw error;
  }
};
