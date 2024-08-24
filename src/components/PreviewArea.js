import React, { useState, useCallback, useEffect , useContext } from 'react';
import { useDrop } from 'react-dnd';
import CatSprite from './CatSprite';
import data from "../App"

const ItemType = 'CAT_SPRITE';

export default function PreviewArea() {
  const [sprites, setSprites] = useState([]);
  const  sidebarItems = useContext(data)

  useEffect(() => {
    // Initialize with one sprite if there are none
    if (sprites.length === 0) {
      setSprites([{ id: 'initial-sprite', x: 0, y: 0, direction: 0, size: 100, effects: {} , visible : true }]);
    }
  }, []);

  const moveSprite = useCallback((id, left, top) => {
    setSprites(prevSprites =>
      prevSprites.map(sprite =>
        sprite.id === id ? { ...sprite, x: left, y: top , } : sprite
      )
    );
  }, []);

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
        />
      ))}
    </div>
  );
}