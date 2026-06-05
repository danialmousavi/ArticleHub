// screens/HomeScreen.tsx
import { View, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RTLText from '../components/RTLText';
import { useContext } from 'react';
import { MainContext } from '../utils/context/MainContext';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const context=useContext(MainContext)
  // دیتای تستی برای مقالات
  const articles = [
    { id: 1, title: 'آموزش React Native', description: 'یادگیری React Native از صفر تا صد', image: '📱' },
    { id: 2, title: 'برنامه‌نویسی با تایپ اسکریپت', description: 'تایپ اسکریپت و مزایای آن', image: '📘' },
    { id: 3, title: 'طراحی رابط کاربری', description: 'اصول طراحی UI/UX مدرن', image: '🎨' },
    { id: 4, title: 'بهینه‌سازی اپلیکیشن', description: 'بهبود عملکرد و سرعت اپ', image: '⚡' },
  ];

  // دیتای تستی برای دسته‌بندی‌ها
  const categories = [
    { id: 1, name: 'تکنولوژی', icon: '💻' },
    { id: 2, name: 'برنامه‌نویسی', icon: '👨‍💻' },
    { id: 3, name: 'طراحی', icon: '🎨' },
    { id: 4, name: 'بازی', icon: '🎮' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* هدر */}
        <View style={styles.header}>
          <View>
            <RTLText style={styles.greeting}>سلام 👋</RTLText>
            <RTLText style={styles.userName}>کاربر عزیز {context?.loginUser?context.user?.username:""}</RTLText>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <RTLText style={styles.profileIcon}>👤</RTLText>
          </TouchableOpacity>
        </View>

        {/* بنر تبلیغاتی */}
        <View style={styles.banner}>
          <RTLText style={styles.bannerTitle}>به اپلیکیشن ما خوش آمدید</RTLText>
          <RTLText style={styles.bannerText}>جدیدترین مقالات و آموزش‌ها را اینجا ببینید</RTLText>
        </View>

        {/* دسته‌بندی‌ها */}
        <View style={styles.section}>
          <RTLText style={styles.sectionTitle}>دسته‌بندی‌ها</RTLText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <RTLText style={styles.categoryIcon}>{category.icon}</RTLText>
                <RTLText style={styles.categoryName}>{category.name}</RTLText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* مقالات اخیر */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <RTLText style={styles.sectionTitle}>مقالات اخیر</RTLText>
            <TouchableOpacity>
              <RTLText style={styles.seeAllText}>مشاهده همه</RTLText>
            </TouchableOpacity>
          </View>

          {articles.map((article) => (
            <TouchableOpacity key={article.id} style={styles.articleCard}>
              <View style={styles.articleIconContainer}>
                <RTLText style={styles.articleIcon}>{article.image}</RTLText>
              </View>
              <View style={styles.articleContent}>
                <RTLText style={styles.articleTitle}>{article.title}</RTLText>
                <RTLText style={styles.articleDescription}>{article.description}</RTLText>
                <View style={styles.articleFooter}>
                  <RTLText style={styles.readMore}>مطالعه بیشتر</RTLText>
                  <RTLText style={styles.arrow}>←</RTLText>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* آمار */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <RTLText style={styles.statNumber}>۱,۲۳۴</RTLText>
            <RTLText style={styles.statLabel}>مقالات</RTLText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <RTLText style={styles.statNumber}>۵۶۷</RTLText>
            <RTLText style={styles.statLabel}>کاربران</RTLText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <RTLText style={styles.statNumber}>۸۹</RTLText>
            <RTLText style={styles.statLabel}>نویسندگان</RTLText>
          </View>
        </View>

        {/* فوتر */}
        <View style={styles.footer}>
          <RTLText style={styles.footerText}>نسخه ۱.۰.۰</RTLText>
          <RTLText style={styles.footerText}>© ۱۴۰۴ تمامی حقوق محفوظ است</RTLText>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Vasir',
    color: '#666',
  },
  userName: {
    fontSize: 20,
    fontFamily: 'VasirBold',
    color: '#1a1a1a',
    marginTop: 4,
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 22,
  },
  banner: {
    margin: 20,
    padding: 20,
    backgroundColor: '#007AFF',
    borderRadius: 16,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  bannerTitle: {
    fontSize: 20,
    fontFamily: 'VasirBold',
    color: '#fff',
    marginBottom: 8,
  },
  bannerText: {
    fontSize: 14,
    fontFamily: 'Vasir',
    color: '#e0e0e0',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'VasirBold',
    color: '#1a1a1a',
  },
  seeAllText: {
    fontSize: 13,
    fontFamily: 'Vasir',
    color: '#007AFF',
  },
  categoriesScroll: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 13,
    fontFamily: 'Vasir',
    color: '#333',
  },
  articleCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  articleIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  articleIcon: {
    fontSize: 30,
  },
  articleContent: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontFamily: 'VasirBold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  articleDescription: {
    fontSize: 13,
    fontFamily: 'Vasir',
    color: '#666',
    marginBottom: 8,
  },
  articleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMore: {
    fontSize: 12,
    fontFamily: 'Vasir',
    color: '#007AFF',
  },
  arrow: {
    fontSize: 12,
    marginRight: 4,
    color: '#007AFF',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontFamily: 'VasirBold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontFamily: 'Vasir',
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Vasir',
    color: '#999',
    marginBottom: 4,
  },
});

export default HomeScreen;