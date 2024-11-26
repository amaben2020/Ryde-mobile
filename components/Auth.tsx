import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Image } from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import CustomButton from './CustomButton';
import { icons } from '@/constants';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

const SignInWithOAuth = ({
  strategy,
}: {
  strategy: 'oauth_google' | 'oauth_apple';
}) => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: strategy });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL('/'),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <CustomButton
      title="Sign in"
      onPress={onPress}
      bgVariant="outline"
      IconLeft={() =>
        strategy === 'oauth_google' ? (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        ) : (
          <Image
            source={icons.apple}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )
      }
      textVariant="primary"
    />
  );
};
export default SignInWithOAuth;
