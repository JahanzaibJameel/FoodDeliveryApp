import { Animated } from 'react-native';

export const fadeIn = (value, duration = 300) => {
  return Animated.timing(value, {
    toValue: 1,
    duration,
    useNativeDriver: true,
  });
};

export const fadeOut = (value, duration = 300) => {
  return Animated.timing(value, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  });
};

export const slideIn = (value, from = 'bottom', duration = 300) => {
  const toValue = from === 'bottom' ? 0 : 1;
  return Animated.timing(value, {
    toValue,
    duration,
    useNativeDriver: true,
  });
};

export const slideOut = (value, to = 'bottom', duration = 300) => {
  const toValue = to === 'bottom' ? 1 : 0;
  return Animated.timing(value, {
    toValue,
    duration,
    useNativeDriver: true,
  });
};

export const scaleIn = (value, duration = 300) => {
  return Animated.spring(value, {
    toValue: 1,
    friction: 8,
    tension: 40,
    useNativeDriver: true,
  });
};

export const scaleOut = (value, duration = 300) => {
  return Animated.timing(value, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  });
};

export const createShakeAnimation = (value) => {
  return Animated.sequence([
    Animated.timing(value, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(value, {
      toValue: -10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(value, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(value, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }),
  ]);
};