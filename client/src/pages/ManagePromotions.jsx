import {
  useEffect,
  useState,
} from "react";

import PromotionForm
from "../components/PromotionForm";

import PromotionList
from "../components/PromotionList";

import {
  getAllPromotions
} from "../services/promotionService";

const ManagePromotions = () => {

  const [promotions, setPromotions] =
    useState([]);

  useEffect(() => {

    fetchPromotions();

  }, []);

  const fetchPromotions = async () => {

    try {

      const data =
        await getAllPromotions();

      setPromotions(data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Promotions Management
      </h1>

      <PromotionForm />

      <PromotionList
        promotions={promotions}
      />

    </div>
  );
};

export default ManagePromotions;