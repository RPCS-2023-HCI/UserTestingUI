import './VideoComponent.css'
import React from 'react';

function VideoComponent() {
  return (
    <div className="First-Tab">
      <iframe allow="camera; microphone; fullscreen; display-capture; autoplay" src="https://meet.jit.si/RPCS-test"></iframe>
    </div>
  );
}

export default VideoComponent;
