import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { CategoryType } from '../../utils/types/Category';

const { width } = Dimensions.get('window');

type CategoriesSectionProps = {
  categories: CategoryType[];
  onPressCategory: (id: string, title: string, description: string) => void;
  onSeeAll: () => void;
};

const CategoriesSection = ({ categories, onPressCategory, onSeeAll }: CategoriesSectionProps) => {
  const colors = ['#667eea', '#f5576c', '#4facfe', '#fa709a', '#30cfd0', '#a8edea'];

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>دسته‌بندی‌ها</Text>
          <Text style={styles.sectionSubtitle}>مرتب‌سازی بر اساس موضوع</Text>
        </View>
        <TouchableOpacity onPress={onSeeAll} style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>مشاهده همه</Text>
          <Text style={styles.seeAllArrow}>›</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      >
        {categories.map((item, index) => {
          const color = colors[index % colors.length];
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.categoryCard, { backgroundColor: color + '10' }]}
              onPress={() => onPressCategory(item.id, item.title, item.description)}
            >
              <View style={[styles.categoryIconWrapper, { backgroundColor: color }]}>
                <Text style={styles.categoryIcon}>📁</Text>
              </View>
              <Text style={styles.categoryTitle}>{item.title}</Text>
              <Text style={styles.categoryCount}>۱۲ مقاله</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  seeAllText: {
    fontSize: 12,
    color: '#f4511e',
    fontWeight: '500',
  },
  seeAllArrow: {
    fontSize: 14,
    color: '#f4511e',
    marginLeft: 4,
  },
  categoriesList: {
    paddingRight: 16,
  },
  categoryCard: {
    width: 100,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginRight: 12,
  },
  categoryIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIcon: {
    fontSize: 28,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 10,
    color: '#999',
  },
});

export default CategoriesSection;