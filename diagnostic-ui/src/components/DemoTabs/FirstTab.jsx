// Starter code sourced from: https://blog.logrocket.com/how-to-build-tab-component-react/ 

import React from "react";
const FirstTab = () => {
  return (
    <div className="First-Tab">
      {/* <iframe width="560" 
        height="315" 
        src="https://www.youtube.com/embed/KLOceDeegVs" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe> */}

    {/* <embed type="video/webm" src="udp://@0.0.0.0:5000" width="400" height="300">  */}
      <video src="udp://@0.0.0.0:5000" brightsign-properties="StreamTimeout:0;StreamLowLatency:0;"> 
      </video>
    </div>
  );
};

export default FirstTab;

