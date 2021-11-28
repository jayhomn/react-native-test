import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Matches, VideoCall} from './screens';
import MainContextProvider from './MainContext.js';
import {navigationRef} from './NavigationHelper.js';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <MainContextProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          headerMode="none"
          initialRouteName="Matches">
          <Stack.Screen name="Matches" component={Matches} />
          <Stack.Screen name="VideoCall" component={VideoCall} />
        </Stack.Navigator>
      </NavigationContainer>
    </MainContextProvider>
  );
};

export default App;
