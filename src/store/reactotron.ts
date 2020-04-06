/**
 * @see https://github.com/infinitered/reactotron
 */
import Reactotron, { UseReactNativeOptions } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { name } from '../../package.json';

// We export Reactotron as a global dep so no need to import
// it every time we want to log for example
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
global.Reactotron = Reactotron;

Reactotron
  .configure({
    name,
    host: 'localhost',
  })
  .use(reactotronRedux({}))
  .useReactNative({
    asyncStorage: { ignore: [] },
    networking: {},
  } as UseReactNativeOptions)
  // needed to fix @see https://github.com/infinitered/reactotron/issues/1154
  .setAsyncStorageHandler!(AsyncStorage)
  .connect();
