import React, { useState } from "react";

import FirstTab from "../all tabs/first tab";
import SecondTab from "../all tabs/second tab";

// Starter code sourced from: https://blog.logrocket.com/how-to-build-tab-component-react/ 

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <div className="Tabs">
      {/* Tab nav */}
      <ul className="nav">
        <li>Tab 1</li>
        <li>Tab 2</li>
      </ul>
      <div className="outlet">
        <FirstTab />
        <SecondTab />
      </div>
    </div>
  );
};
export default Tabs;