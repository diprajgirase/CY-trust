import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Ensure you have this installed

const Messages = ({ navigation }) => {
    const [chatList] = useState([
        {
            id: 'govt',
            name: 'Government ChatBot',
            profileImage:
                'https://cb-electronics.com/wp-content/uploads/2021/04/istockphoto-1221348467-612x612-1.jpeg',
        },
        {
            id: 'bank',
            name: 'Bank ChatBot',
            profileImage:
                'https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937555.jpg',
        },
        {
            id: 'company',
            name: 'Company ChatBot',
            profileImage:
                'https://cb-electronics.com/wp-content/uploads/2021/04/istockphoto-1221348467-612x612-1.jpeg',
        },
        {
            id: 'others',
            name: 'ChatBot',
            profileImage:
                'https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937555.jpg',
        },
        {
            id: 'axis',
            name: 'Axis Bank',
            profileImage: 'https://s3-symbol-logo.tradingview.com/axis-bank--600.png',
        },
        {
            id: 'reliance',
            name: 'Reliance',
            profileImage:
                'https://rilstaticasset.akamaized.net/sites/default/files/2023-02/S.1_2.jpg',
        },
    ]);

    const [chatMessages, setChatMessages] = useState({
        axis: [{ id: '1', text: 'Welcome to Axis Bank!', sender: 'bot' }],
        govt: [
            { id: '3', text: 'how may I assist you', sender: 'bot' },
            { id: '4', text: 'I have received an message from one person who is proving himself as an government official asking for otp for document verification', sender: 'user' },
            { id: '5', text: 'ok ,can you please share more details like message screenshot', sender: 'bot' },
            { id: '6', type: 'attachment' }, // Attachment item
            { id: '7', text: 'Thank you for sharing the image. Your report helps us make the internet safer\xa0for\xa0everyone.', sender: 'bot' },
            { id: '8', text: 'To make sure we guide you perfectly, a couple of quick details required', sender: 'bot' },
            {
                id: '9',
                type: 'mcq',
                question: 'What exactly did they ask for?',
                options: [
                    '🔢 OTP or password',
                    '💰 Bank details / money transfer',
                    '📄 Document upload (PDF, image)',
                    '🔗 Click a link',
                    '🆔 Personal info (Aadhaar, PAN)',
                    '🚫\xa0None of these',
                ],
                correctOption: '🔢 OTP or password', // Add the correct option
            },
            {
                id: '10',
                type: 'mcq',
                question: 'Where did this happen?',
                options: [
                    '📱 WhatsApp',
                    '📞 Phone call (SMS/voice)',
                    '📧 Email',
                    '📸 Instagram / Facebook DM',
                    '🌐 Other / Don’t know',
                ],
                correctOption: '📱 WhatsApp',
            },
            {
                id: '11',
                type: 'mcq',
                question: 'Which government department did they claim to represent?',
                options: [
                    '🏛 Income Tax Department',
                    '🚓 Police / Law Enforcement',
                    '💼 Passport / Immigration Office',
                    '🏦 RBI / Bank Regulator',
                    '⚖ Court / Legal Authority',
                    '❓ Other / Not sure',
                ],
                correctOption: '🏛 Income Tax Department',
            },
            {
                id: '12',
                type: 'mcq',
                question: 'What did you do when they asked for the OTP?',
                options: [
                    '✅ I shared it',
                    '🕒 I almost did, then stopped',
                    '❌ I did NOT share',
                    '🤷 I’m not sure',
                ],
                correctOption: '❌ I did NOT share',
            },
            {
                id: '13',
                type: 'mcq',
                question: 'What exactly did they ask you to do with the OTP?',
                options: [
                    '🔄 Share it by replying to this chat',
                    '📞 Tell it over a call',
                    '💻 Enter it on a link they sent',
                    '📝 Write it in a form/document',
                    '🚫 They haven’t asked yet',
                ],
                correctOption: '📞 Tell it over a call',
            },
            {
                id: '14',
                type: 'text',
                text: 'Recommended Actions: \nDo not share any OTP or personal info. \nCall the real Income Tax helpline at 1800-123-456. \nBlock the sender and report the number. \nLearn why government agencies never ask OTPs.',
            },
        ],
        bank: [{ id: '3', text: 'Hello from Bank Bot.', sender: 'bot' }],
        company: [{ id: '4', text: 'Welcome to our company!', sender: 'bot' }],
        reliance: [{ id: '5', text: 'Hello from Reliance!', sender: 'bot' }],
    });

    const [selectedChat, setSelectedChat] = useState('govt');
    const [inputText, setInputText] = useState('');
    const [userAnswers, setUserAnswers] = useState({}); // To store the user's answers for all questions
    const [mcqAnswered, setMcqAnswered] = useState(false);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(9); // Start with the first question.

    const handleSend = () => {
        if (!selectedChat || !inputText.trim()) return;

        const newMessages = [...(chatMessages[selectedChat] || [])];
        newMessages.push({
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
        });

        //Bot response after user sends message
        const botResponse = () => {
            let responseText = 'Thank you for the information.';
            if (selectedChat === 'govt' && !mcqAnswered) {
                const currentQuestion = chatMessages[selectedChat].find(m => m.id === currentQuestionIndex.toString());
                if (currentQuestion?.type === 'mcq') {
                    responseText = 'Please answer the question above to help us understand your situation better.';
                }
            }
            return responseText;
        }

        newMessages.push({
            id: Date.now().toString() + 'bot',
            text: botResponse(),
            sender: 'bot',
        });
        setInputText('');

        setChatMessages((prevMessages) => ({
            ...prevMessages,
            [selectedChat]: newMessages,
        }));
    };

    const handleAnswerSelection = (questionId, answer) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleMcqSubmit = () => {
        const currentQuestion = chatMessages[selectedChat].find(m => m.id === currentQuestionIndex.toString());
        if (!userAnswers[currentQuestionIndex]) {
            alert('Please select an answer.'); // Basic validation
            return;
        }

        setShowCorrectAnswers(prev => ({
            ...prev,
            [currentQuestionIndex]: true,
        }));

        if (currentQuestionIndex < 13) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
        else {
            setMcqAnswered(true);
            // Add a bot response after the user answers the MCQ
            const newMessages = [...(chatMessages[selectedChat] || [])];
            newMessages.push({
                id: Date.now().toString() + 'bot-response',
                text: `Thank you for providing the information. We have recorded your answers.`,
                sender: 'bot'
            });

            setChatMessages((prevMessages) => ({
                ...prevMessages,
                [selectedChat]: newMessages,
            }));
        }
    };

    const renderItem = ({ item }) => {
        if (item.type === 'attachment') {
            return (
                <View style={[styles.messageContainer, styles.botMessage, styles.attachmentMessageContainer]}>
                    <Text style={styles.attachmentOptionText}>Attach:</Text>
                    <View style={styles.attachmentOptions}>
                        <TouchableOpacity style={styles.attachmentOption}>
                            <Icon name="image" size={20} color="#bbb" style={styles.attachmentIcon} />
                            <Text style={styles.attachmentOptionLabel}>Screenshot</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.attachmentOption}>
                            <Icon name="file-text" size={20} color="#bbb" style={styles.attachmentIcon} />
                            <Text style={styles.attachmentOptionLabel}>PDF</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.attachmentOption}>
                            <Icon name="mic" size={20} color="#bbb" style={styles.attachmentIcon} />
                            <Text style={styles.attachmentOptionLabel}>Recording</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else if (item.type === 'mcq') {
            const isCurrentQuestion = item.id === currentQuestionIndex.toString();
            return (
                <View style={[styles.messageContainer, styles.botMessage]}>
                    <Text style={styles.messageText}>{item.question}</Text>
                    {item.options.map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={[
                                styles.mcqOption,
                                userAnswers[item.id] === option && styles.selectedMCQOption,
                                //showCorrectAnswers[item.id] && option === item.correctOption && styles.correctMCQOption, // Correct option styling
                                //showCorrectAnswers[item.id] && userAnswers[item.id] === option && option !== item.correctOption && styles.incorrectMCQOption, // Incorrect option
                            ]}
                            onPress={() => handleAnswerSelection(item.id, option)}
                            disabled={mcqAnswered || showCorrectAnswers[item.id]} // Disable after answering
                        >
                            <Text style={styles.mcqOptionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                    {isCurrentQuestion && item.id === '13' && !mcqAnswered && (
                        <TouchableOpacity style={styles.mcqSubmitButton} onPress={handleMcqSubmit}>
                            <Text style={styles.mcqSubmitButtonText}>Submit</Text>
                        </TouchableOpacity>
                    )}
                    {/*showCorrectAnswers[item.id] && (
                        <Text style={styles.correctAnswerText}>
                            Correct Answer: {item.correctOption}
                        </Text>
                    )*/}
                </View>
            );
        } else if (item.type === 'text') {
            return (
                <View style={[styles.messageContainer, styles.botMessage]}>
                    <Text style={[styles.messageText, { fontWeight: 'bold' }]}>{item.text}</Text>
                </View>
            );
        }

        return (
            <View
                style={[
                    styles.messageContainer,
                    item.sender === 'user' ? styles.userMessage : styles.botMessage,
                ]}
            >
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <View style={styles.container}>
                {!selectedChat ? (
                    <>
                        <Text style={styles.heading}>Messages</Text>
                        <FlatList
                            data={chatList}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.chatItem}
                                    onPress={() => {
                                        if (!chatMessages[item.id]) {
                                            setChatMessages((prev) => ({ ...prev, [item.id]: [] }));
                                        }
                                        setSelectedChat(item.id);
                                        navigation?.setOptions({ tabBarVisible: false });
                                    }}
                                >
                                    <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                                    <Text style={styles.chatText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </>
                ) : (
                    <>
                        <View style={styles.headerContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedChat(null);
                                    navigation?.setOptions({ tabBarVisible: true });
                                }}
                                style={styles.backButton}
                            >
                                <Text style={styles.backButtonText}>←</Text>
                            </TouchableOpacity>
                            <Text style={styles.chatName}>{chatList.find((c) => c.id === selectedChat)?.name}</Text>
                        </View>

                        <FlatList
                            data={chatMessages[selectedChat] || []}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            style={{ flex: 1 }} // Ensure the list takes up available space
                            inverted={false}
                        />

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={inputText}
                                onChangeText={setInputText}
                                placeholder="Type a message..."
                                placeholderTextColor="#aaa"
                                returnKeyType="send"
                                onKeyPress={({ nativeEvent: { key: pressedKey } }) => {
                                    if (pressedKey === 'Enter') {
                                        handleSend();
                                    }
                                }}
                            />
                            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                                <Text style={styles.sendButtonText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#100a0c',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    chatItem: {
        padding: 15,
        backgroundColor: '#1c1c1e',
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    chatText: {
        color: '#fff',
        fontSize: 18,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButton: {
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 15,
    },
    backButtonText: {
        color: '#bbb',
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 30,
    },
    chatName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#bbb',
    },
    messageContainer: {
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        maxWidth: '80%',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#38bdf8',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#1c1c1e',
    },
    messageText: {
        color: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        backgroundColor: '#1c1c1e',
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#38bdf8',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    attachmentMessageContainer: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    attachmentOptionText: {
        color: '#bbb',
        marginBottom: 10,
    },
    attachmentOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    attachmentOption: {
        backgroundColor: '#2c2c2e',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    attachmentIcon: {
        marginRight: 5,
    },
    attachmentOptionLabel: {
        color: '#fff',
    },
    mcqOption: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: '#2c2c2e',
    },
    mcqOptionText: {
        color: '#fff',
    },
    selectedMCQOption: {
        backgroundColor: '#38bdf8',
    },
    mcqSubmitButton: {
        backgroundColor: '#38bdf8',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    mcqSubmitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    correctAnswerText: {
        color: '#00ff00',
        marginTop: 10,
        fontWeight: 'bold',
    },
    correctMCQOption: {
        backgroundColor: '#38bdf8',
    },
    incorrectMCQOption: {
        backgroundColor: '#ff0000',
    }
});

export default Messages;
