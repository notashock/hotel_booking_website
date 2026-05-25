const PromotionList = ({
  promotions
}) => {

  return (

    <div className="mt-8">

      <h2 className="text-3xl font-bold mb-5">
        Active Promotions
      </h2>

      <div className="space-y-4">

        {
          promotions.map((promo) => (

            <div
              key={promo.id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <h3 className="text-2xl font-bold">
                {promo.code}
              </h3>

              <p>
                Discount:
                {" "}
                ₹ {promo.discountAmount}
              </p>

              <p>
                Type:
                {" "}
                {promo.type}
              </p>

              <p>
                Expiry:
                {" "}
                {promo.expiryDate}
              </p>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default PromotionList;