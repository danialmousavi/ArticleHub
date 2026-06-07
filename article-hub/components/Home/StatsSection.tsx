// src/components/Home/StatsSection.tsx
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const StatsSection = () => {
  return (
    <View style={styles.statsSection}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>۵۰۰+</Text>
        <Text style={styles.statLabel}>مقاله</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>۵۰+</Text>
        <Text style={styles.statLabel}>نویسنده</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>۱۰K+</Text>
        <Text style={styles.statLabel}>کاربر</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 32,
    paddingVertical: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f4511e',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e0e0e0',
  },
});

export default StatsSection;