import React from "react";
import { Header, Display3dModel } from "components/";

const Home = (): JSX.Element => {
  const ModelPath = 'https://d1a370nemizbjq.cloudfront.net/2c761087-41ea-4774-9f9b-b696dd7c4e01.glb';

  return (
    <div>
      <Header />
      <Display3dModel ModelPath={ModelPath} />
      <Header />
    </div>
  )
}

export default Home;