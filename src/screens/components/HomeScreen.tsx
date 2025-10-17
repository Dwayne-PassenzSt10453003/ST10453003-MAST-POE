import { useEffect,useState } from 'react';
import React from 'react';
import { View, ScrollView} from 'react-native'
import { StyleSheet, Text } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
export default function HomeScreen({navigation,  route}:  any) {

const menuItems = [
    { id: 1, course:'Starters',name: 'Bruschetta', description: 'An Italian appetizer grilled bread topped with tomatoes, garlic, basil, and olive oil.',price: 'R90.99' },
    { id: 2, course:'Starters',name: 'Charcuterie Board', description: 'This dish mainly consists of a selection of cured meats, like salami, variaty of cheeses, and additional edibles like fruits.',price: 'R230.99'},
    { id: 3, course:'Main',name: 'Lamb', description: 'Roasted lamb brisket that is flavourful and contains an enticing amount of juiciness to better fullful the palate',price: 'R95.99'},
    { id: 4, course:'Main',name: 'Macaroni and cheese', description: ' A food comfort that consists out of delicious macaroni and with cheese sauce to give that extra flavour.',price: 'R70.99'},
    { id: 5, course:'Deserts',name: 'Chocolate Mousse', description: 'The texture consists of a light, airy texture it has an intense yet perfectly balanced Chocolate taste.',price: 'R39.99'},
    { id: 6, course:'Deserts',name: 'Strawberry cream cake', description: 'Layered in vanilla cakes dressed in juicy strawberries and covered in whipped cream.',price: 'R219.99'},                
];
const [dishes, setDishes] = useState(menuItems);
useFocusEffect(
    React.useCallback(()=>{
        if (route.params && route.params.newDishes){
            setDishes((prev) => [...prev, route.params.newDishes]);
        }
    },[route.params])
);
    //Avatar Jumping Animation
    const jumpAnimation = useRef(new Animated.Value(0)).current;
    
      useEffect(()  =>{
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

                {/*Dishes Grouped by Course*/}
                {['Starters', 'Main', 'Deserts'].map((course) => (
                    <View key={course}>
                        <Text style={styles.sectionTitle}>{course}</Text>
                        {dishes
                        .filter((d)=> d.course === course)
                        .map((dish) => (
                            <View key={dish.id} style={styles.itemRow}>
                                <Text style={styles.itemText}>
                                    {dish.id}. {dish.name} - {dish.description}
                                    </Text>
                                <Text style={styles.price}>{dish.price}</Text>
                            </View>
                        ))}
                        </View>
                ))}
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
   itemRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
   },
   itemText: {
    flex: 1,
    fontSize: 18,
    color: '#000'
   },
   price: {
    fontSize: 18,
   },
 avatarContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
 }   
});