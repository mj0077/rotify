
import React from "react";
import meals from "@/Meals";
import MealCard from "@/components/MealCard";

const PlansPage = () => {

  // console.log(data)

  return (
    <div className="bg-[#1a0000] px-28 py-10 flex flex-col items-end justify-evenly flex-wrap my-plate-cover z-10 gap-2">

      {meals.map(meal => <MealCard details={meal} key={meal.name}/>)}
      

    </div>
  );
};

export default PlansPage;
