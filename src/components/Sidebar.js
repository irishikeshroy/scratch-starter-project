import React, { useState } from "react";
import Icon from "./Icon";

const Input = ({ type, value, onChange, max }) => (
  <input
    type={type}
    value={value}
    className="bg-white text-black text-center text-sm rounded-full border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 mx-1"
    style={{
      width: `${Math.max(value.toString().length + 1, 5)}ch`,
      minWidth: '3ch'
    }}
    onChange={onChange} // Ensure the event is correctly passed here
  />
);


const Dropdown = ({ options, value, onChange }) => (
  <select
    value={value}
    className="bg-white text-black px-1 mx-1 rounded-full border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
    onChange={onChange}
  >
    {options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default function Sidebar({ onSpriteAction }) {
  const [actionHistory, setActionHistory] = useState([]);
  const [replayIndex, setReplayIndex] = useState(0);

  const [moveSteps, setMoveSteps] = useState(10);
  const [turnDegreesRight, setTurnDegreesRight] = useState(15);
  const [turnDegreesLeft, setTurnDegreesLeft] = useState(15);
  const [glideSecs, setGlideSecs] = useState(1);
  const [glideToX, setGlideToX] = useState(0);
  const [glideToY, setGlideToY] = useState(0);
  const [direction, setDirection] = useState(90);
  const [changeXBy, setChangeXBy] = useState(10);
  const [setXTo, setSetXTo] = useState(0);
  const [changeYBy, setChangeYBy] = useState(10);
  const [setYTo, setSetYTo] = useState(0);
  const [sayText, setSayText] = useState("Hello!");
  const [sayDuration, setSayDuration] = useState(2);
  const [thinkText, setThinkText] = useState("Hmm...");
  const [thinkDuration, setThinkDuration] = useState(2);
  const [costume, setCostume] = useState(1);
  const [sizeChange, setSizeChange] = useState(10);
  const [setSize, setSetSize] = useState(100);
  const [effectValue, setEffectValue] = useState(25);
  const [effectType, setEffectType] = useState("color");

  const costumeOptions = ["costume1", "costume2", "costume3"];
  const effectOptions = ["brightness", "contrast"];

  const addActionToHistory = (actionType, ...params) => {
    const newAction = { actionType, params };
    setActionHistory((prevHistory) => [...prevHistory, newAction]);
    onSpriteAction(actionType, ...params); // Trigger the action immediately
  };

  const handleReplay = () => {
    if (replayIndex >= 0 && replayIndex < actionHistory.length) {
      const action = actionHistory[replayIndex];
      onSpriteAction(action.actionType, ...action.params);
    }
  };

  return (
    <div className="w-50 flex-none h-full overflow-y-auto flex flex-col items-start p-1 border-r border-gray-200 bg-gray-100">
      <div className="font-bold text-lg mb-2">Replay</div>
      <div
        className="flex items-center bg-green-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-green-500/50"
        onClick={handleReplay}
      >
        Replay action
        <Input
  type="number"
  value={replayIndex}
  onChange={(e) => {
    const val = parseInt(e.target.value, 10);
    if (val >= 0 && val < actionHistory.length) {
      setReplayIndex(val);
    }
  }}
  max={actionHistory.length}
/>
      </div>

      <div className="font-bold text-lg mb-2">Motion</div>

      <div
        className="flex items-center bg-blue-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/50"
        onClick={() => addActionToHistory('move', moveSteps)}
      >
        move steps
        <Input
          type="number"
          value={moveSteps}
          onChange={(e) => setMoveSteps(e.target.value)}
        />
      </div>

      <div
        className="flex items-center bg-blue-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/50"
        onClick={() => addActionToHistory('turnRight', turnDegreesRight)}
      >
        turn degrees
        <Icon name="redo" size={15} className="text-white mx-2" />
        <Input
          type="number"
          value={turnDegreesRight}
          onChange={(e) => setTurnDegreesRight(e.target.value)}
        />
      </div>

      <div
        className="flex items-center bg-blue-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/50"
        onClick={() => addActionToHistory('turnLeft', turnDegreesLeft)}
      >
        turn degrees
        <Icon name="undo" size={15} className="text-white mx-2" />
        <Input
          type="number"
          value={turnDegreesLeft}
          onChange={(e) => setTurnDegreesLeft(e.target.value)}
        />
      </div>

      <div
        className="flex items-center bg-blue-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/50"
        onClick={() => addActionToHistory('glideToXY', glideSecs, glideToX, glideToY)}
      >
        glide 

        <Input
          type="number"
          value={glideSecs}
          onChange={(e) => setGlideSecs(e.target.value)}
        />
        
        secs to x:
     
       
        <Input
          type="number"
          value={glideToX}
          onChange={(e) => setGlideToX(e.target.value)}
        />

        y:
        <Input
          type="number"
          value={glideToY}
          onChange={(e) => setGlideToY(e.target.value)}
        />
      </div>

      <div
        className="flex items-center bg-blue-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/50"
        onClick={(event) => addActionToHistory('pointTowardsMouse', event.clientX, event.clientY)}
      >
        point towards mouse direction
      </div>

      <div
        className="flex items-center bg-blue-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/50"
        onClick={() => addActionToHistory('changeXBy', changeXBy)}
      >
        change x by
        <Input
          type="number"
          value={changeXBy}
          onChange={(e) => setChangeXBy(e.target.value)}
        />
      </div>

      <div
        className="flex items-center bg-blue-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/50"
        onClick={() => addActionToHistory('setXTo', setXTo)}
      >
        set x to
        <Input
          type="number"
          value={setXTo}
          onChange={(e) => setSetXTo(e.target.value)}
        />
      </div>

      <div
        className="flex items-center bg-blue-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/50"
        onClick={() => addActionToHistory('changeYBy', changeYBy)}
      >
        change y by
        <Input
          type="number"
          value={changeYBy}
          onChange={(e) => setChangeYBy(e.target.value)}
        />
      </div>

      <div
        className="flex items-center bg-blue-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/50"
        onClick={() => addActionToHistory('setYTo', setYTo)}
      >
        set y to
        <Input
          type="number"
          value={setYTo}
          onChange={(e) => setSetYTo(e.target.value)}
        />
      </div>

      <div className="font-bold text-lg mb-2">Looks</div>

      <div
        className="flex items-center bg-purple-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
        onClick={() => addActionToHistory('say', sayText)}
      >
        say
        <Input
          type="text"
          value={sayText}
          onChange={(e) => setSayText(e.target.value)}
        />
        for
        <Input
          type="number"
          value={sayDuration}
          onChange={(e) => setSayDuration(e.target.value)}
        />
        seconds
      </div>

      <div
        className="flex items-center bg-purple-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
        onClick={() => addActionToHistory('think', thinkText)}
      >
        think
        <Input
          type="text"
          value={thinkText}
          onChange={(e) => setThinkText(e.target.value)}
        />
        for
        <Input
          type="number"
          value={thinkDuration}
          onChange={(e) => setThinkDuration(e.target.value)}
        />
        seconds
      </div>

      <div
        className="flex items-center bg-purple-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
        onClick={() => addActionToHistory('switchCostume', costume)}
      >
        switch costume to
        <Dropdown
          options={costumeOptions}
          value={costume}
          onChange={(e) => setCostume(e.target.value)}
        />
      </div>

      <div
        className="flex items-center bg-purple-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
        onClick={() => addActionToHistory('changeSizeBy', sizeChange)}
      >
        change size by
        <Input
          type="number"
          value={sizeChange}
          onChange={(e) => setSizeChange(e.target.value)}
        />
      </div>

      <div
        className="flex items-center bg-purple-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
        onClick={() => addActionToHistory('setSizeTo', setSize)}
      >
        set size to
        <Input
          type="number"
          value={setSize}
          onChange={(e) => setSetSize(e.target.value)}
        />
        %
      </div>

      <div
        className="flex items-center bg-purple-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
        onClick={() => addActionToHistory('changeEffect', effectType, effectValue)}
      >
        change
        <Dropdown
          options={effectOptions}
          value={effectType}
          onChange={(e) => setEffectType(e.target.value)}
        />
        effect by
        <Input
          type="number"
          value={effectValue}
          onChange={(e) => setEffectValue(e.target.value)}
        />
      </div>

      <div
        className="flex items-center bg-purple-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
        onClick={() => addActionToHistory('setEffect', effectType, 0)}
      >
        set
        <Dropdown
          options={effectOptions}
          value={effectType}
          onChange={(e) => setEffectType(e.target.value)}
        />
        effect to 0
      </div>

      <div
        className="flex items-center bg-purple-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
        onClick={() => addActionToHistory('clearEffects')}
      >
        clear graphic effects
      </div>

      <div
        className="flex items-center bg-purple-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
        onClick={() => addActionToHistory('show')}
      >
        show
      </div>

      <div
        className="flex items-center bg-purple-500 text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
        onClick={() => addActionToHistory('hide')}
      >
        hide
      </div>
    </div>
  );
}
