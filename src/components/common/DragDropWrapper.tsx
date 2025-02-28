import React from 'react';
import { DragDropContext, Droppable, DroppableProps } from 'react-beautiful-dnd';

type DroppableWrapperProps = Omit<DroppableProps, 'children'> & {
  children: DroppableProps['children'];
};

export const DroppableWrapper: React.FC<DroppableWrapperProps> = ({ 
  children,
  droppableId,
  ...props 
}) => (
  <Droppable droppableId={droppableId} {...props}>
    {children}
  </Droppable>
);

interface DragDropWrapperProps {
  onDragEnd: (result: any) => void;
  children: React.ReactNode;
}

export const DragDropWrapper: React.FC<DragDropWrapperProps> = ({ onDragEnd, children }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    {children}
  </DragDropContext>
);