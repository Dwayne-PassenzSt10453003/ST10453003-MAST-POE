import React, { createContext, useState } from 'react';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  course: string;
  price: string;
}

export const MenuContext = createContext({
  menuItems: [] as MenuItem[],
  addMenuItem: (item: Omit<MenuItem, 'id'>) => {},
  removeMenuItem: (id: number) => {},
});

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [nextId, setNextId] = useState(1);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    setMenuItems([...menuItems, { ...item, id: nextId }]);
    setNextId(nextId + 1);
  };

  const removeMenuItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};