import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import CatSprite from './CatSprite';

const ItemType = 'CAT_SPRITE';

export default function PreviewArea({ sprites, setSprites }) { // Add setSprites to the props
  const moveSprite = useCallback((id, left, top) => {
    setSprites(prevSprites =>
      prevSprites.map(sprite =>
        sprite.id === id ? { ...sprite, x: left, y: top } : sprite
      )
    );
  }, [setSprites]);

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      moveSprite(item.id, left, top);
      return undefined;
    },
  }), [moveSprite]);

  return (
    <div
      ref={drop}
      className="flex-1 h-full overflow-hidden p-2 w-full border border-gray-300 rounded-lg"
      style={{ position: 'relative', height: "400px" }}
    >
      {sprites.map(sprite => (
        <CatSprite
          key={sprite.id}
          id={sprite.id}
          left={sprite.x}
          top={sprite.y}
          direction={sprite.direction}
          size={sprite.size}
          effects={sprite.effects}
          visible={sprite.visible}
          speech={sprite.speech ?? sprite.thought}
         
        />
      ))}
    </div>
  );
}
