import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { BASE_URL } from "../../utils/config";
import { ArticleType } from "../../utils/types/Article";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

type ArticleCardProps = {
  article: ArticleType;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  const [imageError, setImageError] = useState(false);
  const navigation = useNavigation<any>();

  const getImageUrl = () => {
    if (!article.image) return null;
    if (article.image.startsWith("http")) return article.image;
    if (article.image.startsWith("/public/"))
      return `${BASE_URL}${article.image}`;
    if (article.image.startsWith("public/"))
      return `${BASE_URL}/${article.image}`;
    return `${BASE_URL}/public/${article.image}`;
  };

  const imageUrl = getImageUrl();
  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "fa-IR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  //press article card
  const handlePress = () => {
    console.log(article.id);
    // navigation.navigate("ArticleDetail", {
    //   articleId: article.id,
    // });
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageWrapper}>
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
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{article.categoryId}</Text>
        </View>
      </View>

      {/* بخش محتوا */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>

        <Text style={styles.description} numberOfLines={3}>
          {article.content?.replace(/<[^>]*>/g, "").substring(0, 150)}...
        </Text>

        <View style={styles.footer}>
          <View style={styles.authorContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {article.author?.charAt(0) || "ن"}
              </Text>
            </View>
            <Text style={styles.author}>{article.author}</Text>
          </View>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    overflow: "hidden",
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },
  imagePlaceholder: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 48,
  },
  categoryBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#f4511e",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 8,
    lineHeight: 26,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f4511e",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  avatarText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  author: {
    fontSize: 13,
    color: "#666",
  },
  date: {
    fontSize: 11,
    color: "#999",
  },
});

export default ArticleCard;
