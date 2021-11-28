import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Button,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../MainContext.js';

const Matches = ({navigation}) => {
  const {setId, initialize, users, peerId, call} = useContext(MainContext);

  useEffect(() => {
    Alert.alert('Select id', 'Select id', [
      {
        text: users[0].peerId,
        onPress: () => setId(users[0].peerId),
      },
      {text: users[1].peerId, onPress: () => setId(users[1].peerId)},
    ]);
  }, []);

  useEffect(() => {
    if (peerId) {
      initialize();
    }
  }, [peerId]);

  const callUser = item => {
    call(item);
    navigation.navigate('VideoCall');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Online Users</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.peerId}
        renderItem={({item}) => {
          return (
            <View style={styles.card}>
              <Text style={styles.text}>{item.name}</Text>
              <Button
                title="call"
                onPress={() => callUser(item)}
                style={[styles.btn, {opacity: 1}]}></Button>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Matches;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  card: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 0.6,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    color: '#333',
    margin: 12,
  },
  text: {
    fontSize: 22,
    margin: 5,
  },
  btn: {
    backgroundColor: '#341EFF',
    padding: 12,
    borderRadius: 99,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
});
