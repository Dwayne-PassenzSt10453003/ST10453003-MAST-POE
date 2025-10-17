export interface MenuItem {
    id: number;
    name: string;
    course: 'Starter' | 'Main' | 'Dessert';
    price: number;
}

export const menuItems: MenuItem[] = [
    {
        id: 1,
        name: 'Caprese Salad',
        course: 'Starter',
        price: 8.99,
    },
    {
        id: 2,
        name: 'Garlic Bread',
        course: 'Starter',
        price: 5.99,
    },
    {
        id: 3,
        name: 'Steak',
        course: 'Main',
        price: 19.99,
    },
    {
        id: 4,
        name: 'Spaghetti Carbonara',
        course: 'Main',
        price: 14.99,
    },
    {
        id: 5,
        name: 'Chocolate Cake',
        course: 'Dessert',
        price: 6.99,
    },
    {
        id: 6,
        name: 'Cheesecake',
        course: 'Dessert',
        price: 7.99,
    },
];
