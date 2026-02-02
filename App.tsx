import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';

interface Counter {
  id: number;
  name: string;
  count: number;
}

export default function App() {
  const [counters, setCounters] = useState<Counter[]>([{ id: 1, name: 'Default', count: 0 }]);
  const [activeId, setActiveId] = useState(1);

  const increment = () => updateCount(1);
  const decrement = () => updateCount(-1);

  const updateCount = (val: number) => {
    setCounters(counters.map(c => c.id === activeId ? { ...c, count: c.count + val } : c));
  };

  const addCounter = () => {
    const newId = counters.length + 1;
    setCounters([...counters, { id: newId, name: `Counter ${newId}`, count: 0 }]);
    setActiveId(newId);
  };

  const activeCounter = counters.find(c => c.id === activeId) || counters[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tally Counter 🔢</Text>

      <View style={styles.counterBox}>
        <TextInput
          style={styles.nameInput}
          value={activeCounter.name}
          onChangeText={(txt) => setCounters(counters.map(c => c.id === activeId ? { ...c, name: txt } : c))}
        />
        <Text style={styles.countText}>{activeCounter.count}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.btn} onPress={decrement}><Text style={styles.btnText}>-</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.plusBtn]} onPress={increment}><Text style={styles.btnText}>+</Text></TouchableOpacity>
      </View>

      <ScrollView horizontal style={styles.list} contentContainerStyle={styles.listContent}>
        {counters.map(c => (
          <TouchableOpacity key={c.id} onPress={() => setActiveId(c.id)} style={[styles.tab, c.id === activeId && styles.activeTab]}>
            <Text style={[styles.tabText, c.id === activeId && styles.activeTabText]}>{c.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={addCounter} style={styles.addBtn}><Text>+</Text></TouchableOpacity>
      </ScrollView>

      <View style={styles.ad}>
        <Text>[Ad: Cloud Storage]</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f3f3', alignItems: 'center', justifyContent: 'center', paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  counterBox: { backgroundColor: '#fff', width: '80%', padding: 30, borderRadius: 20, alignItems: 'center', elevation: 5, marginBottom: 30 },
  nameInput: { fontSize: 20, color: '#666', borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 10, textAlign: 'center' },
  countText: { fontSize: 80, fontWeight: 'bold', color: '#333' },
  controls: { flexDirection: 'row', gap: 20, marginBottom: 40 },
  btn: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center' },
  plusBtn: { backgroundColor: '#2196f3' },
  btnText: { fontSize: 40, color: '#fff' },
  list: { maxHeight: 60, marginBottom: 80 },
  listContent: { paddingHorizontal: 20, alignItems: 'center' },
  tab: { paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#fff', borderRadius: 20, marginRight: 10, elevation: 2 },
  activeTab: { backgroundColor: '#2196f3' },
  tabText: { color: '#333' },
  activeTabText: { color: '#fff' },
  addBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center' },
  ad: { position: 'absolute', bottom: 20, padding: 10, backgroundColor: '#ccc' }
});
