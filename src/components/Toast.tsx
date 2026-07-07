import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastPosition = 'top' | 'bottom';

interface ToastConfig {
  message: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  action?: {
    label: string;
    onPress: () => void;
  };
  onClose?: () => void;
}

interface ToastContextType {
  show: (config: ToastConfig) => void;
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  warning: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
  hide: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const TYPE_CONFIG: Record<ToastType, { color: string; icon: string }> = {
  success: { color: Colors.success, icon: '✓' },
  error: { color: Colors.danger, icon: '✕' },
  warning: { color: Colors.warning, icon: '!' },
  info: { color: Colors.primary, icon: 'i' },
};

const DEFAULT_DURATION = 3000;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastConfig | null>(null);
  const [visible, setVisible] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const hide = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      toast?.onClose?.();
      setToast(null);
    });
  }, [toast]);

  const show = useCallback((config: ToastConfig) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setToast(config);
    setVisible(true);
    animatedValue.setValue(0);

    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      damping: 20,
      stiffness: 200,
    }).start();

    const duration = config.duration ?? DEFAULT_DURATION;
    if (duration > 0) {
      timerRef.current = setTimeout(() => {
        hide();
      }, duration);
    }
  }, [hide]);

  const success = useCallback((message: string, description?: string) => {
    show({ message, description, type: 'success' });
  }, [show]);

  const error = useCallback((message: string, description?: string) => {
    show({ message, description, type: 'error' });
  }, [show]);

  const warning = useCallback((message: string, description?: string) => {
    show({ message, description, type: 'warning' });
  }, [show]);

  const info = useCallback((message: string, description?: string) => {
    show({ message, description, type: 'info' });
  }, [show]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: toast?.position === 'top' ? [-100, 0] : [100, 0],
  });

  const renderToast = () => {
    if (!visible || !toast) return null;

    const type = toast.type || 'info';
    const config = TYPE_CONFIG[type];
    const position = toast.position || 'bottom';

    return (
      <Animated.View
        style={[
          styles.container,
          position === 'top' ? styles.top : styles.bottom,
          {
            transform: [{ translateY }],
            opacity: animatedValue,
          },
        ]}
      >
        <Pressable
          style={[styles.toast, { borderLeftColor: config.color }]}
          onPress={hide}
        >
          <View style={[styles.iconContainer, { backgroundColor: config.color }]}>
            <Text style={styles.icon}>{config.icon}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.message} numberOfLines={2}>
              {toast.message}
            </Text>
            {toast.description && (
              <Text style={styles.description} numberOfLines={2}>
                {toast.description}
              </Text>
            )}
          </View>
          {toast.action && (
            <Pressable
              onPress={() => {
                toast.action?.onPress();
                hide();
              }}
              style={styles.actionButton}
            >
              <Text style={[styles.actionText, { color: config.color }]}>
                {toast.action.label}
              </Text>
            </Pressable>
          )}
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <ToastContext.Provider value={{ show, success, error, warning, info, hide }}>
      {children}
      {renderToast()}
    </ToastContext.Provider>
  );
};

const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: Spacing.base,
    right: Spacing.base,
    zIndex: 9999,
  },
  top: {
    top: 60,
  },
  bottom: {
    bottom: 40,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderLeftWidth: 4,
    ...Shadow.lg,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  icon: {
    fontSize: 14,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
  },
  content: {
    flex: 1,
  },
  message: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  description: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  actionButton: {
    marginLeft: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  actionText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
});

export { useToast };
export type { ToastConfig, ToastType, ToastPosition };
export default ToastProvider;
