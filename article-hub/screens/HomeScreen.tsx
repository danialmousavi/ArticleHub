// src/screens/HomeScreen.tsx
import { View, ScrollView, StyleSheet, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getArticles } from '../services/article/ArticleService';
import { getCategories } from '../services/category/CategoryService';
import { ArticleType } from '../utils/types/Article';
import { CategoryType } from '../utils/types/Category';
import { BASE_URL } from '../utils/config';
import { MainContext } from '../utils/context/MainContext';
import HeroSection from '../components/Home/HeroSection';
import CategoriesSection from '../components/Home/CategoriesSection';
import FeaturedArticles from '../components/Home/FeaturedArticles';
import StatsSection from '../components/Home/StatsSection';
import LatestArticles from '../components/Home/LatestArticles';
import SpecialOfferSection from '../components/Home/SpecialOfferSection';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const context = useContext(MainContext);
  const isLogin = context?.isLogin || false;
  const user = context?.user || null;

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [featuredArticles, setFeaturedArticles] = useState<ArticleType[]>([]);
  const [latestArticles, setLatestArticles] = useState<ArticleType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const loadHomeData = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    try {
      const [articlesRes, categoriesRes] = await Promise.all([
        getArticles(),
        getCategories()
      ]);

      if (articlesRes.success && articlesRes.data) {
        setFeaturedArticles(articlesRes.data.slice(0, 5));
        setLatestArticles(articlesRes.data.slice(0, 6));
      }

      if (categoriesRes.success && categoriesRes.data) {
        setCategories(categoriesRes.data.slice(0, 6));
      }
    } catch (error) {
      Alert.alert('خطا', 'مشکلی در بارگذاری اطلاعات پیش آمد');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  useFocusEffect(useCallback(() => { loadHomeData(); }, []));

  const onRefresh = () => {
    setRefreshing(true);
    loadHomeData(true);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fa-IR', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `${BASE_URL}${imagePath.startsWith('/public/') ? imagePath : `/public/${imagePath}`}`;
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#f4511e"]} />}
    >
      <HeroSection isLogin={isLogin} username={user?.username} onPress={() => navigation.navigate('Articles')} />
      <CategoriesSection
        categories={categories}
        onPressCategory={(id, title, desc) => navigation.navigate('CategoryDetail', { id, title, description: desc })}
        onSeeAll={() => navigation.navigate('Categories')}
      />
      <FeaturedArticles
        articles={featuredArticles}
        formatDate={formatDate}
        getImageUrl={getImageUrl}
        onPressArticle={(id) => navigation.navigate('ArticleDetail', { articleId: id })}
        onSeeAll={() => navigation.navigate('Articles')}
      />
      <StatsSection />
      <LatestArticles
        articles={latestArticles}
        formatDate={formatDate}
        onPressArticle={(id) => navigation.navigate('ArticleDetail', { articleId: id })}
        onSeeAll={() => navigation.navigate('Articles')}
      />
      <SpecialOfferSection />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' },
});

export default HomeScreen;