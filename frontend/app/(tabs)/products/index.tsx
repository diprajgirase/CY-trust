import { View, Text, FlatList, StyleSheet, StatusBar, Dimensions, SafeAreaView, TouchableOpacity, Image, Linking } from 'react-native';
import React, { useState } from 'react';

const { width } = Dimensions.get('window');

const tools = {
  free: [
    { id: '1', name: 'Truecaller', description: 'Phone number identification and spam blocking tool.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5LbK0ydAxB9LxjVRB-G4Id_5ZsttZGNagkA&s', link: 'https://www.truecaller.com/' },
    { id: '2', name: 'Norton Genie', description: 'Comprehensive cybersecurity solution for devices.', image: 'https://play-lh.googleusercontent.com/F_1_9msUmgfyszGN6m9-a-D361-ViD8GOe37gUVnJwHmJWXlEIinVv_6vDhkAisNsQ=w240-h480-rw', link: 'https://www.norton.com/' },
  ],
  paid: [
    { id: '1', name: 'Truecaller', description: 'Phone number identification and spam blocking tool.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5LbK0ydAxB9LxjVRB-G4Id_5ZsttZGNagkA&s', link: 'https://www.truecaller.com/' },
    { id: '2', name: 'Norton Genie', description: 'Comprehensive cybersecurity solution for devices.', image: 'https://play-lh.googleusercontent.com/F_1_9msUmgfyszGN6m9-a-D361-ViD8GOe37gUVnJwHmJWXlEIinVv_6vDhkAisNsQ=w240-h480-rw', link: 'https://www.norton.com/' },
  ],
  topRated: [
    { id: '3', name: 'Truecaller', description: 'Phone number identification and spam blocking tool.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5LbK0ydAxB9LxjVRB-G4Id_5ZsttZGNagkA&s', link: 'https://www.truecaller.com/' },
  ]
};

const education = {
  free: [
    { id: '5', name: 'Cybersecurity Expert Tells Teens How to Avoid Scams', description: 'A practical guide for young audiences on identifying and avoiding common online scams.', image: 'https://t3.ftcdn.net/jpg/04/74/05/94/360_F_474059464_qldYuzxaUWEwNTtYBJ44VN89ARuFktHW.jpg', link: 'https://www.cybersecurityteens.com/' },
    { id: '6', name: 'Protect Yourself from Scams and Fraud Webinar', description: 'This webinar discusses trending scams and fraud targeting individuals and communities.', image: 'https://t3.ftcdn.net/jpg/04/74/05/94/360_F_474059464_qldYuzxaUWEwNTtYBJ44VN89ARuFktHW.jpg', link: 'https://www.fraudprotectionwebinar.com/' },
  ],
  paid: [
    { id: '7', name: 'Online Safety Course: How to Spot Scams – Udemy', description: 'End-to-end encryption for sensitive data protection.', image: 'https://via.placeholder.com/50', link: 'https://www.udemy.com/course/online-safety/' },
    { id: '8', name: 'Security Awareness Training – KnowBe4', description: 'Real-time monitoring and reporting of potential threats.', image: 'https://via.placeholder.com/50', link: 'https://www.knowbe4.com/' },
  ],
  topRated: [
    { id: '6', name: 'Protect Yourself from Scams and Fraud Webinar', description: 'This webinar discusses trending scams and fraud targeting individuals and communities.', image: 'https://via.placeholder.com/50', link: 'https://www.fraudprotectionwebinar.com/' }
  ]
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('tools');
  const [selectedType, setSelectedType] = useState('free');

  const handlePress = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

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
        <View style={styles.categoryButtonContainer}>
          <TouchableOpacity 
            style={[styles.smallCategoryButton, selectedType === 'free' && styles.activeCategoryButton]} 
            onPress={() => setSelectedType('free')}>
            <Text style={styles.categoryButtonText}>Free</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.smallCategoryButton, selectedType === 'paid' && styles.activeCategoryButton]} 
            onPress={() => setSelectedType('paid')}>
            <Text style={styles.categoryButtonText}>Paid</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.smallCategoryButton, selectedType === 'topRated' && styles.activeCategoryButton]} 
            onPress={() => setSelectedType('topRated')}>
            <Text style={styles.categoryButtonText}>Top Rated</Text>
          </TouchableOpacity>
        </View>

        {/* Display Selected Category and Type */}
        <FlatList
          data={selectedCategory === 'tools' ? tools[selectedType] : education[selectedType]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item.link)} style={styles.productItem}>
              {/* Image on the left */}
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDesc}>{item.description}</Text>
              </View>
            </TouchableOpacity>
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
    backgroundColor: '#38bdf8',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  productDesc: {
    fontSize: 15,
    color: '#bbb',
    marginTop: 6,
    lineHeight: 20,
  },
  smallCategoryButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#555',
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCategoryButton: {
    backgroundColor: '#38bdf8',
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoryButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default Products;
