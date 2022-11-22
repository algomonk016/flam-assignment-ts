import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"
import { getWindowDimensions } from 'utils/helper';

import { Display3dModelProps } from './types'
import { DARK } from 'constant';
import { Grid } from '@mui/material';

const Display3dModel = (props: Display3dModelProps): JSX.Element => {
  const { ModelPath } = props;
  const [isModalOpen, setIsModelOpen] = useState<boolean>(false);
  const [windowDimensions, setWindowDimensions] = useState<{width: number, height: number}>(getWindowDimensions());
  const outerDivRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openInFullView = () => {
    openModal();
  }

  const openModal = () => {
    setIsModelOpen(true);
  }

  const closeModal = () => {
    setIsModelOpen(false);
    window.location.reload();
  }

  return (
    <Grid
      ref={outerDivRef}
      style={{
        height: windowDimensions.height * 0.75,
        borderColor: DARK,
        border: '1px solid',
        borderRadius: '10px'
      }}
      m={3}
    >
      yohoho
    </Grid>
  )
}

export default Display3dModel;