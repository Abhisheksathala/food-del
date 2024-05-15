import React, { useState } from "react";
import "./home.css";

import Header from "./../../components/Header/Header.jsx"; // Assuming Header component is correctly exported
import ExploreMenu from "./../../components/ExploreMenu/ExploreMenu.jsx"; // Assuming ExploreMenu component is correctly exported
import FoodDisplay from "./../../components/FoodDisplay/FoodDisplay";
import AppDownload from './../../components/AppDownload/AppDownload';

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header /> {/* Use uppercase name for component */}
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
      {/* Use uppercase name for component */}
    </div>
  );
};

export default Home;
