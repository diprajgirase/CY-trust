import { View, Text, StyleSheet, TextInput, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

const Question1 = () => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      console.log('Name submitted:', name);
      router.push('/onboarding/page2');
    } else {
      alert('Please enter your name.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      {/* Question */}
      <Text style={styles.question}>How may I call u?</Text>

      {/* Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={(text) => {
            setName(text);
            console.log('Name:', text);
          }}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Question1;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#555',
    color: '#fff',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderColor: '#777',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#38bdf8',
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
