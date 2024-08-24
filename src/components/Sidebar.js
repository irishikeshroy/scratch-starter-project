import React ,{useState, useCallback} from "react";
import Icon from "./Icon";
// import Items from "./sidebarItems.json"

// const sidebarItems = Items

const Input = ({ type, defaultValue }) => (
  <input
    type={type}
    defaultValue={defaultValue}
    className="bg-white text-black text-center text-sm rounded-full border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 mx-1"
    style={{
      width: `${Math.max(defaultValue.toString().length + 1, 5)}ch`,
      minWidth: '3ch'
    }}
    onInput={(e) => {
      e.target.style.width = `${Math.max(e.target.value.length + 1, 5)}ch`;
    }}
  />
);

const Dropdown = ({ options }) => (
  <select className="bg-white text-black px-1 mx-1 rounded-full border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600">
    {options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
);




export default function Sidebar({sidebarItems , onSpriteAction}) {




  return (
    <div className="w-50 flex-none h-full overflow-y-auto flex flex-col items-start p-1 border-r border-gray-200 bg-gray-100">
      {sidebarItems?.map((section) => (
        <React.Fragment key={section.id}>
          <div className="font-bold text-lg mb-2">{section.title}</div>
          {section.items.map((item) => (
            <div

            onClick={() => {
              if (item.id) {
                const actionParams = [];
                if (item?.dropdown) actionParams.push(item.dropdown[0]);
                if (item?.input) actionParams.push(item.input.defaultValue);
                onSpriteAction(item?.id(...actionParams));
              }
            }}

              key={item.id}
              className={`flex items-center ${section.backgroundColor} text-white px-1 py-2 my-1 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/50`}
            >
              {item.content.map((text, index) => (
                <React.Fragment key={index}>
                  {index > 0 && " "}
                  {text}
                </React.Fragment>
              ))}
              {item.icon && <Icon {...item.icon} />}
              {item.input && <Input {...item.input} />}
              {item.inputs && item.inputs.map((input, index) => (
                <React.Fragment key={index}>
                  {" "}
                  <Input {...input} />
                  {item.content[index + 1] && ` ${item.content[index + 1]}`}
                </React.Fragment>
              ))}
              {item.dropdown && <Dropdown options={item.dropdown} />}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
