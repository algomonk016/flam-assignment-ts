import React, { useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { DragIconFilled } from 'constant'
import { DraggableProps } from "components/DraggableBox/types";
import { ModelPosition } from "components/Home/types";
import { Grid } from "@mui/material";
import { useChildDivRefActions } from "redux/actions";
import { useDispatch } from 'react-redux'

const DraggableBox = (props: DraggableProps) => {
  const { modelPosition, setModelPosition, children } = props;
  const innerDiv = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const childDivRefActions = useChildDivRefActions(dispatch);

  useEffect(() => {
    const newChildDivRef = innerDiv.current?.getClientRects();
    childDivRefActions.updateChlidDivRef(newChildDivRef);
  }, [])

  const trackPos = (data: ModelPosition) => {
    const { x, y } = data;
    setModelPosition({ x, y });
  };

  return (
    <Draggable
      onDrag={(e, data) => trackPos(data)}
      bounds="parent"
      handle="#handle"
      position={modelPosition}
    >
      <Grid
        ref={innerDiv}
        style={{ width: 'fit-content', borderRadius: '10px' }}
        display='flex'
        bgcolor={'ButtonShadow'}
        alignItems={'center'}
        position={'relative'}
      >
        {children}
        <span id="handle" style={{ position: 'absolute', top: '0', right: '0', cursor: 'pointer' }}  >
          <img src={DragIconFilled} style={{ pointerEvents: 'none', width: '25px', height: '25px' }} />
        </span>
      </Grid>
    </Draggable>
  )
}

export default DraggableBox;