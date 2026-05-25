import { useState } from "react";

import {
  assignRoom
} from "../services/receptionService";

const AssignRoomModal = ({
  booking,
  onClose,
  refreshBookings,
}) => {

  const [roomNumber, setRoomNumber] =
    useState("");

  const handleAssignRoom =
    async () => {
      try {
        await assignRoom(
          booking.id,
          roomNumber
        );

        alert(
          "Room Assigned Successfully"
        );

        refreshBookings();
        onClose();

      } catch (error) {
        console.log(error);
        alert(
          "Failed To Assign Room"
        );
      }
    };

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl w-[400px]">
        <h2 className="text-3xl font-bold mb-5">
          Assign Physical Room
        </h2>

        <p className="mb-4">
          Customer:
          {" "}
          {booking.customerName}
        </p>

        <input
          type="text"
          placeholder="Enter Room Number"
          value={roomNumber}
          onChange={(e) =>
            setRoomNumber(e.target.value)
          }
          className="w-full border p-3 rounded mb-5"
        />

        <div className="flex gap-4">

          <button
            onClick={handleAssignRoom}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Assign Room
          </button>

          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignRoomModal;