import { View, Text, FlatList, StyleSheet, StatusBar, Dimensions, SafeAreaView } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

const products = [
  { id: '1', name: 'Penetration Testing', description: 'Simulated cyber attacks to find vulnerabilities.' },
  { id: '2', name: 'Firewall Setup', description: 'Advanced firewall solutions for secure networks.' },
  { id: '3', name: 'Phishing Simulation', description: 'Employee security awareness training via mock attacks.' },
  { id: '4', name: 'Cybersecurity Consultation', description: 'Expert advice to strengthen security strategies.' },
  { id: '5', name: 'Malware Protection Ads', description: 'Targeted ads promoting malware defense services.' },
  { id: '6', name: 'DDoS Protection', description: 'Mitigation strategies against distributed denial-of-service attacks.' },
  { id: '7', name: 'Data Encryption Services', description: 'End-to-end encryption for sensitive data protection.' },
  { id: '8', name: 'Cyber Threat Intelligence', description: 'Real-time monitoring and reporting of potential threats.' }
];

const Products = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.heading}>Products</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDesc}>{item.description}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop: 15, // Added marginTop to balance spacing
  },
  listContent: {
    paddingBottom: 20,
  },
  productItem: {
    backgroundColor: '#1c1c1e',
    padding: 18,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#fff',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
    width: width * 0.9,
    alignSelf: 'center',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e94560',
  },
  productDesc: {
    fontSize: 15,
    color: '#bbb',
    marginTop: 6,
    lineHeight: 20,
  },
});

export default Products;
