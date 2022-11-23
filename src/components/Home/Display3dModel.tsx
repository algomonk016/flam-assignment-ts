import React, { Suspense, useEffect, useRef, useState, useCallback } from 'react';
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"
import { getWindowDimensions } from 'utils/helper';
import { useDispatch, useSelector } from 'react-redux';

import { Display3dModelProps, ModelProps } from './types'
import { CloseIcon, DARK } from 'constant';
import { Grid } from '@mui/material';
import { DivRef } from 'redux/models';
import { RootState } from 'redux/reducers/'
import { useParentDivRefActions } from 'redux/actions/'
import { DraggableBox } from 'components'
import Modal from 'react-modal';

export const Model = (props: ModelProps) => {
  const { scene } = useGLTF(props.ModelPath)
  return <primitive object={scene} scale={1} />;
}

const Mesh = (props: ModelProps) => {
  return (
    <mesh position={[0, -1, 0]} >
      <ambientLight intensity={1} />
      <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
      <Suspense fallback={null}>
        <Model ModelPath={props.ModelPath} />
      </Suspense>
    </mesh>
  )
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


const Display3dModel = (props: Display3dModelProps): JSX.Element => {
  const { ModelPath, modelPosition, setModelPosition, modelSize } = props;
  const [isModalOpen, setIsModelOpen] = useState<boolean>(false);
  const [windowDimensions, setWindowDimensions] = useState<{ width: number, height: number }>(getWindowDimensions());
  const outerDivRef = useRef<HTMLInputElement>(null)
  const [count, updateState] = useState<number>(0);
  const updateComponent = () => updateState((cnt => cnt + 1));
  const dispatch = useDispatch();
  const parentDivRefActions = useParentDivRefActions(dispatch);

  useEffect(() => {
    function handleResize() {
      const newParentDivRef = outerDivRef.current?.getClientRects();
      parentDivRefActions.updateParentDivRef(newParentDivRef);
      setWindowDimensions(getWindowDimensions());
    }

    const newParentDivRef = outerDivRef.current?.getClientRects();
    parentDivRefActions.updateParentDivRef(newParentDivRef);

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
    updateComponent();
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
        <div onDoubleClick={openInFullView} style={{ width: `${modelSize}px`, height: `${modelSize}px` }} >
          <Canvas camera={{ position: [30, 0, 30], fov: 3 }}>
            <OrbitControls />
            <Mesh key={'mesh-for-small-screen' + count} ModelPath={ModelPath} />
          </Canvas>
        </div>
      </DraggableBox>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Full Screen Modal"
      // shouldCloseOnEsc={false}
      >

        <Grid position={'relative'} padding={10} height={'100vh'} width={'100vw'} >
          <Canvas camera={{ position: [30, 0, 30], fov: 3 }}>
            <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
            <Mesh key={'mesh-for-modal-screen'} ModelPath={ModelPath} />
          </Canvas>

          <button onClick={closeModal} style={{ position: 'absolute', right: '10px', top: '10px', border: '0px', background: 'transparent' }} > <img src={CloseIcon} width={'20px'} height={'20px'} /> </button>
        </Grid>
      </Modal>
    </Grid>
  )
}

export default Display3dModel;