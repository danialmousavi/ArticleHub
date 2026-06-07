import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

type HeroSectionProps = {
  isLogin: boolean;
  username?: string;
  onPress: () => void;
};

const HeroSection = ({ isLogin, username, onPress }: HeroSectionProps) => {
  return (
    <View style={styles.heroSection}>
      <LinearGradient
        colors={['#f4511e', '#ff6b35']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroGradient}
      >
        <Text style={styles.heroEmoji}>🎯</Text>
        <Text style={styles.heroTitle}>
          {isLogin ? `سلام ${username || 'عزیز'}!` : 'سلام!'}
        </Text>
        <Text style={styles.heroSubtitle}>به مجله تخصصی ما خوش آمدی</Text>
        <Text style={styles.heroDescription}>
          جدیدترین مقالات و مطالب خواندنی را اینجا پیدا کنید
        </Text>
        <TouchableOpacity style={styles.heroButton} onPress={onPress}>
          <Text style={styles.heroButtonText}>شروع کنید ›</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#f4511e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  heroGradient: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  heroEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.95)',
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 24,
    lineHeight: 20,
  },
  heroButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: '#f4511e',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HeroSection;