import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions, Alert, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getArticleDetail } from "../../services/article/ArticleService";
import { ArticleType } from "../../utils/types/Article";
import { BASE_URL } from "../../utils/config";

const { width } = Dimensions.get('window');

const ArticleDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { articleId } = route.params as { articleId: string };
  
  const [article, setArticle] = useState<ArticleType | null>();
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  //get article data
  const loadArticleDetail = async () => {
    setLoading(true);
    const response = await getArticleDetail(articleId);
    
    if (response.success && response.data) {
      setArticle(response.data);
    } else {
      Alert.alert("خطا", response.message);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    loadArticleDetail();
  }, [articleId]);


// back to articles screen when back button clicked by user
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Articles');
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);


  //change image url
  const getImageUrl = () => {
    if (!article?.image) return null;
    if (article.image.startsWith('http')) return article.image;
    if (article.image.startsWith('/public/')) return `${BASE_URL}${article.image}`;
    if (article.image.startsWith('public/')) return `${BASE_URL}/${article.image}`;
    return `${BASE_URL}/public/${article.image}`;
  };

  const imageUrl = getImageUrl();
  const formattedDate = article?.createdAt 
    ? new Date(article.createdAt).toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';
//handle loading ...
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f4511e" />
        <Text style={styles.loadingText}>در حال بارگذاری مقاله...</Text>
      </View>
    );
  }

  if (!article) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorEmoji}>😞</Text>
        <Text style={styles.errorText}>مقاله یافت نشد</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>بازگشت به مقالات</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* تصویر هدر */}
      <View style={styles.imageContainer}>
        {!imageError && imageUrl ? (
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Text style={styles.placeholderText}>📷</Text>
          </View>
        )}
        <View style={styles.imageOverlay}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{article.categoryId}</Text>
          </View>
        </View>
      </View>

      {/* محتوای مقاله */}
      <View style={styles.content}>
        {/* عنوان */}
        <Text style={styles.title}>{article.title}</Text>

        {/* اطلاعات نویسنده و تاریخ */}
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{article.author?.charAt(0) || 'ن'}</Text>
            </View>
            <Text style={styles.authorName}>{article.author}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>📅</Text>
            <Text style={styles.metaText}>{formattedDate}</Text>
          </View>
        </View>

        {/* خط جداکننده */}
        <View style={styles.divider} />

        {/* متن اصلی مقاله */}
        <Text style={styles.body}>
          {article.content?.replace(/<[^>]*>/g, '')}
        </Text>

        {/* فوتر */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>📖 مطالعه این مقاله</Text>
          <Text style={styles.readTime}>زمان مطالعه: ۵ دقیقه</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#f4511e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 64,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  categoryBadge: {
    backgroundColor: '#f4511e',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
    lineHeight: 34,
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  authorName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  metaIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  body: {
    fontSize: 16,
    color: '#444',
    lineHeight: 28,
    textAlign: 'justify',
    marginBottom: 30,
  },
  footer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#f4511e',
    fontWeight: '600',
  },
  readTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default ArticleDetailScreen;