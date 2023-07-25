import React, { useState } from "react";

const MenuBlock = () => {
  const [isExpanded, setExpanded] = useState(false);

  const handleExpandToggle = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div className={`menu-block ${isExpanded ? "expanded" : ""}`}>
      <div className="buttons-container">
        <button className="menu-button" onClick={handleExpandToggle}>
          Действие
        </button>
        <button className="menu-button" onClick={handleExpandToggle}>
          Действие
        </button>
        <button className="menu-button" onClick={handleExpandToggle}>
          Действие
        </button>
        <button className="menu-button" onClick={handleExpandToggle}>
          Действие
        </button>
      </div>

      {isExpanded && (
        <div className="additional-tools">
          <p>Дополнительные инструменты</p>
          {/* Здесь может быть любой другой контент */}
        </div>
      )}
    </div>
  );
};

export default MenuBlock;
