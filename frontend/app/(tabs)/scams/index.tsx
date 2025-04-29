import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    SafeAreaView,
    Modal,
    Pressable,
    Image, // Import the Image component
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Or any other icon library

const { width } = Dimensions.get('window');

const initialScamsData = [
    {
        id: '1',
        title: 'Online Banking Fraud',
        date: 'March 20, 2025',
        description: 'Scammers trick victims into sharing banking details via fake websites or calls. They often use phishing techniques and fake banking apps to steal money.',
        thumbnailColor: '#a855f7',
        type: 'Phishing Scams',
        year: 2025,
        thumbnailImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Phishing_Example.png/800px-Phishing_Example.png', // Example
    },
    {
        id: '2',
        title: 'Fake Job Offer Scam',
        date: 'March 18, 2025',
        description: 'Fraudulent companies ask for upfront payments for fake job offers, promising high salaries but disappearing after collecting fees from job seekers.',
        thumbnailColor: '#f97316',
        type: 'Job Offer Scams',
        year: 2025,
        thumbnailImage: 'https://www.consumer.ftc.gov/sites/default/files/images/articles/shutterstock_372980397-job-scam-inline.jpg', // Example
    },
    {
        id: '3',
        title: 'Lottery Scam',
        date: 'March 15, 2025',
        description: 'Victims are told they won a lottery but need to pay fees to claim it. Scammers send fake certificates and demand bank details.',
        thumbnailColor: '#22c55e',
        type: null, // Example of a scam without a specific type
        year: 2025,
        thumbnailImage: 'https://www.ic3.gov/Content/Images/lotteryfraud.jpg', // Example
    },
    {
        id: '4',
        title: 'Investment Scam Alert!',
        date: 'March 10, 2025',
        description: 'Scammers promise unrealistic returns on investments in fake companies or crypto schemes, luring victims into Ponzi schemes.',
        thumbnailColor: '#eab308',
        type: 'Investment Scams',
        year: 2025,
        thumbnailImage: 'https://www.finra.org/sites/default/files/2021-04/investment-scam-inline.jpg', // Example
    },
    {
        id: '5',
        title: 'Online Shopping Scam Warning',
        date: 'March 5, 2025',
        description: 'Fake e-commerce websites trick users into buying products that never get delivered. Payment is taken, but no item is shipped.',
        thumbnailColor: '#3b82f6',
        type: 'Online Shopping Scams',
        year: 2025,
        thumbnailImage: 'https://www.experian.com/blogs/ask-experian/wp-content/uploads/online-shopping-scam.jpg', // Example
    },
    {
        id: '6',
        title: 'Another Phishing Incident',
        date: 'December 1, 2024',
        description: 'More phishing attempts...',
        thumbnailColor: '#a855f7',
        type: 'Phishing Scams',
        year: 2024,
        thumbnailImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Phishing_Example.png/800px-Phishing_Example.png', // Example
    },
    {
        id: '7',
        title: 'Old Investment Opportunity',
        date: 'July 15, 2024',
        description: 'An older investment scam...',
        thumbnailColor: '#eab308',
        type: 'Investment Scams',
        year: 2024,
        thumbnailImage: 'https://www.lfcu.org/files/cryptocurrency-scam-1600x675-1-e1674643309155.jpg', // Example
    },
    {
        id: '8',
        title: 'Old Investment Opportunity',
        date: 'July 15, 2024',
        description: 'An older investment scam...',
        thumbnailColor: '#eab308',
        type: 'Investment Scams',
        year: 2024,
        thumbnailImage: 'https://www.finra.org/sites/default/files/2021-04/investment-scam-inline.jpg', // Example
    },
    {
        id: '9',
        title: 'Old Investment Opportunity',
        date: 'July 15, 2024',
        description: 'An older investment scam...',
        thumbnailColor: '#eab308',
        type: 'Investment Scams',
        year: 2024,
        thumbnailImage: 'https://www.finra.org/sites/default/files/2021-04/investment-scam-inline.jpg', // Example
    },
    {
        id: '10',
        title: 'Old Investment Opportunity',
        date: 'July 15, 2024',
        description: 'An older investment scam...',
        thumbnailColor: '#eab308',
        type: 'Investment Scams',
        year: 2024,
        thumbnailImage: 'https://www.finra.org/sites/default/files/2021-04/investment-scam-inline.jpg', // Example
    },
    {
        id: '11',
        title: 'Old Investment Opportunity',
        date: 'July 15, 2024',
        description: 'An older investment scam...',
        thumbnailColor: '#eab308',
        type: 'Investment Scams',
        year: 2024,
        thumbnailImage: 'https://www.finra.org/sites/default/files/2021-04/investment-scam-inline.jpg', // Example
    },
];

