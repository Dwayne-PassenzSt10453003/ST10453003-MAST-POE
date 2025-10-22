import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert, Switch, InputAccessoryView, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuContext } from './MenuContext';
import { useNavigation } from '@react-navigation/native';

export default function AddMenuItem() {
    const { addMenuItem } = useContext(MenuContext);
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [course, setCourse] = useState('Starters');
    const [price, setPrice] = useState('');
    const [isNumericKeyboard, setIsNumericKeyboard] = useState(true);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const inputAccessoryViewID = 'priceInputAccessory';

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleSubmit = () => {
        const priceNumber = parseFloat(price);
        if (isNaN(priceNumber)) {
            Alert.alert('Error', 'Please enter a valid price.');
            return;
        }
        addMenuItem({ name, description, course, price: priceNumber });
        Alert.alert('Success', 'New dish submitted!');
        navigation.goBack();
    };

    const keyboardSwitch = (
        <View style={styles.accessoryView}>
            <Text style={styles.accessoryText}>Switch to {isNumericKeyboard ? 'Default' : 'Numeric'} Keyboard</Text>
            <Switch
                value={isNumericKeyboard}
                onValueChange={setIsNumericKeyboard}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={{ flex: 1, padding: 16 }}>
                        {/*Enter Dish Name*/}
                        <Text style={styles.label}>Dish Name</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder='Enter Dish Name'
                            keyboardType='default'
                            autoComplete='name'
                        />
                        {/*Description*/}
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.descriptionInput]}
                            value={description}
                            onChangeText={setDescription}
                            placeholder='Enter Description'
                            multiline={true}
                            numberOfLines={4}
                            autoComplete='off'
                        />
                        {/*Dropdown for Course*/}
                        <Text style={styles.label}>Course</Text>
                        <View style={styles.dropdown}>
                            <Picker
                                selectedValue={course}
                                onValueChange={(itemValue) => setCourse(itemValue)}
                                style={styles.dropdownText}
                            >
                                <Picker.Item label='Starters' value='Starters' />
                                <Picker.Item label='Main' value='Main' />
                                <Picker.Item label='Deserts' value='Deserts' />
                            </Picker>
                        </View>
                        {/*Price*/}
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={setPrice}
                            placeholder='Enter Price'
                            keyboardType={isNumericKeyboard ? 'numeric' : 'default'}
                            inputAccessoryViewID={inputAccessoryViewID}
                        />
                        {/*Submit Dish Button*/}
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Add Dish!</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {Platform.OS === 'ios' ? (
                <InputAccessoryView nativeID={inputAccessoryViewID}>
                    {keyboardSwitch}
                </InputAccessoryView>
            ) : (
                isKeyboardVisible && keyboardSwitch
            )}
        </SafeAreaView>
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
    },
    label: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 16,
        fontSize: 16,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden', // Ensures the picker corners are rounded
    },
    dropdownText: {
        color: '#222',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#d80707ff',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    accessoryView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    accessoryText: {
        fontSize: 16,
    },
});