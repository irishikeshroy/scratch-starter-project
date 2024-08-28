import React, { useCallback, useState, createContext } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import sidebarItems from "./components/sidebarItems.json";

const DataContext = createContext();

export default function App() {
  const [sprites, setSprites] = useState([{
    id: 'initial-sprite',
    x: 0,
    y: 0,
    direction: 0,
    size: 100,
    effects: {},
    visible: true,
    speech: null, // To store the speech bubble content
    thought: null, // To store the thought bubble content
    costume: 1, // Current costume
  }]);

  const handleSpriteAction = useCallback((action, ...params) => {
    setSprites(prevSprites => prevSprites.map(sprite => {
      switch (action) {
        case 'move':
          const steps = parseInt(params[0], 10);
          const rad = (sprite.direction * Math.PI) / 180; // Convert degrees to radians
          const newX = sprite.x + steps * Math.cos(rad); // Calculate new x based on direction
          const newY = sprite.y + steps * Math.sin(rad); // Calculate new y based on direction
          return { ...sprite, x: newX, y: newY };
        case 'turnRight':
          return { ...sprite, direction: (sprite.direction + parseInt(params[0], 10)) % 360 };
        case 'turnLeft':
          return { ...sprite, direction: (sprite.direction - parseInt(params[0], 10) + 360) % 360 };
        case 'glideToXY':
          const duration = parseInt(params[0], 10) * 1000; // Convert seconds to milliseconds
          const targetX = parseInt(params[1], 10);
          const targetY = parseInt(params[2], 10);

          const startX = sprite.x;
          const startY = sprite.y;
          const deltaX = targetX - startX;
          const deltaY = targetY - startY;

          let startTime = null;

          function glideStep(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            const progress = Math.min(elapsed / duration, 1);

            const currentX = startX + progress * deltaX;
            const currentY = startY + progress * deltaY;

            setSprites(prevSprites => prevSprites.map(s =>
              s.id === sprite.id ? { ...s, x: currentX, y: currentY } : s
            ));

            if (progress < 1) {
              requestAnimationFrame(glideStep);
            }
          }

          requestAnimationFrame(glideStep);

          return sprite;

        case 'pointTowardsMouse':
          const mouseX = params[0];
          const mouseY = params[1];
          const dx = mouseX - sprite.x;
          const dy = mouseY - sprite.y;
          let angle = Math.atan2(dy, dx) * (180 / Math.PI); // Convert radian to degree

          // Adjust the angle for clockwise rotation
          const adjustedAngle = angle+120;

          return { ...sprite, direction: adjustedAngle };

        case 'changeXBy':
          return { ...sprite, x: sprite.x + parseInt(params[0], 10) };
        case 'setXTo':
          return { ...sprite, x: parseInt(params[0], 10) };

        case 'changeYBy':
          return { ...sprite, y: sprite.y + parseInt(params[0], 10) };
        case 'setYTo':
          return { ...sprite, y: parseInt(params[0], 10) };

        case 'say':
          return { ...sprite, speech: params[0], thought: null };

        case 'think':
          return { ...sprite, thought: params[0], speech: null };

        case 'switchCostume':
          return { ...sprite, costume: parseInt(params[0], 10) };

        case 'changeSizeBy':
          return { ...sprite, size: sprite.size + parseInt(params[0], 10) };

        case 'setSizeTo':
          return { ...sprite, size: parseInt(params[0], 10) };

        case 'changeEffect':
          const effect = params[0];
          const value = parseInt(params[1], 10);
          return {
            ...sprite,
            effects: {
              ...sprite.effects,
              [effect]: (sprite.effects[effect] || 0) + value,
            },
          };

        case 'setEffect':
          const effectType = params[0];
          const effectValue = parseInt(params[1], 10);
          return {
            ...sprite,
            effects: { ...sprite.effects, [effectType]: effectValue },
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
      <DataContext.Provider value={sidebarItems}>
        <div className="bg-blue-100 pt-6 font-sans">
          <div className="h-screen overflow-hidden flex flex-row">
            <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
              <Sidebar onSpriteAction={handleSpriteAction} />
              <MidArea />
            </div>
            <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl rounded-tr-xl mr-2">
              <PreviewArea sprites={sprites} setSprites={setSprites} />
            </div>
          </div>
        </div>
      </DataContext.Provider>
    </DndProvider>
  );
}

export { DataContext };
