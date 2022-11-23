import React, { useState } from "react";
import { Header, Display3dModel } from "components/";
import { COORDS } from 'constant'

import { ModelPosition } from "components/Home/types";

const Home = (): JSX.Element => {
  const ModelPath = 'https://d1a370nemizbjq.cloudfront.net/2c761087-41ea-4774-9f9b-b696dd7c4e01.glb';

  const [modelPosition, setModelPosition] = useState<ModelPosition>((!!localStorage.getItem(COORDS)) ? JSON.parse(localStorage.getItem(COORDS)!) : {x: 0, y: 0})
  const [modelSize, setModelSize] = useState<number>(250);

  const updateModelPosition = (newPosition: ModelPosition) => {
    setModelPosition(newPosition);
    localStorage.setItem(COORDS, JSON.stringify(newPosition));
  }

  const updateModelSize = (newModelSize: number) => {
    setModelSize(newModelSize);
  }

  return (
    <div>
      <Header 
        modelSize={modelSize} 
        setModelSize={updateModelSize} 
        setModelPosition={updateModelPosition} 
      />
      <Display3dModel 
        ModelPath={ModelPath} 
        modelPosition={modelPosition} 
        setModelPosition={updateModelPosition} 
        modelSize={modelSize}
      />
      {/* <Header /> */}
    </div>
  )
}

export default Home;