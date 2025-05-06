import PlanCard from "@/components/PlanCard";
import React from "react";
import data from "@/PlanDetails";

const PlansPage = () => {

  // console.log(data)

  return (
    <div className="py-10 flex justify-evenly flex-wrap my-plate-cover z-10 gap-2">
      {data.map((plan) => (
        <PlanCard details={plan} key={plan.plan_id}/>
      ))}

    </div>
  );
};

export default PlansPage;
