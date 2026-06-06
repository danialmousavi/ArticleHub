// src/components/Comment/CommentSection.tsx
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import CommentItem from './CommentItem';
import { MainContext } from '../../utils/context/MainContext';
import { ArticleCommentType } from '../../utils/types/Article';
import { createComment, getArticleComments } from '../../services/Comment/CommentService';

type CommentSectionProps = {
  articleId: string;
};

const CommentSection = ({ articleId }: CommentSectionProps) => {
  const context = useContext(MainContext);
  const isLogin = context?.isLogin || false;
  const user = context?.user || null;
  
  const [comments, setComments] = useState<ArticleCommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

    //get comments
  const loadComments = async () => {
    setLoading(true);
    const response = await getArticleComments(articleId);
    
    if (response.success && response.data) {
      setComments(response.data);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    loadComments();
  }, [articleId]);

  //create comment
  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      Alert.alert('خطا', 'لطفاً متن کامنت را وارد کنید');
      return;
    }

    if (!isLogin) {
      Alert.alert('خطا', 'برای ثبت کامنت باید وارد شوید');
      return;
    }

    setSubmitting(true);
    const response = await createComment(newComment.trim(), articleId);
    
    if (response.success && response.data) {
      Alert.alert('موفقیت', response.message);
      setNewComment('');
      await loadComments();
    } else {
      Alert.alert('خطا', response.message);
    }
    
    setSubmitting(false);
  };

  // show comment form
  const renderCommentForm = () => {
    if (!isLogin) {
      return (
        <View style={styles.loginMessageContainer}>
          <Text style={styles.loginMessage}>💬 برای ثبت کامنت وارد شوید</Text>
        </View>
      );
    }

    return (
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <View style={styles.smallAvatar}>
            <Text style={styles.smallAvatarText}>{user?.username?.charAt(0) || 'ک'}</Text>
          </View>
          <Text style={styles.formTitle}>نظر خود را بنویسید</Text>
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="نظر خود را بنویسید..."
          placeholderTextColor="#999"
          value={newComment}
          onChangeText={setNewComment}
          multiline
          textAlignVertical="top"
        />
        
        <TouchableOpacity
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={handleSubmitComment}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>ارسال نظر</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>💬 نظرات</Text>
        <Text style={styles.commentCount}>{comments.length} نظر</Text>
      </View>

      {renderCommentForm()}

      <View style={styles.divider} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#f4511e" />
          <Text style={styles.loadingText}>در حال بارگذاری نظرات...</Text>
        </View>
      ) : comments.length > 0 ? (
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CommentItem comment={item} />}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>💭</Text>
          <Text style={styles.emptyText}>هنوز نظری ثبت نشده است</Text>
          <Text style={styles.emptySubtext}>اولین نفری باشید که نظر می‌دهد</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  commentCount: {
    fontSize: 13,
    color: '#f4511e',
    fontWeight: '600',
  },
  formContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    marginBottom: 16,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  smallAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  formTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#333',
    minHeight: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#f4511e',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loginMessageContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginMessage: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  loadingContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 13,
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 6,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#999',
  },
});

export default CommentSection;