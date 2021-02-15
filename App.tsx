import React from 'react';
import { StyleSheet } from 'react-native';
import Index from './src/index';

export default function App() {
  return <Index />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
