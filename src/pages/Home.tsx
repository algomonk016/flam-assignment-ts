import React, { useState } from "react";
import { Header, Display3dModel } from "components/";

export interface ModelPosition {
  x: number;
  y: number;
}

const Home = (): JSX.Element => {
  const ModelPath = 'https://d1a370nemizbjq.cloudfront.net/2c761087-41ea-4774-9f9b-b696dd7c4e01.glb';

  const [modelPosition, setModelPosition] = useState<ModelPosition>({x: 0, y: 0})
  const [modelWidth, setModelWidth] = useState<number>(300);

  const updateModelPosition = (newPosition: ModelPosition) => {
    setModelPosition(newPosition);
  }

  const updateModelWidth = (newModelWidth: number) => {
    setModelWidth(newModelWidth);
  }

  return (
    <div>
      <Header  />
      <Display3dModel ModelPath={ModelPath} />
      <Header />
    </div>
  )
}

export default Home;