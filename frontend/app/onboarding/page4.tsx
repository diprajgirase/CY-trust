import { View, TouchableOpacity, Text, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

const Question1 = () => {
  const router = useRouter();

  const handleActivitySelect = (activity) => {
    console.log(`Selected activity: ${activity}`);
    // Navigate or store as needed
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={[styles.question, { marginTop: 40 }]}>
        Which platforms do you use most?{'\n'}(For targeted scam alerts)
      </Text>
      {[
        '📱 WhatsApp',
        '📷 Instagram',
        '📘 Facebook',
        '📧 Email',
        '🧾 SMS / calls',
        '💻 Other apps',
      ].map((activity) => (
        <TouchableOpacity
          key={activity}
          style={styles.optionButton}
          onPress={() => handleActivitySelect(activity)}
        >
          <Text style={styles.buttonText}>{activity}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Setting headerShown: false for Expo Router
Question1.options = {
  headerShown: false,
};

export default Question1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#FF6F00',
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
