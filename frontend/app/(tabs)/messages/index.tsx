import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Ensure you have this installed

const Messages = ({ navigation }) => {
  const [chatList] = useState([
    {
      id: 'govt',
      name: 'Government ChatBot',
      profileImage:
        'https://mir-s3-cdn-cf.behance.net/projects/404/a42236171852785.Y3JvcCwxMzEzLDEwMjcsMTQzLDg3.png',
    },
    {
      id: 'bank',
      name: 'Bank ChatBot',
      profileImage:
        'https://mir-s3-cdn-cf.behance.net/projects/404/a42236171852785.Y3JvcCwxMzEzLDEwMjcsMTQzLDg3.png',
    },
    {
      id: 'company',
      name: 'Company ChatBot',
      profileImage:
        'https://mir-s3-cdn-cf.behance.net/projects/404/a42236171852785.Y3JvcCwxMzEzLDEwMjcsMTQzLDg3.png',
    },
    {
      id: 'others',
      name: 'ChatBot',
      profileImage:
        'https://mir-s3-cdn-cf.behance.net/projects/404/a42236171852785.Y3JvcCwxMzEzLDEwMjcsMTQzLDg3.png',
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
    ],
    bank: [{ id: '3', text: 'Hello from Bank Bot.', sender: 'bot' }],
    company: [{ id: '4', text: 'Welcome to our company!', sender: 'bot' }],
    reliance: [{ id: '5', text: 'Hello from Reliance!', sender: 'bot' }],
  });

  const [selectedChat, setSelectedChat] = useState('govt');
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!selectedChat || !inputText.trim()) return;

    const newMessages = [...(chatMessages[selectedChat] || [])];
    newMessages.push({
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    });
    newMessages.push({
      id: Date.now().toString() + 'bot',
      text: 'Thank you for the information.',
      sender: 'bot',
    });
    setInputText('');

    setChatMessages((prevMessages) => ({
      ...prevMessages,
      [selectedChat]: newMessages,
    }));
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
    <View style={styles.container}>
      {!selectedChat ? (
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
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100a0c',
    padding: 20,
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
});

export default Messages;