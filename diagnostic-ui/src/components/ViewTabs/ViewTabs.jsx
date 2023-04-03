import React, { useState } from "react";

import FirstTab from "../TabContent/DemoFirstTab";
import SecondTab from "../TabContent/DemoSecondTab";

// Starter code sourced from: https://blog.logrocket.com/how-to-build-tab-component-react/ 


// TODO: Change to MUI Component
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  //  Functions to handle Tab Switching
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };

  return (
    <div className="Tabs">
      {/* Tab nav */}
      <ul className="nav">
        <li className={activeTab === "tab1" ? "active" : ""} onClick={handleTab1}>
            Car Live Feed
        </li>

        <li className={activeTab === "tab2" ? "active" : ""} onClick={handleTab2}>
          Overhead Camera Feed
        </li>
      </ul>
      <div className="outlet">
        {/* <FirstTab />
        <SecondTab /> */}
        {activeTab === "tab1" ? <FirstTab /> : <SecondTab />}
      </div>
    </div>
  );
};
export default Tabs;