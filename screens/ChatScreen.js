import React, { useState, useCallback, useEffect } from "react";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function ChatScreen({ route }) {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const title = route.params.username;

  useEffect(() => {
    navigation.setOptions({
        title
      })
  }, [title])
    

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{ right: { backgroundColor: Colors.darkGreen } }}
      ></Bubble>
    );
  };
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <Ionicons
            style={{ marginBottom: 5, marginRight: 5 }}
            name="send"
            size={32}
            color={Colors.darkGreen}
          />
        </View>
      </Send>
    );
  };

  return (
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        alwaysShowSend={true}
        renderSend={renderSend}
        renderBubble={renderBubble}
        scrollToBottom={true}
      />
  );
}

export default ChatScreen;

const styles = StyleSheet.create({});
