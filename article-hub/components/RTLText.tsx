import { Text, I18nManager, StyleSheet } from 'react-native';

const RTLText = ({ style, children, ...props }: any) => {
  return (
    <Text
      style={[styles.text, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
});

export default RTLText;