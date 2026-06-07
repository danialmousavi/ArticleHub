import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { ArticleType } from '../../utils/types/Article';

const { width } = Dimensions.get('window');

type FeaturedArticlesProps = {
  articles: ArticleType[];
  formatDate: (date: string) => string;
  getImageUrl: (path: string) => string | null;
  onPressArticle: (id: string) => void;
  onSeeAll: () => void;
};

const FeaturedArticles = ({ articles, formatDate, getImageUrl, onPressArticle, onSeeAll }: FeaturedArticlesProps) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>مقالات ویژه</Text>
          <Text style={styles.sectionSubtitle}>پربازدیدترین‌های این هفته</Text>
        </View>
        <TouchableOpacity onPress={onSeeAll} style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>مشاهده همه</Text>
          <Text style={styles.seeAllArrow}>›</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredList}
      >
        {articles.map((item) => {
          const imageUrl = getImageUrl(item.image);
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.featuredCard}
              onPress={() => onPressArticle(item.id)}
            >
              {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.featuredImage} />
              ) : (
                <View style={[styles.featuredImage, styles.imagePlaceholder]}>
                  <Text style={styles.placeholderText}>📷</Text>
                </View>
              )}
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>ویژه</Text>
              </View>
              <View style={styles.featuredContent}>
                <Text style={styles.featuredCategory}>{item.categoryId}</Text>
                <Text style={styles.featuredTitle} numberOfLines={2}>{item.title}</Text>
                <View style={styles.featuredFooter}>
                  <Text style={styles.featuredAuthor}>✍️ {item.author}</Text>
                  <Text style={styles.featuredDate}>📅 {formatDate(item.createdAt)}</Text>
                </View>
              </View>
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
  featuredList: {
    paddingRight: 16,
  },
  featuredCard: {
    width: width - 80,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#f4511e',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  featuredContent: {
    padding: 16,
  },
  featuredCategory: {
    fontSize: 11,
    color: '#f4511e',
    fontWeight: '600',
    marginBottom: 6,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 10,
    lineHeight: 22,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredAuthor: {
    fontSize: 11,
    color: '#999',
  },
  featuredDate: {
    fontSize: 10,
    color: '#bbb',
  },
});

export default FeaturedArticles;