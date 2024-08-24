import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import sidebarItems from "./components/sidebarItems.json"
import { useCallback, useState } from "react";

export default function App() {

  const [sprites, setSprites] = useState(sidebarItems);

  const handleSpriteAction = useCallback((action) => {
    setSprites(prevSprites => prevSprites.map(sprite => {
      switch (action.type) {
        case 'move':
          return { ...sprite, x: sprite.x + action.steps };
        case 'turnRight':
          return { ...sprite, direction: (sprite.direction + action.degrees) % 360 };
        case 'turnLeft':
          return { ...sprite, direction: (sprite.direction - action.degrees + 360) % 360 };
        case 'goTo':
          if (action.position === 'random') {
            return { ...sprite, x: Math.random() * 380, y: Math.random() * 280 };
          }
          // Implement other goTo actions as needed
          return sprite;
        case 'changeSize':
          return { ...sprite, size: sprite.size + action.change };
        case 'setSize':
          return { ...sprite, size: action.size };
        case 'changeEffect':
          return { 
            ...sprite, 
            effects: { 
              ...sprite.effects, 
              [action.effect]: (sprite.effects[action.effect] || 0) + action.change 
            } 
          };
        case 'setEffect':
          return { 
            ...sprite, 
            effects: { ...sprite.effects, [action.effect]: action.value } 
          };
        case 'clearEffects':
          return { ...sprite, effects: {} };
        case 'show':
          return { ...sprite, visible: true };
        case 'hide':
          return { ...sprite, visible: false };
        default:
          return sprite;
      }
    }));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>

    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
        <Sidebar sidebarItems={sprites} onSpriteAction={handleSpriteAction} />

           <MidArea />
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl rounded-tr-xl mr-2">
        <PreviewArea sidebarItems={sprites} onSpriteAction={handleSpriteAction} />
          </div>
      </div>
    </div>

    </DndProvider>
  );
}