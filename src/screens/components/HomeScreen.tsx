import React, { useEffect, useContext, useRef } from 'react';
import { View, ScrollView, StyleSheet, Text, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MenuContext } from './MenuContext';

export default function HomeScreen({ navigation }: any) {
    const { menuItems, removeMenuItem } = useContext(MenuContext);

    //Avatar Jumping Animation
    const jumpAnimation = useRef(new Animated.Value(0)).current;
    
      useEffect(()  => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(jumpAnimation, {toValue: -10, duration: 600, useNativeDriver: true}),
                Animated.timing(jumpAnimation, {toValue: 0, duration: 600, useNativeDriver: true}),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, []);

return (
       <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.menu}>
                <Text style={styles.title}>Menu</Text>

                {['Starters', 'Main', 'Deserts'].map((course) => {
                    const courseItems = menuItems.filter((d) => d.course === course);
                    return (
                        <View key={course}>
                            <Text style={styles.sectionTitle}>{course}</Text>
                            <Text style={styles.counterText}>({courseItems.length})</Text>
                            {courseItems.length > 0 ? (
                                courseItems.map((dish) => (
                                    <View key={dish.id} style={styles.itemRow}>
                                        <Text style={styles.itemText}>
                                            {dish.id}. {dish.name} - {dish.description}
                                        </Text>
                                        <Text style={styles.price}>R{dish.price}</Text>
                                        <TouchableOpacity onPress={() => removeMenuItem(dish.id)} style={styles.removeButton}>
                                            <Text style={styles.removeButtonText}>Remove</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.placeholderDish}>Empty, Add Dish Now!</Text>
                            )}
                        </View>
                    );
                })}
                <Text style={styles.totalText}>Total ({menuItems.length})</Text>
            </View>

        </ScrollView>
      {/*Animated Avatar Chef*/}
   <Animated.View style={[styles.avatarContainer, {transform: [{translateY: jumpAnimation}]}]}>
   
   <Ionicons name="happy-outline" size={34} color="#fff"/>
   <Ionicons name="restaurant-outline" size={26} color="#fff" style={{ position: 'absolute', top: -10 }}/>
   </Animated.View>
   
   </View>
   );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5B638A',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 120,
},
    menu: {
        flex: 1,
        backgroundColor: '#b8860b',
        padding: 20,
        borderRadius: 12,
        width: '85%',
        shadowColor: '#000',
        shadowOpacity: 0.24,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
    },
   sectionTitle:{
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 5,
    textDecorationLine:'underline',
   },
   counterText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
   },
   itemRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    alignItems: 'flex-start',
   },
   itemText: {
    flex: 1,
    fontSize: 18,
    color: '#000'
   },
   price: {
    fontSize: 18,
   },
   removeButton: {
    backgroundColor: '#d80707ff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
   },
   removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
   },
   placeholderDish: {
    fontSize: 16,
    color: '#A9A9A9',
    marginTop: 10,
    textAlign: 'center',
   },
   totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
   },
 avatarContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
 }   
});
//References//
