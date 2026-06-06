import { View, Text, FlatList, Alert, ActivityIndicator, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CategoryType } from '../../utils/types/Category';
import { getCategories } from '../../services/category/CategoryService';
import CategoryCard from '../../components/category/CategoryCard';

const CategoriesScreen = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const loadCategories = useCallback(async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    
    const response = await getCategories();
    
    if (response.success && response.data) {
      setCategories(response.data);
    } else {
      Alert.alert("خطا", response.message);
    }
    
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const onRefresh = () => {
    setRefreshing(true);
    loadCategories(true);
  };

  const handleCategoryPress = (category: CategoryType) => {
     navigation.navigate('CategoryDetail', {
      id: category.id,
      title: category.title,
      description: category.description,
    });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerEmoji}>📂</Text>
      <Text style={styles.headerTitle}>دسته‌بندی‌ها</Text>
      <Text style={styles.headerSubtitle}>مرتب‌سازی مقالات بر اساس موضوع</Text>
      
      <View style={styles.headerStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{categories.length}</Text>
          <Text style={styles.statLabel}>دسته‌بندی</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>۲۰۰+</Text>
          <Text style={styles.statLabel}>مقاله</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>۱۰+</Text>
          <Text style={styles.statLabel}>موضوع</Text>
        </View>
      </View>

      {/* change view button */}
      <View style={styles.viewToggle}>
        <TouchableOpacity 
          style={[styles.toggleButton, viewMode === 'grid' && styles.toggleActive]} 
          onPress={() => setViewMode('grid')}
        >
          <Text style={[styles.toggleText, viewMode === 'grid' && styles.toggleTextActive]}>📱 گرید</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleButton, viewMode === 'list' && styles.toggleActive]} 
          onPress={() => setViewMode('list')}
        >
          <Text style={[styles.toggleText, viewMode === 'list' && styles.toggleTextActive]}>📋 لیست</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f4511e" />
        <Text style={styles.loadingText}>در حال بارگذاری دسته‌بندی‌ها...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <CategoryCard
          category={item} 
          onPress={handleCategoryPress}
          variant={viewMode}
        />
      )}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
          colors={["#f4511e"]} 
          tintColor="#f4511e"
        />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      numColumns={viewMode === 'grid' ? 2 : 1}
      key={viewMode} // مهم: برای بازسازی layout با تغییر نما
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📭</Text>
          <Text style={styles.emptyText}>دسته‌بندی وجود ندارد</Text>
          <Text style={styles.emptySubtext}>به زودی دسته‌بندی‌ها اضافه می‌شوند</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 40,
    paddingTop: 8,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#f4511e',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 16,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffe0b2',
    marginBottom: 24,
    lineHeight: 20,
  },
  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 12,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#ffe0b2',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  toggleActive: {
    backgroundColor: '#fff',
  },
  toggleText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
  },
  toggleTextActive: {
    color: '#f4511e',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});

export default CategoriesScreen;