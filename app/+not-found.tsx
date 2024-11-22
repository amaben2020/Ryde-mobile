import { Link } from 'expo-router';
import { Text } from 'react-native';

const NotFound = () => {
  return (
    <Link href="/">
      <Text>Not Found</Text>
    </Link>
  );
};

export default NotFound;
