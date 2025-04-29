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
    Share, // Import the Share component
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Or any other icon library

const { width, height } = Dimensions.get('window');

const initialScamsData = [
    {
        id: '6',
        title: 'Offshore Investment Scams',
        date: 'March, 2025',
        description: 'Scammers promise unrealistic returns on investments in fake companies or crypto schemes, luring victims into Ponzi schemes.',
        thumbnailColor: '#eab308',
        type: 'Investment Scams',
        year: 2025,
        thumbnailImage: 'https://it.uic.edu/wp-content/uploads/sites/360/2021/01/phishing-news.jpg', // Example
    },
    {
        id: '7',
        title: 'Fake ICOs/Cryptocurrency Scams',
        date: 'July, 2025',
        description: 'An older investment scam...',
        thumbnailColor: '#eab308',
        type: 'Investment Scams',
        year: 2024,
        thumbnailImage: 'https://inc42.com/cdn-cgi/image/quality=75/https://asset.inc42.com/2020/12/crypto.jpg', // Example
    },
    {
        id: '8',
        title: 'Pyramid Schemes',
        date: 'July, 2025',
        description: 'An older investment scam...',
        thumbnailColor: '#eab308',
        type: 'Investment Scams',
        year: 2024,
        thumbnailImage: 'https://www.acamstoday.org/wp-content/uploads/2022/08/Ponzi-and-Pyramid-Schemes-Spread-Across-the-Caribbean.jpg', // Example
    },
    {
        id: '9',
        title: 'Ponzi Schemes',
        date: 'July, 2024',
        description: 'An older investment scam...',
        thumbnailColor: '#eab308',
        type: 'Investment Scams',
        year: 2024,
        thumbnailImage: 'https://cdn-trustworthyshopping.aboutamazon.com/dims4/default/bfc3956/2147483647/strip/true/crop/1998x1125+1+0/resize/1000x563!/quality/90/?url=https%3A%2F%2Famazon-k1-prod-cter.s3.us-west-2.amazonaws.com%2Fbrightspot%2F9b%2Fa4%2F7e9676a14a3e990a47d866275031%2Fscam-trends-hero.jpg', // Example
    },
    {
        id: '10',
        title: 'Forex Scams',
        date: 'July, 2024',
        description: 'An older investment scam...',
        thumbnailColor: '#eab308',
        type: 'Investment Scams',
        year: 2024,
        thumbnailImage: 'https://cdn.i-scmp.com/sites/default/files/styles/1020x680/public/d8/images/canvas/2024/05/21/9efc20d5-e5bb-4cdb-9fa9-dab027e27fc6_7a904230.jpg?itok=5DuDut94&v=1716290749', // Example
    },
    {
        id: '11',
        title: 'Old Investment Opportunity',
        date: 'July, 2024',
        description: 'An older investment scam...',
        thumbnailColor: '#eab308',
        type: 'Investment Scams',
        year: 2024,
        thumbnailImage: 'https://www.investright.org/wp-content/uploads/2022/03/blog-nasaa-top-investor-threats.jpg', // Example
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

    const onShare = async (item) => {
        try {
            const shareOptions = {
                message: `${item.title}\n\n${item.description}\n\nView the image for more details.`,
            };

            if (item.thumbnailImage) {
                shareOptions.url = item.thumbnailImage;
            }

            const result = await Share.share(shareOptions);

            if (result.action === Share.sharedAction) {
                console.log('Shared successfully');
            } else if (result.action === Share.dismissedAction) {
                console.log('Dismissed');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.heading}>Scams</Text>
                <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
                    <Icon name="sliders" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredScams}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.scamItem}>
                        <TouchableOpacity onPress={() => handleScamPress(item)} style={styles.itemContent}>
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
                        <TouchableOpacity style={styles.shareButton} onPress={() => onShare(item)}>
                            <Icon name="share-alt" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
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
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => console.log('Add button pressed')} // Replace with your desired action
            >
                <Icon name="plus" size={30} color="#fff" />
            </TouchableOpacity>
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
        justifyContent: 'space-between', // Added to space out content and share button
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1, // Allows text content to shrink if needed
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 16,
    },
    thumbnailImage: {
        width: 120,
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
    shareButton: {
        padding: 10,
        borderRadius: 8,
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
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#38bdf8', // Or any color you like
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Add shadow for better visibility
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    addButtonIcon: {
        width: 10, // Adjust size as needed
        height: 10,
        resizeMode: 'contain',
    },
});

export default Scams;