const Scams = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [filteredScams, setFilteredScams] = useState(initialScamsData); // Initialize with all data
    const [selectedFilters, setSelectedFilters] = useState({
        year: null,
        type: null,
    });

    const handleScamPress = (item) => {
        console.log(`Tapped on: ${item.title}`);
        // navigation.navigate('ScamDetails', { scam: item });
    };

    const handleFilterPress = () => {
        setModalVisible(true);
    };

    const applyFilters = () => {
        let filtered = initialScamsData;

        if (selectedFilters.year) {
            filtered = filtered.filter((scam) => scam.year === parseInt(selectedFilters.year));
        }

        if (selectedFilters.type) {
            filtered = filtered.filter((scam) => scam.type === selectedFilters.type);
        }

        setFilteredScams(filtered);
        setModalVisible(false);
    };

    const resetFilters = () => {
        setSelectedFilters({ year: null, type: null });
        setFilteredScams(initialScamsData);
        setModalVisible(false);
    };

    const filterOptions = [
        { label: 'Year', value: 'year', options: [...new Set(initialScamsData.map(scam => scam.year).sort((a, b) => b - a))] }, // Dynamic years
        { label: 'Scam Type', value: 'type', options: [...new Set(initialScamsData.map(scam => scam.type).filter(Boolean).sort())] }, // Dynamic types
    ];

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.heading}>Scams</Text>
                <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
                    <Icon name="filter" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredScams}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleScamPress(item)} style={styles.scamItem}>
                        {item.thumbnailImage ? (
                            <Image
                                source={{ uri: item.thumbnailImage }}
                                style={styles.thumbnailImage}
                            />
                        ) : (
                            <View style={[styles.thumbnail, { backgroundColor: item.thumbnailColor }]} />
                        )}
                        <View style={styles.textContent}>
                            <Text style={styles.scamTitle}>{item.title}</Text>
                            <Text style={styles.scamDate}>{item.date}</Text>
                            <Text style={styles.scamDescription} numberOfLines={2}>
                                {item.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContent}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Filter Scams</Text>

                        {filterOptions.map((filter) => (
                            <View key={filter.value} style={styles.filterGroup}>
                                <Text style={styles.filterLabel}>{filter.label}:</Text>
                                <View style={styles.filterOptionsContainer}>
                                    {filter.options.map((option) => (
                                        <TouchableOpacity
                                            key={option}
                                            style={[
                                                styles.filterOption,
                                                selectedFilters[filter.value] === option && styles.filterOptionSelected,
                                            ]}
                                            onPress={() => handleFilterChange(filter.value, option)}
                                        >
                                            <Text
                                                style={[
                                                    styles.filterOptionText,
                                                    selectedFilters[filter.value] === option && styles.filterOptionTextSelected,
                                                ]}
                                            >
                                                {option}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        ))}

                        <View style={styles.modalButtons}>
                            <Pressable style={[styles.button, styles.buttonReset]} onPress={resetFilters}>
                                <Text style={styles.textStyle}>Reset Filters</Text>
                            </Pressable>
                            <Pressable style={[styles.button, styles.buttonApply]} onPress={applyFilters}>
                                <Text style={styles.textStyle}>Apply Filters</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#0d0d0d',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 15,
        marginBottom: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 1,
    },
    filterButton: {
        borderRadius: 8,
        padding: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
    scamItem: {
        flexDirection: 'row',
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
        alignItems: 'center',
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 16,
    },
    thumbnailImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 16,
    },
    textContent: {
        flex: 1,
    },
    scamTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    scamDate: {
        fontSize: 13,
        color: '#bbb',
        marginBottom: 4,
    },
    scamDescription: {
        fontSize: 14,
        color: '#bbb',
        marginTop: 4,
        lineHeight: 18,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end', // Slide from the bottom
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly darker overlay
    },
    modalContent: {
        backgroundColor: '#2c2c2e',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 30, // Add some padding at the bottom
        width: '100%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    filterGroup: {
        marginBottom: 20,
    },
    filterLabel: {
        fontSize: 16,
        color: '#bbb',
        marginBottom: 8,
    },
    filterOptionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow options to wrap to the next line
        gap: 8, // Space between filter options
    },
    filterOption: {
        backgroundColor: '#1c1c1e',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20, // Pill-shaped buttons
        marginBottom: 8,
    },
    filterOptionSelected: {
        backgroundColor: '#38bdf8',
    },
    filterOptionText: {
        color: '#fff',
        fontSize: 14,
    },
    filterOptionTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 25,
    },
    button: {
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        elevation: 2,
        flex: 1, // Make buttons take equal width
        marginHorizontal: 5,
    },
    buttonApply: {
        backgroundColor: '#38bdf8',
    },
    buttonReset: {
        backgroundColor: '#6b7280', // A softer gray for reset
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default Scams;