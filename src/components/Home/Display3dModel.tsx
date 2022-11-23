import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"
import { getWindowDimensions } from 'utils/helper';
import { useDispatch, useSelector } from 'react-redux';

import { Display3dModelProps, ModelProps } from './types'
import { DARK } from 'constant';
import { Grid } from '@mui/material';
import { DivRef } from 'redux/models';
import { RootState } from 'redux/reducers/'
import { useParentDivRefActions } from 'redux/actions/'
import { DraggableBox } from 'components'

export const Model = (props: ModelProps) => {
  const { scene } = useGLTF(props.ModelPath)
  return <primitive object={scene} scale={1} />;
}


const Display3dModel = (props: Display3dModelProps): JSX.Element => {
  const { ModelPath, modelPosition, setModelPosition, modelSize } = props;
  const [isModalOpen, setIsModelOpen] = useState<boolean>(false);
  const [windowDimensions, setWindowDimensions] = useState<{width: number, height: number}>(getWindowDimensions());
  const outerDivRef = useRef<HTMLInputElement>(null)

  const dispatch = useDispatch();
  const parentDivRefActions = useParentDivRefActions(dispatch);


  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
      const newParentDivRef = outerDivRef.current?.getClientRects();
      parentDivRefActions.updateParentDivRef(newParentDivRef);
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
      position='relative'
      m={3}
    >
      <DraggableBox modelPosition={modelPosition} setModelPosition={setModelPosition} >
        <div onDoubleClick={openInFullView} style={{ width: `${modelSize}px`, height: `${modelSize}px`}} >
          <Canvas camera={{ position: [30, 0, 30], fov: 3 }}>
            <OrbitControls />
            <mesh position={[0, -1, 0]}>
              <ambientLight intensity={1} />
              <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
              <Suspense fallback={null}>
                <Model ModelPath={ModelPath} />
              </Suspense>
            </mesh>
          </Canvas>
        </div>
      </DraggableBox>
    </Grid>
  )
}

export default Display3dModel;