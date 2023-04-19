import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import useWebSocket from 'react-use-websocket';
import wscfg from '../WebSocketConfig';

function Box(props) {
  // websocket subscription
  const { sendMessage, lastPyr, readyState } = useWebSocket(wscfg.WS_URL, {share: true});
  // box pitch, yaw, roll
  const [pyr, setPyr] = useState([0, 0, 0]);

  // update pyr as needed
  useEffect(() => {
    console.log(`got pyr: ${lastPyr}`);
    if ((lastPyr) && (lastPyr.indexOf("pyr") > 0)) {
      let pyrData = JSON.parse(lastPyr);
      console.log(`got pyr: ${pyrData}`);
      setPyr((prev) => {
        console.log(`pyr: ${pyrData.pyr}`);
        return pyrData.pyr;
      });
    } else {
      setPyr((prev) => { console.log("setting pyr!"); return [1, 1, 1]; });
    }
  }, [lastPyr, setPyr]);

  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    //return ref.current.rotation.x = pyr[0], ref.current.rotation.y = pyr[1], ref.current.rotation.z = pyr[2]
  });
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
        <mesh
          postion={[pyr]}
          ref={ref}
          rotation={pyr}
          scale={clicked ? 1.5 : 1}
          onClick={(event) => click(!clicked)}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}>
          <boxGeometry args={[1, 2, 2]} />
          <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
  )
}

export default function ThreeViewer() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
  <Canvas width="640" height="480">
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box />
  </Canvas>
  );
}
