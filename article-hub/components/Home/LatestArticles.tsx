import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { ArticleType } from '../../utils/types/Article';

type LatestArticlesProps = {
  articles: ArticleType[];
  formatDate: (date: string) => string;
  onPressArticle: (id: string) => void;
  onSeeAll: () => void;
};

const LatestArticles = ({ articles, formatDate, onPressArticle, onSeeAll }: LatestArticlesProps) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>آخرین مقالات</Text>
          <Text style={styles.sectionSubtitle}>تازه‌ترین مطالب منتشر شده</Text>
        </View>
        <TouchableOpacity onPress={onSeeAll} style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>مشاهده همه</Text>
          <Text style={styles.seeAllArrow}>›</Text>
        </TouchableOpacity>
      </View>
      {articles.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={styles.articleCard}
          onPress={() => onPressArticle(item.id)}
          activeOpacity={0.9}
        >
          <View style={styles.articleNumber}>
            <Text style={styles.articleNumberText}>{(index + 1).toString().padStart(2, '0')}</Text>
          </View>
          <View style={styles.articleContent}>
            <Text style={styles.articleTitle} numberOfLines={2}>{item.title}</Text>
            <View style={styles.articleMeta}>
              <View style={styles.articleAuthor}>
                <Text style={styles.articleAuthorIcon}>👤</Text>
                <Text style={styles.articleAuthorText}>{item.author}</Text>
              </View>
              <View style={styles.articleDate}>
                <Text style={styles.articleDateIcon}>📅</Text>
                <Text style={styles.articleDateText}>{formatDate(item.createdAt)}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.articleArrow}>›</Text>
        </TouchableOpacity>
      ))}
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
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  articleNumber: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f4511e10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  articleNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4511e',
  },
  articleContent: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 8,
    lineHeight: 20,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  articleAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  articleAuthorIcon: {
    fontSize: 10,
  },
  articleAuthorText: {
    fontSize: 11,
    color: '#999',
  },
  articleDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  articleDateIcon: {
    fontSize: 10,
  },
  articleDateText: {
    fontSize: 11,
    color: '#999',
  },
  articleArrow: {
    fontSize: 20,
    color: '#ccc',
    marginLeft: 8,
  },
});

export default LatestArticles;