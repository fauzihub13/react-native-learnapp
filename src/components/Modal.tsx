import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal as RNModal,
  Pressable,
  ViewStyle,
  TextStyle,
  Dimensions,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  PanResponder,
} from 'react-native';
import Button from './Button';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DISMISS_THRESHOLD = 120;

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  variant?: 'center' | 'bottom';
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  actions?: {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    color?: string;
    loading?: boolean;
  }[];
  headerRight?: React.ReactNode;
  backgroundColor?: string;
  borderRadius?: number;
  maxHeight?: number;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  description,
  children,
  variant = 'center',
  showCloseButton = true,
  closeOnBackdrop = true,
  actions,
  headerRight,
  backgroundColor = '#FFFFFF',
  borderRadius = 20,
  maxHeight = SCREEN_HEIGHT * 0.7,
  style,
  titleStyle,
  descriptionStyle,
}) => {
  const isBottom = variant === 'bottom';
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dragY = useRef(new Animated.Value(0)).current;
  const isDragging = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5;
      },
      onPanResponderGrant: () => {
        isDragging.current = true;
        dragY.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          dragY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        isDragging.current = false;
        if (gestureState.dy > DISMISS_THRESHOLD || gestureState.vy > 0.5) {
          Animated.timing(dragY, {
            toValue: SCREEN_HEIGHT,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            dragY.setValue(0);
            onClose();
          });
        } else {
          Animated.timing(dragY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      dragY.setValue(0);
      if (isBottom) {
        slideAnim.setValue(SCREEN_HEIGHT);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [visible, isBottom]);

  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  const renderHeader = () => {
    if (!title && !showCloseButton && !headerRight) return null;
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {showCloseButton && (
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </Pressable>
          )}
        </View>
        <View style={styles.headerCenter}>
          {title && (
            <Text style={[styles.title, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>
        <View style={styles.headerRight}>
          {headerRight}
        </View>
      </View>
    );
  };

  const renderContent = () => (
    <ScrollView
      style={[styles.scrollView, { maxHeight }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {description && (
        <Text style={[styles.description, descriptionStyle]}>
          {description}
        </Text>
      )}
      {children}
    </ScrollView>
  );

  const renderActions = () => {
    if (!actions || actions.length === 0) return null;
    return (
      <View style={styles.actions}>
        {actions.map((action, index) => (
          <Button
            key={index}
            title={action.label}
            onPress={action.onPress}
            variant={action.variant || 'primary'}
            backgroundColor={action.color}
            loading={action.loading}
            size="md"
            style={
              index < actions.length - 1 ? styles.actionSpacing : undefined
            }
          />
        ))}
      </View>
    );
  };

  const renderBottomSheet = () => (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={handleBackdropPress} />
        <Animated.View
          style={[
            styles.modalContainer,
            styles.bottomContainer,
            {
              backgroundColor,
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
            },
            style,
            {
              transform: [
                { translateY: slideAnim },
                { translateY: dragY },
              ],
            },
          ]}
        >
          <View {...panResponder.panHandlers}>
            <View style={styles.handle} />
            {renderHeader()}
          </View>
          {renderContent()}
          {renderActions()}
        </Animated.View>
      </View>
    </RNModal>
  );

  const renderCenterModal = () => (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable style={styles.overlay} onPress={handleBackdropPress}>
          <Animated.View
            style={[
              styles.modalContainer,
              styles.centerContainer,
              {
                backgroundColor,
                borderRadius,
              },
              style,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
              {renderHeader()}
              {renderContent()}
              {renderActions()}
            </Pressable>
          </Animated.View>
        </Pressable>
      </KeyboardAvoidingView>
    </RNModal>
  );

  if (!visible) return null;

  return isBottom ? renderBottomSheet() : renderCenterModal();
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    overflow: 'hidden',
  },
  centerContainer: {
    alignSelf: 'center',
    width: '90%',
    maxWidth: 400,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    paddingBottom: 34,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerLeft: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '600',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    padding: 20,
  },
  description: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 16,
  },
  actions: {
    padding: 16,
    paddingTop: 0,
  },
  actionSpacing: {
    marginBottom: 10,
  },
});

export default Modal;
