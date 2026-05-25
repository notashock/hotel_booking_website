import {
  useEffect,
  useState,
} from "react";

import OccupancyCard
from "../components/OccupancyCard";

import {
  getOccupancyStats,
} from "../services/receptionService";

const OccupancyDashboard = () => {

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const data =
        await getOccupancyStats();

      setStats(data);

    } catch (error) {

      console.log(error);
    }
  };

  if (!stats) {

    return (
      <h1 className="text-center mt-10">
        Loading...
      </h1>
    );
  }

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        Occupancy Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <OccupancyCard
          title="Total Rooms"
          value={stats.totalRooms}
        />

        <OccupancyCard
          title="Occupied Rooms"
          value={stats.occupiedRooms}
        />

        <OccupancyCard
          title="Available Rooms"
          value={stats.availableRooms}
        />

      </div>

    </div>
  );
};

export default OccupancyDashboard;