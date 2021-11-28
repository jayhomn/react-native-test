import React, {useState} from 'react';
import {Alert} from 'react-native';
import {
  mediaDevices,
  MediaStream,
  MediaStreamConstraints,
} from 'react-native-webrtc';
import Peer from 'react-native-peerjs';
import {navigate} from './NavigationHelper.js';

const initialValues = {
  peerId: '',
  users: [
    {
      peerId: 'bd7acbea-c1b1-46c2-aed5-3add53abba28ba',
      name: 'Bob',
    },
    {
      peerId: 'ad7acbea-c1b1-46c2-aed5-3ad53asdbb28ba',
      name: 'Bob2',
    },
  ],
  localStream: null,
  remoteStream: null,
  initialize: () => {},
  call: () => {},
  setId: () => {},
};

export const MainContext = React.createContext(initialValues);

const MainContextProvider = ({children}) => {
  const [peerId, setPeerId] = useState(initialValues.peerId);
  const [users, setUsers] = useState(initialValues.users);
  const [localStream, setLocalStream] = useState(initialValues.localStream);
  const [remoteStream, setRemoteStream] = useState(initialValues.remoteStream);
  const [peerServer, setPeerServer] = useState(null);

  const initialize = async () => {
    const isFrontCamera = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFrontCamera ? 'front' : 'environment';
    const videoSourceId = devices.find(
      device => device.kind === 'videoinput' && device.facing === facing,
    );
    const facingMode = isFrontCamera ? 'user' : 'environment';
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
      },
    };

    const newStream = await mediaDevices.getUserMedia(constraints);

    setLocalStream(newStream);

    const peerServer = new Peer(peerId);

    peerServer.on('open', function (id) {
      console.log('My peer ID is: ' + id);
      setPeerServer(peerServer);
    });

    peerServer.on('call', call => {
      call.answer(newStream);
      console.log('called');

      call.on('stream', stream => {
        setRemoteStream(stream);
      });
      navigate('VideoCall');
    });
  };

  const call = user => {
    try {
      const call = peerServer.call(user.peerId, localStream);

      call.on(
        'stream',
        stream => {
          setRemoteStream(stream);
        },
        err => {
          console.error('Failed to get call stream', err);
        },
      );
    } catch (error) {
      console.log('Calling error', error);
    }
  };

  const setId = peerId => {
    setPeerId(peerId);
  };

  return (
    <MainContext.Provider
      value={{
        peerId,
        setPeerId,
        users,
        setUsers,
        localStream,
        setLocalStream,
        remoteStream,
        setRemoteStream,
        initialize,
        call,
        setId,
      }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
