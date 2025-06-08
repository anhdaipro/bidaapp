import { StyleSheet } from 'react-native';
import { LightColors, DarkColors } from '@store/themeStore';
type ThemeMode = 'light' | 'dark';
// ====== 1. Hàm trả về styles theo theme ======
export const getStyles = (theme: ThemeMode) => {
  const Colors = theme === 'dark' ? DarkColors : LightColors;
  return StyleSheet.create({
    // === Container ===
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      padding: 16,
    },
    containerSecondary: {
      flex: 1,
      backgroundColor: Colors.backgroundSecondary,
      padding: 16,
    },

    // === Text ===
    textPrimary: {
      fontSize: 16,
      color: Colors.textPrimary,
    },
    textSecondary: {
      fontSize: 14,
      color: Colors.textSecondary,
    },
    textOnPrimary: {
      fontSize: 16,
      color: Colors.textOnPrimary,
    },

    // === Button ===
    buttonPrimary: {
      backgroundColor: Colors.primary,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonSecondary: {
      backgroundColor: Colors.secondary,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },

    // === Input ===
    input: {
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 8,
      padding: 12,
      backgroundColor: Colors.card,
      color: Colors.textPrimary,
    },

    // === Card ===
    card: {
      backgroundColor: Colors.card,
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },

    // === Header ===
    header: {
      backgroundColor: Colors.primary,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};

// ====== 2. Typography (Không phụ thuộc theme) ======
export const Typography = StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 22,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
  },
});