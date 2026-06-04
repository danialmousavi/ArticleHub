import { TextInput, I18nManager } from 'react-native';

const RTLTextInput = (props: any) => {
  return (
    <TextInput
      {...props}
      textAlign={I18nManager.isRTL ? 'right' : 'left'}
      style={[{ textAlign: I18nManager.isRTL ? 'right' : 'left' }, props.style]}
    />
  );
};

export default RTLTextInput;