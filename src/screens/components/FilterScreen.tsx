import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';

export default function FilterScreen() {
    const [course, setCourse] = useState('All');
    const [price, setPrice] = useState('');
    const route = useRoute();
    const { onFilter } = route.params as { onFilter: (filter: { course: string; price: string }) => void };

    return (
        <View style={styles.container}>
            {/* Course Dropdown */}
            <Text style={styles.label}>Course</Text>
            <View style={styles.dropdown}>
                <Picker
                    selectedValue={course}
                    onValueChange={(itemValue: string) => setCourse(itemValue)}
                >
                    <Picker.Item label="All" value="All" />
                    <Picker.Item label="Starter" value="Starter" />
                    <Picker.Item label="Main" value="Main" />
                    <Picker.Item label="Dessert" value="Dessert" />
                </Picker>
            </View>

            {/* Price Input */}
            <Text style={styles.label}>Price</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter max price"
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={() => onFilter({ course, price })}>
                <Text style={styles.buttonText}>Filter</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5B638A',
        padding: 24,
        justifyContent: 'center',
    },
    label: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 16,
        fontSize: 16,
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 50,
        justifyContent: 'center',
    },
    dropdownText: {
        color: '#222',
        fontSize: 16,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 32,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 50,
    },
    button: {
        backgroundColor: '#FF2D2D',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});