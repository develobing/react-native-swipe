import { ICardData } from '@/app/(tabs)';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  UIManager,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Deck = ({
  data,
  renderCard,
  renderNoMoreCards = () => <Text>No more cards</Text>,
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
}: {
  data: ICardData[];
  renderCard: (item: ICardData) => JSX.Element;
  renderNoMoreCards?: () => JSX.Element;
  onSwipeLeft?: (item: ICardData) => void;
  onSwipeRight?: (item: ICardData) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position] = useState(new Animated.ValueXY({ x: 0, y: 0 }));

  const [panResponder] = React.useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },

      onPanResponderRelease: (event, gesture) => {
        position.flattenOffset();

        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
          // // // console.log('event', event);
          // // position.setOffset({
          // //   x: position.x._value,
          // //   y: position.y._value,
          // // });
          // position.setValue({ x: gesture.dx, y: gesture.dy });
        }
      },
    })
  );

  const forceSwipe = (type: 'left' | 'right') => {
    const x = type === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(type));
  };

  const onSwipeComplete = (type: 'left' | 'right') => {
    const item = data[currentIndex];
    type === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    setCurrentIndex((prev) => prev + 1);
    position.setValue({ x: 0, y: 0 });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const layout = position.getLayout();
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...layout,
      top: 0,
      transform: [{ rotate }],
    };
  };

  const renderCards = () => {
    if (currentIndex >= data.length) {
      animateLayout();

      return <View style={styles.cardStyle}>{renderNoMoreCards()}</View>;
    }

    return data
      .map((item, index) => {
        // 이전 카드
        if (index < currentIndex) {
          return null;
        }

        // 다음 카드
        else if (index > currentIndex) {
          if (currentIndex > 0) animateLayout();

          return (
            <Animated.View
              key={item.id}
              style={[styles.cardStyle, { top: 10 * (index - currentIndex) }]}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }

        // 현재 카드
        else if (index === currentIndex) {
          return (
            <Animated.View
              key={item.id}
              {...panResponder.panHandlers}
              style={[getCardStyle(), styles.cardStyle]}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  const animateLayout = () => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [data]);

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
});

export default Deck;
