import { View, TouchableOpacity, Text, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

const Question1 = () => {
  const router = useRouter();

  const handleOptionSelect = (ageGroup) => {
    console.log(`Selected age group: ${ageGroup}`);
    router.push('/onboarding/page3'); // Changed the navigation here
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      <Text style={styles.question}>What is your age group?</Text>
      {['Under 18', '18–25', '26–40', '41–60', '60+'].map((ageGroup) => (
        <TouchableOpacity
          key={ageGroup}
          style={styles.optionButton}
          onPress={() => handleOptionSelect(ageGroup)}
        >
          <Text style={styles.buttonText}>{ageGroup}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

Question1.options = {
  headerShown: false,
};

export default Question1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
  },
  optionButton: {
    backgroundColor: '#38bdf8',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    shadowColor: '#FF4D67',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});