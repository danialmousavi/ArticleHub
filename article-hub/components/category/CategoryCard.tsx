// src/components/Category/CategoryCard.tsx
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { CategoryType } from '../../utils/types/Category';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 ستونه

type CategoryCardProps = {
  category: CategoryType;
  onPress?: (category: CategoryType) => void;
  variant?: 'grid' | 'list';
};

const CategoryCard = ({ category, onPress, variant = 'grid' }: CategoryCardProps) => {
  const handlePress = () => {
    onPress?.(category);
  };


  const getIcon = (title: string) => {
    const icons: { [key: string]: string } = {
      'تکنولوژی': '💻',
      'برنامه نویسی': '👨‍💻',
      'طراحی': '🎨',
      'بازی': '🎮',
      'موبایل': '📱',
      'هوش مصنوعی': '🧠',
      'شبکه': '🌐',
      'امنیت': '🔒',
      'داده': '📊',
      'Cloud': '☁️',
    };
    return icons[title] || '📚';
  };

  const getGradientColor = (title: string) => {
    const colors: { [key: string]: [string, string] } = {
      'تکنولوژی': ['#667eea', '#764ba2'],
      'برنامه نویسی': ['#f093fb', '#f5576c'],
      'طراحی': ['#4facfe', '#00f2fe'],
      'بازی': ['#fa709a', '#fee140'],
      'موبایل': ['#30cfd0', '#330867'],
      'هوش مصنوعی': ['#a8edea', '#fed6e3'],
      'شبکه': ['#ff9a9e', '#fecfef'],
      'امنیت': ['#ff6a88', '#ff99ac'],
      'داده': ['#43e97b', '#38f9d7'],
      'Cloud': ['#36d1dc', '#5b86e5'],
    };
    return colors[title] || ['#667eea', '#764ba2'];
  };

  const icon = getIcon(category.title);
  const gradientColors = getGradientColor(category.title);

  if (variant === 'list') {
    return (
      <TouchableOpacity style={styles.listContainer} onPress={handlePress} activeOpacity={0.8}>
        <View style={[styles.listIconContainer, { backgroundColor: gradientColors[0] }]}>
          <Text style={styles.listIcon}>{icon}</Text>
        </View>
        <View style={styles.listContent}>
          <Text style={styles.listTitle}>{category.title}</Text>
          <Text style={styles.listDescription} numberOfLines={1}>
            {category.description}
          </Text>
        </View>
        <View style={styles.listArrow}>
          <Text style={styles.listArrowText}>→</Text>
        </View>
      </TouchableOpacity>
    );
  }

  // حالت گرید (پیش‌فرض)
  return (
    <TouchableOpacity style={styles.gridContainer} onPress={handlePress} activeOpacity={0.85}>
      <View style={[styles.iconWrapper, { backgroundColor: `${gradientColors[0]}15` }]}>
        <View style={[styles.iconCircle, { backgroundColor: gradientColors[0] }]}>
          <Text style={styles.iconText}>{icon}</Text>
        </View>
      </View>
      <Text style={styles.gridTitle} numberOfLines={1}>
        {category.title}
      </Text>
      <Text style={styles.gridDescription} numberOfLines={2}>
        {category.description}
      </Text>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>۱۲ مقاله</Text>
        <Text style={styles.arrowIcon}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // حالت گرید
  gridContainer: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconText: {
    fontSize: 32,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 6,
    textAlign: 'center',
  },
  gridDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statsText: {
    fontSize: 11,
    color: '#f4511e',
    fontWeight: '600',
  },
  arrowIcon: {
    fontSize: 14,
    color: '#f4511e',
    fontWeight: '600',
  },

  // حالت لیستی
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  listIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  listIcon: {
    fontSize: 28,
  },
  listContent: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  listDescription: {
    fontSize: 12,
    color: '#666',
  },
  listArrow: {
    width: 30,
    alignItems: 'flex-end',
  },
  listArrowText: {
    fontSize: 18,
    color: '#f4511e',
    fontWeight: '600',
  },
});

export default CategoryCard;