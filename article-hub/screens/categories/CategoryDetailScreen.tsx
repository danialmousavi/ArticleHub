import { View, Text, FlatList, Alert, ActivityIndicator, RefreshControl, StyleSheet, BackHandler, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { getCategoryArticles } from '../../services/category/CategoryService';
import { ArticleType } from '../../utils/types/Article';
import ArticleCard from '../../components/Article/ArticleCard';

const CategoryDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { id, title, description } = route.params as { id: string; title: string; description: string };
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [articles, setArticles] = useState<ArticleType[]>([]);

  const CATEGORY_ICON = '📂';
  const CATEGORY_COLOR = '#f4511e';

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Categories');
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => backHandler.remove();
    }, [navigation])
  );

  const loadArticles = useCallback(async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    
    const response = await getCategoryArticles(id);
    
    if (response.success && response.data) {
      setArticles(response.data);
    } else {
      Alert.alert("خطا", response.message);
    }
    
    setLoading(false);
    setRefreshing(false);
  }, [id]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerStyle: {
        backgroundColor: CATEGORY_COLOR,
      },
      headerLeft: () => (
        <TouchableOpacity 
          onPress={() => navigation.navigate('Categories')} 
          style={{ marginLeft: 15 }}
        >
          <Text style={{ fontSize: 20, color: '#fff' }}>←</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, title]);

  const onRefresh = () => {
    setRefreshing(true);
    loadArticles(true);
  };

  const handleArticlePress = (article: ArticleType) => {
    navigation.navigate('ArticleDetail', {
      articleId: article.id
    });
  };

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: CATEGORY_COLOR }]}>
      <View style={styles.headerContent}>
        <Text style={styles.categoryIcon}>{CATEGORY_ICON}</Text>
        <Text style={styles.categoryTitle}>{title}</Text>
        <Text style={styles.categoryDescription}>{description}</Text>
      </View>
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{articles.length}</Text>
          <Text style={styles.statLabel}>مقاله</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>۵ دقیقه</Text>
          <Text style={styles.statLabel}>زمان مطالعه</Text>
        </View>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={CATEGORY_COLOR} />
        <Text style={styles.loadingText}>در حال بارگذاری مقالات...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <ArticleCard 
          article={item} 
        />
      )}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
          colors={[CATEGORY_COLOR]} 
          tintColor={CATEGORY_COLOR}
          title="در حال بروزرسانی..."
          titleColor={CATEGORY_COLOR}
        />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📭</Text>
          <Text style={styles.emptyText}>مقاله‌ای در این دسته وجود ندارد</Text>
          <Text style={styles.emptySubtext}>به زودی مقالات جدید اضافه می‌شوند</Text>
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  categoryDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 20,
  },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 12,
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
    color: 'rgba(255,255,255,0.8)',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
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

export default CategoryDetailScreen;