// ToastContainer.tsx
import React from 'react';
import Toast from './Toast';
import { useToastStore } from '@store/toastStore';
import { useShallow } from 'zustand/shallow';
import { StyleSheet, View } from 'react-native';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore(
    useShallow((state) => ({
      toasts: state.toasts,
      removeToast: state.removeToast,
    }))
  );

  return (
    <View style={styles.container}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          content={toast.content}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1400, // above modal
    display: 'flex',
    flexDirection: 'column',
    gap: 8, // spacing between toasts
    width: '90%', // take most of screen width
    maxWidth: 400, // but not too wide on tablets
    alignItems: 'flex-end', // align toasts to the right
  },
});

export default ToastContainer;