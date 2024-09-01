import React, { useEffect, useState } from 'react';
import { View, Animated, Text } from 'react-native';

const Ball = () => {
  const [position, setPosition] = useState(
    new Animated.ValueXY({ x: 0, y: 0 })
  );

  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: 200, y: 500 },
    }).start();
  }, []);

  return (
    <Animated.View style={position.getLayout()}>
      <View style={styles.ball} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Ball</Text>
      </View>
    </Animated.View>
  );
};

const styles = {
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black',
  },
  textContainer: {
    width: 60,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
};

export default Ball;
