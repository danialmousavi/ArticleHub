import { View, Text, Alert, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { CategoryType } from '../../utils/types/Category';
import { getCategories } from '../../services/category/CategoryService';

const CategoriesScreen = () => {
     const [loading, setLoading] = useState(true);
      const [refreshing, setRefreshing] = useState(false);
      const [articles, setArticles] = useState<CategoryType[]>([]);
    
      const loadArticles = useCallback(async (isRefresh = false) => {
        if (!isRefresh) setLoading(true);
        
        const response = await getCategories();
        console.log(response);
        
        if (response.success && response.data) {
          setArticles(response.data);
        } else {
          Alert.alert("خطا", response.message);
        }
        
        setLoading(false);
        setRefreshing(false);
      }, []);
    
      useEffect(() => {
        loadArticles();
      }, [loadArticles]);
    
      const onRefresh = () => {
        setRefreshing(true);
        loadArticles(true);
      };
    
    
    
      if (loading && !refreshing) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#f4511e" />
            <Text style={styles.loadingText}>در حال بارگذاری مقالات...</Text>
          </View>
        );
      }
    
  return (
    <View>
      <Text>CategoriesScreen</Text>
    </View>
  )
}

export default CategoriesScreen

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
  }
})