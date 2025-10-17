import React, { createContext, useState } from 'react';

export const MenuContext = createContext({
  menuItems: [],
  addMenuItem: (item) => {},
});

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);

  const addMenuItem = (item) => {
    setMenuItems([...menuItems, { ...item, id: menuItems.length + 1 }]);
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};