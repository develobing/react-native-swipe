import React, { useRef } from 'react';
import { Animated, PanResponder, StyleSheet } from 'react-native';

const DragBox = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      // 사용자가 터치를 시작할 때 PanResponder가 활성화될지 결정
      onMoveShouldSetPanResponder: () => true,

      // PanResponder가 제스처를 차단하기로 결정하면 호출
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },

      // 사용자가 터치한 상태에서 손가락을 움직일 때 호출
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),

      // 사용자가 터치를 끝내고 손가락을 화면에서 뗄 때 호출
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers} // PanResponder 이벤트 핸들러 연결
      style={[pan.getLayout(), styles.box]} // 애니메이션 값 적용
    />
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue',
  },
});

export default DragBox;
