import React, { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';

const ItemType = "ACTION_ITEM";

function DroppedItem({ id, x, y, children, updatePosition }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const initialOffset = monitor.getInitialClientOffset();
      const initialSourceOffset = monitor.getInitialSourceClientOffset();

      if (offset && initialOffset && initialSourceOffset) {
        const deltaX = offset.x - initialOffset.x;
        const deltaY = offset.y - initialOffset.y;

        // Calculate the new position based on the initial position plus the delta
        const newLeft = x + deltaX;
        const newTop = y + deltaY;

        updatePosition(item.id, newLeft, newTop);
      }
    },
  }), [id, x, y, updatePosition]);

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      {children}
    </div>
  );
}

export default function MidArea({ sprites, onDrop, updatePosition }) {
  const ref = useRef(null);

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop(item, monitor) {
      const offset = monitor.getClientOffset();
      const initialOffset = monitor.getInitialClientOffset();
      const containerRect = ref.current.getBoundingClientRect();

      if (offset && initialOffset) {
        // Calculate the new position relative to the top-left corner of the container
        const x = offset.x - containerRect.left;
        const y = offset.y - containerRect.top;

        const droppedItem = sprites.find(sprite => sprite.id === item.id);
        if (droppedItem) {
          updatePosition(item.id, x, y);
        } else {
          onDrop(item.id, x, y, item.children);
        }
      }
    },
  }), [onDrop, sprites, updatePosition]);

  return (
    <div
      ref={drop}
      className="flex-1 h-full overflow-visible p-2 w-full border border-gray-300 rounded-lg"
      style={{ position: 'relative', overflow: 'visible' }}
    >
      <div ref={ref} style={{ position: 'relative', height: '100%', width: '100%' }}>
        {sprites.map(sprite => (
          <DroppedItem
            key={sprite.id}
            id={sprite.id}
            x={sprite.x}
            y={sprite.y}
            updatePosition={updatePosition}
          >
            {sprite.children}
          </DroppedItem>
        ))}
      </div>
    </div>
  );
}
