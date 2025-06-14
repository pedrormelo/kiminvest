import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const actions = [
  { id: '1', name: 'PETR4', price: 'R$ 32,10' },
  { id: '2', name: 'VALE3', price: 'R$ 67,50' },
  { id: '3', name: 'ITUB4', price: 'R$ 29,90' },
];

export default function TrendingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ações em Alta</Text>
      <FlatList
        data={actions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name} - {item.price}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: { fontSize: 16, marginBottom: 6 },
});
