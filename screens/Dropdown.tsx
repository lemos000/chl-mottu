  import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
  import FontAwesome from '@expo/vector-icons/FontAwesome'; 
  const motos = [
    { label: 'Mottu Pop', value: 'Mottu Pop' },
    { label: 'Mottu Sport', value: 'Mottu Sport' },
    {label: 'Mottu E', value: 'Mottu E' },
]

  type DropdownComponentProps = {
    value: string | null;
    onChange: (value: string) => void;
  };

  const DropdownComponent: React.FC<DropdownComponentProps> = ({ value, onChange }) => {
    const [isFocus, setIsFocus] = useState(false);
    return (
      <View>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#008c30' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={motos}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Motos Mottu' : '...'}
          searchPlaceholder="Moto.."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            onChange(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <FontAwesome name="motorcycle" style={styles.icon} size={24} color="#008c30" />
          )}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      userSelect: 'none',
    
    },
    icon: {
      margin: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      borderStyle: 'dotted',
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
      borderWidth: 0,
    },
    iconStyle: {
      marginRight: 5,
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      borderWidth: 0,
      outlineWidth: 0,
    },
  });