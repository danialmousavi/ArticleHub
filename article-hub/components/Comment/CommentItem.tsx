// src/components/Comment/CommentItem.tsx
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { ArticleCommentType } from '../../utils/types/Article';

type CommentItemProps = {
  comment: ArticleCommentType;
};

const CommentItem = ({ comment }: CommentItemProps) => {
  const formattedDate = new Date(comment.createdAt).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{comment.author?.charAt(0) || 'ک'}</Text>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.author}>{comment.author}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
      <Text style={styles.content}>{comment.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContent: {
    flex: 1,
  },
  author: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  date: {
    fontSize: 11,
    color: '#999',
  },
  content: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
});

export default CommentItem;