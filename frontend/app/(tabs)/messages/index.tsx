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

const Messages = () => {
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
    govt: [{ id: '2', text: 'This is the Government Bot.', sender: 'bot' }],
    bank: [{ id: '3', text: 'Hello from Bank Bot.', sender: 'bot' }],
    company: [{ id: '4', text: 'Welcome to our company!', sender: 'bot' }],
    reliance: [{ id: '5', text: 'Hello from Reliance!', sender: 'bot' }],
  });

  const [selectedChat, setSelectedChat] = useState(null);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!selectedChat || !inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    };
    const botReply = {
      id: Date.now().toString() + 'bot',
      text: 'I will look into that.',
      sender: 'bot',
    };

    const updatedMessages = [
      ...(chatMessages[selectedChat] || []),
      newMessage,
      botReply,
    ];

    setChatMessages({ ...chatMessages, [selectedChat]: updatedMessages });
    setInputText('');
  };

  return (
    <View style={styles.container}>
      {!selectedChat && <Text style={styles.title}>Messages</Text>}

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
              }}
            >
              <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
              <Text style={styles.chatText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <>
          <TouchableOpacity onPress={() => setSelectedChat(null)} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.chatName}>
            Chat with {chatList.find((c) => c.id === selectedChat)?.name}
          </Text>

          <FlatList
            data={chatMessages[selectedChat] || []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageContainer,
                  item.sender === 'user' ? styles.userMessage : styles.botMessage,
                ]}
              >
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
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
  backButton: {
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#333',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#bbb',
    marginBottom: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d32f2f',
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
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Messages;
