import React, { ReactNode, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  onClose: () => void;
  content?: ReactNode;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, content }) => {
  const [open, setOpen] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(-100))[0];

  // Colors based on toast type
  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return '#4CAF50';
      case 'error': return '#F44336';
      case 'warning': return '#FF9800';
      default: return '#4CAF50';
    }
  };

  useEffect(() => {
    // Slide in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    // Slide out animation before closing
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setOpen(false);
      onClose();
    });
  };

  if (!open) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.message}>{message}</Text>
        {content && <View style={styles.extraContent}>{content}</View>}
      </View>
      
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Icon name="close" size={20} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '90%',
    maxWidth: 400,
    borderRadius: 4,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
  },
  message: {
    color: '#fff',
    fontSize: 16,
  },
  extraContent: {
    marginTop: 8,
  },
  closeButton: {
    marginLeft: 16,
    padding: 4,
  },
});

export default Toast;