import { View, Text, FlatList, StyleSheet, StatusBar, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const { width } = Dimensions.get('window');

const tools = {
  free: [
    { id: '1', name: 'Penetration Testing', description: 'Simulated cyber attacks to find vulnerabilities.' },
    { id: '2', name: 'Firewall Setup', description: 'Advanced firewall solutions for secure networks.' },
  ],
  paid: [
    { id: '3', name: 'Phishing Simulation', description: 'Employee security awareness training via mock attacks.' },
    { id: '4', name: 'Cybersecurity Consultation', description: 'Expert advice to strengthen security strategies.' },
  ],
  topRated: [
    { id: '9', name: 'Advanced Threat Protection', description: 'AI-powered security monitoring system.' }
  ]
};

const education = {
  free: [
    { id: '5', name: 'Malware Protection Ads', description: 'Targeted ads promoting malware defense services.' },
    { id: '6', name: 'DDoS Protection', description: 'Mitigation strategies against distributed denial-of-service attacks.' },
  ],
  paid: [
    { id: '7', name: 'Data Encryption Services', description: 'End-to-end encryption for sensitive data protection.' },
    { id: '8', name: 'Cyber Threat Intelligence', description: 'Real-time monitoring and reporting of potential threats.' },
  ],
  topRated: [
    { id: '10', name: 'Cybersecurity Bootcamp', description: 'Comprehensive training for security professionals.' }
  ]
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('tools');
  const [selectedType, setSelectedType] = useState('free');

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.heading}>Products</Text>
        
        {/* Category Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.smallButton, selectedCategory === 'tools' && styles.activeButton]} 
            onPress={() => setSelectedCategory('tools')}>
            <Text style={styles.buttonText}>Tools</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.smallButton, selectedCategory === 'education' && styles.activeButton]} 
            onPress={() => setSelectedCategory('education')}>
            <Text style={styles.buttonText}>Education</Text>
          </TouchableOpacity>
        </View>
        
        {/* Type Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.smallButton, selectedType === 'free' && styles.activeButton]} 
            onPress={() => setSelectedType('free')}>
            <Text style={styles.buttonText}>Free</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.smallButton, selectedType === 'paid' && styles.activeButton]} 
            onPress={() => setSelectedType('paid')}>
            <Text style={styles.buttonText}>Paid</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.smallButton, selectedType === 'topRated' && styles.activeButton]} 
            onPress={() => setSelectedType('topRated')}>
            <Text style={styles.buttonText}>Top Rated</Text>
          </TouchableOpacity>
        </View>

        {/* Display Selected Category and Type */}
        <FlatList
          data={selectedCategory === 'tools' ? tools[selectedType] : education[selectedType]}
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
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  smallButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#333',
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#e94560',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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