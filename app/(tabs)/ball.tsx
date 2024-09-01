import Ball from '@/src/Ball';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Ball />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
});
