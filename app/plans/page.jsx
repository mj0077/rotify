
import React from "react";
import meals from "@/Meals";
import MealCard from "@/components/MealCard";

const PlansPage = () => {

  // console.log(data)

  return (
    <div className="bg-[#1a0000] pb-24 md:px-28 flex flex-col items-center md:items-end justify-evenly flex-wrap my-plate-cover z-10 landscape:gap-2 portrait:gap-5">

      {meals.map(meal => <MealCard details={meal} key={meal.name}/>)}
      
    </div>
  );
};

export default PlansPage;
