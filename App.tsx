import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabs } from './src/navigation/BottomTabs';
import { store } from './src/store/store';

if (__DEV__) {
  require('./src/store/reactotron');
}

console.disableYellowBox = true;

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </Provider>
  );
}
