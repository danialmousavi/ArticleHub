// src/components/Home/SpecialOfferSection.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const SpecialOfferSection = () => {
  return (
    <View style={styles.specialSection}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.specialGradient}
      >
        <Text style={styles.specialEmoji}>🎁</Text>
        <Text style={styles.specialTitle}>عضویت ویژه</Text>
        <Text style={styles.specialDescription}>
          با عضویت در خبرنامه، از جدیدترین مقالات مطلع شوید
        </Text>
        <TouchableOpacity style={styles.specialButton}>
          <Text style={styles.specialButtonText}>عضویت رایگان ›</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  specialSection: {
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 16,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  specialGradient: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  specialEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  specialTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  specialDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  specialButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  specialButtonText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SpecialOfferSection;