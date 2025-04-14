import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { router } from 'expo-router';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('(tabs)/Feed'); // Navigate to Home screen after successful sign-up
    } catch (err) {
      setError(err.message); // Set error if something goes wrong
    }
  };
  const handleLogin = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('(tabs)/Feed');  // Navigate to the Feed page after successful login
        // Once login is successful, it will automatically redirect to the Feed page
      } catch (err) {
        setError(err.message);  // Display any login errors
      }
    };

  const [selectedButton, setSelectedButton] = useState('logIn'); // Track which button is pressed

  const handleButtonPress = (button) => {
    setSelectedButton(button); // Update state based on which button is pressed
  };
  return (
    <View style={styles.container}>
      {/* Button Selection View */}
      <View style={styles.buttonContainer}>
        <Button
          title="Sign Up"
          onPress={() => handleButtonPress('signUp')} // Set the selected button to 'signUp'
          color={selectedButton === 'signUp' ? 'blue' : 'gray'} // Highlight button when selected
        />
        <Button
          title="Log In"
          onPress={() => handleButtonPress('logIn')} // Set the selected button to 'logIn'
          color={selectedButton === 'logIn' ? 'blue' : 'gray'} // Highlight button when selected
        />
      </View>

      {/* Sign Up Form */}
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword} // password input is saved as typed by the user
          onSubmitEditing={selectedButton === 'signUp' && handleSignUp || selectedButton === 'logIn' && handleLogin} // Trigger login when Enter is pressed
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
       {selectedButton === 'signUp' && <Button title="Sign Up" onPress={handleSignUp} />}
       { selectedButton === 'logIn' && <Button title="Log In" onPress={handleLogin} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 },
  error: { color: 'red' },
  buttonContainer: {
    flexDirection: 'row', // Place buttons next to each other
    marginBottom: 20,
  },
  selectedButtonContainer: {
    marginTop: 20,
  },
});



export default SignUp;
