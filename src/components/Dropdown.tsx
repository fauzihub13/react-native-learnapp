import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../styles';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  value: string | null;
  onSelect: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  variant?: 'outline' | 'filled' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  borderColor?: string;
  focusColor?: string;
  errorColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

const SIZE_STYLES: Record<string, { height: number; fontSize: number; paddingHorizontal: number; labelSize: number }> = {
  sm: { height: 40, fontSize: 14, paddingHorizontal: 12, labelSize: 12 },
  md: { height: 48, fontSize: 16, paddingHorizontal: 16, labelSize: 14 },
  lg: { height: 56, fontSize: 18, paddingHorizontal: 20, labelSize: 16 },
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onSelect,
  options,
  placeholder = 'Pilih opsi',
  error,
  helperText,
  disabled = false,
  required = false,
  variant = 'outline',
  size = 'md',
  borderColor = '#D1D5DB',
  focusColor = '#007AFF',
  errorColor = '#FF3B30',
  backgroundColor,
  borderRadius = 12,
  containerStyle,
  labelStyle,
  errorStyle,
}) => {
  const [visible, setVisible] = useState(false);

  const sizeStyle = SIZE_STYLES[size];
  const selectedOption = options.find((opt) => opt.value === value);

  const resolvedBg =
    variant === 'filled'
      ? backgroundColor || '#F2F2F7'
      : backgroundColor || 'transparent';

  const resolvedBorderColor = error ? errorColor : borderColor;

  const getContainerStyle = (): ViewStyle => ({
    borderWidth: variant === 'underline' ? 0 : 1.5,
    borderBottomWidth: 1.5,
    borderColor: resolvedBorderColor,
    borderRadius: variant === 'underline' ? 0 : borderRadius,
    backgroundColor: resolvedBg,
    height: sizeStyle.height,
    paddingHorizontal: sizeStyle.paddingHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: disabled ? 0.5 : 1,
  });

  const handleSelect = (val: string) => {
    onSelect(val);
    setVisible(false);
  };

  const renderOption = ({ item }: { item: DropdownOption }) => {
    const isSelected = item.value === value;
    return (
      <Pressable
        style={({ pressed }) => [
          styles.option,
          { opacity: pressed ? 0.7 : 1 },
          isSelected && styles.optionSelected,
        ]}
        onPress={() => handleSelect(item.value)}
      >
        <Text
          style={[
            styles.optionText,
            isSelected && styles.optionTextSelected,
          ]}
        >
          {item.label}
        </Text>
        {isSelected && <Text style={styles.checkmark}>✓</Text>}
      </Pressable>
    );
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Text style={[styles.label, { fontSize: sizeStyle.labelSize }, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <Pressable
        style={getContainerStyle()}
        onPress={() => !disabled && setVisible(true)}
      >
        <Text
          style={[
            styles.valueText,
            {
              fontSize: sizeStyle.fontSize,
              color: selectedOption ? '#000' : '#9CA3AF',
            },
          ]}
          numberOfLines={1}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Text style={styles.arrow}>▾</Text>
      </Pressable>

      {(error || helperText) && (
        <Text
          style={[
            styles.helper,
            { fontSize: sizeStyle.labelSize - 1 },
            error ? { color: errorColor } : { color: '#6B7280' },
            errorStyle,
          ]}
        >
          {error || helperText}
        </Text>
      )}

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {label || 'Pilih Opsi'}
              </Text>
              <Pressable onPress={() => setVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </Pressable>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={renderOption}
              contentContainerStyle={styles.optionList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 0,
  },
  label: {
    color: Colors.gray700,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: 6,
  },
  required: {
    color: Colors.danger,
  },
  valueText: {
    flex: 1,
  },
  arrow: {
    fontSize: 16,
    color: Colors.gray500,
    marginLeft: Spacing.sm,
  },
  helper: {
    marginTop: Spacing.xs,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius['2xl'],
    maxHeight: '60%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  modalTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  closeButton: {
    fontSize: 20,
    color: Colors.gray500,
    padding: Spacing.xs,
  },
  optionList: {
    paddingVertical: Spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
  },
  optionSelected: {
    backgroundColor: '#F0F4FF',
  },
  optionText: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray700,
    flex: 1,
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  checkmark: {
    fontSize: 18,
    color: '#007AFF',
    marginLeft: 12,
  },
});

export default Dropdown;
