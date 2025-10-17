import React, { useContext, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, Text, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MenuContext } from './MenuContext';

export default function HomeScreen({ navigation, route }: any) {
  const { menuItems, addMenuItem } = useContext(MenuContext);

  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?.newDishes) {
        addMenuItem(route.params.newDishes);
      }
    }, [route?.params])
  );

  // Avatar Jumping Animation
  const jumpAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(jumpAnimation, { toValue: -10, duration: 600, useNativeDriver: true }),
        Animated.timing(jumpAnimation, { toValue: 0, duration: 600, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [jumpAnimation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.menu}>
          <Text style={styles.title}>Main Menu</Text>

          {['Starters', 'Main', 'Deserts'].map(course => (
            <View key={course} style={{ marginTop: 8 }}>
              <Text style={styles.sectionTitle}>
                {course === 'Main' ? 'MAIN COURSE' : course.toUpperCase()}
              </Text>

              {menuItems
                .filter(d => d.course === course)
                .map(dish => (
                  <View key={dish.id} style={styles.itemRow}>
                    <Text style={styles.itemText}>
                      {dish.id}. {dish.name} - {dish.description}
                    </Text>
                    <Text style={styles.price}>R{dish.price}</Text>
                  </View>
                ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Animated Avatar Chef */}
      <Animated.View style={[styles.avatarContainer, { transform: [{ translateY: jumpAnimation }] }]}>
        <Ionicons name="happy-outline" size={34} color="#fff" />
        <Ionicons name="restaurant-outline" size={26} color="#fff" style={{ position: 'absolute', top: -10 }} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6D738F', // bluish background like screenshot
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 120,
  },
  menu: {
    backgroundColor: '#b8860b', // golden paper
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 6,
    width: '78%',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    color: '#3b2c13',
    letterSpacing: 0.6,
    textTransform: 'none',
    textDecorationLine: 'none',
    marginBottom: 6,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 12.5,
    color: '#000',
    lineHeight: 16,
  },
  price: {
    minWidth: 56,
    textAlign: 'right',
    fontSize: 12.5,
    color: '#000',
    paddingLeft: 8,
  },
  avatarContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  }, 
});