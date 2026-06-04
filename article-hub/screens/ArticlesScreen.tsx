import { View, Text, FlatList, Alert, ActivityIndicator, RefreshControl, StyleSheet } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { getArticles } from "../services/article/ArticleService";
import { ArticleType } from "../utils/types/Article";
import ArticleCard from "../components/Article/ArticleCard";

const ArticlesScreen = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [articles, setArticles] = useState<ArticleType[]>([]);

  const loadArticles = useCallback(async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    
    const response = await getArticles();
    
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

  const handleArticlePress = (article: ArticleType) => {
    Alert.alert("مقاله", article.title, [
      { text: "خواندن", onPress: () => console.log("رفتن به صفحه مقاله", article.id) },
      { text: "بستن", style: "cancel" },
    ]);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerEmoji}>📚</Text>
      <Text style={styles.headerTitle}>مجله تخصصی</Text>
      <Text style={styles.headerSubtitle}>جدیدترین مقالات و مطالب خواندنی</Text>
      
      <View style={styles.headerStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{articles.length}</Text>
          <Text style={styles.statLabel}>مقاله</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>۱۵۰۰+</Text>
          <Text style={styles.statLabel}>مخاطب</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>۵۰+</Text>
          <Text style={styles.statLabel}>نویسنده</Text>
        </View>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f4511e" />
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
          onPress={handleArticlePress}
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
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📭</Text>
          <Text style={styles.emptyText}>مقاله‌ای وجود ندارد</Text>
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
    backgroundColor: '#f4511e',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
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

export default ArticlesScreen;