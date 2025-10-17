import React, { useState } from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FilterScreen from './FilterScreen';
import HomeScreen from './HomeScreen';
import AddMenuItem from './AddMenuItem';
import { Ionicons } from '@expo/vector-icons';
import AnimatedSplashScreen from './AnimatedSplashScreen';
import { menuItems, MenuItem } from '../../data';

export type RootTabParamList = {
    Home: { menuItems: MenuItem[] };
    AddMenuItem: undefined;
    // Add for POE 3
    //FilterScreen: { onFilter: (filter: Filter) => void };
};

const Tab = createBottomTabNavigator<RootTabParamList>();

interface Filter {
    course: string;
    price: string;
}

const screenOptions: (props: { route: any }) => BottomTabNavigationOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'alert-circle';

        if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'AddMenuItem') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
        }
        // Add for POE 3
        // else if (route.name === 'FilterScreen') {
        //     iconName = focused ? 'filter' : 'filter-outline';
        // }
        return <Ionicons name={iconName} size={size} color={color} />;
    },
});

export default function AppNavigator() {
    const [showSplash, setShowSplash] = useState(true);
    const [filters, setFilters] = useState<Filter>({ course: 'All', price: '' });

    if (showSplash) {
        return (
            <AnimatedSplashScreen onAnimationFinish={() => setShowSplash(false)} />
        );
    }

    const handleFilter = (filter: Filter) => {
        setFilters(filter);
    };

    const filteredMenuItems = menuItems.filter((item) => {
        const courseMatch = filters.course === 'All' || item.course === filters.course;
        const priceMatch = filters.price === '' || item.price <= parseFloat(filters.price);
        return courseMatch && priceMatch;
    });

    return (
        <Tab.Navigator screenOptions={screenOptions} id={undefined}>
            {/* Add for POE 3 */}
            {/**<Tab.Screen name='FilterScreen' component={FilterScreen} initialParams={{ onFilter: handleFilter }} />**/}
            <Tab.Screen name='Home' component={HomeScreen} initialParams={{ menuItems: filteredMenuItems }} />
            <Tab.Screen name='AddMenuItem' component={AddMenuItem} options={{ tabBarLabel: 'Add Item' }} />
        </Tab.Navigator>
    );
}