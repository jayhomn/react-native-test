import React, {useContext, useEffect, useState} from 'react';
import {
  RTCView,
  mediaDevices,
  MediaStream,
  MediaStreamConstraints,
} from 'react-native-webrtc';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MainContext} from '../MainContext.js';

const {width, height} = Dimensions.get('window');

const VideoCall = () => {
  const {localStream, remoteStream} = useContext(MainContext);

  useEffect(() => {
    console.log(localStream);
    console.log(remoteStream);
  }, [remoteStream]);
  return (
    <SafeAreaView style={styles.container}>
      {remoteStream && (
        <View style={styles.remoteStreamWrapper}>
          <RTCView
            style={styles.remoteStream}
            streamURL={remoteStream.toURL()}
            objectFit="cover"
          />
        </View>
      )}
      {localStream && (
        <View style={styles.myStreamWrapper}>
          <RTCView
            style={styles.myStream}
            objectFit="cover"
            streamURL={localStream.toURL()}
            zOrder={1}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default VideoCall;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#12340d',
    flex: 1,
    position: 'relative',
  },
  myStream: {
    height: height * 0.5,
    width: width,
  },
  myStreamWrapper: {
    position: 'absolute',
    bottom: '0%',
    height: height * 0.5 + 4,
    width: width,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteStreamWrapper: {
    position: 'absolute',
    bottom: '50%',
    height: height * 0.5 + 4,
    width: width,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteStream: {
    height: height * 0.5,
    width: width,
  },
  spinnerWrapper: {
    top: height * 0.3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callingText: {
    fontSize: 26,
    color: '#fff',
  },
  iconsWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});
