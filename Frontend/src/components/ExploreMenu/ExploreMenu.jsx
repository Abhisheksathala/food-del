import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/food del assets/frontend_assets/assets";

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="explore-Menu" id="exploreMenu">
      <h1>Explore Our Menu</h1>
      <p className="explored-menu-text">
        Unleash Your Palate's Potential: Dive into a Culinary Odyssey with Our
        Exquisite Menu Selections, Where Every Bite Tells a Tale of Indulgence
        and Satisfaction Beyond Compare!
      </p>

      <div className="explor-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div onClick={()=>{setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}} className="menu-item" key={index}>
              <img className={category===item.menu_name?"actives":null} src={item.menu_image} alt="img" />
              <h3>{item.menu_name}</h3>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
