import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/food del assets/frontend_assets/assets";

const AppDownload = () => {
  return (
    <div className="app-download" id="appdwonload">
      <p>For a Batter Experience, Download the <br /> Tomato App:</p>
      <div className="app-download-platform">
        <a href="https://play.google.com/store/apps/details?id=com.tomatoapp">
          <img src={assets.play_store} alt="Google Play Store" />
        </a>
        <a href="https://apps.apple.com/us/app/tomato/id1234567890">
          <img src={assets.app_store} alt="App Store" />
        </a>
      </div>
    </div>
  );
};

export default AppDownload;
