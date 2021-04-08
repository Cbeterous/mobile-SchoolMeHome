import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { UserProvider} from './context/userContext';

export default function App() {
  const client = new ApolloClient({
    uri: 'http://192.168.1.20:4300/graphql',
    cache: new InMemoryCache()
  });
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <UserProvider>
            <Navigation colorScheme={colorScheme} />
          </UserProvider>
          <StatusBar />
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
}
AppRegistry.registerComponent('MyApplication', () => App);
