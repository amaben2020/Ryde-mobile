import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Picker from '@wave909/react-native-ios-scroll-picker';
import HapticFeedback from 'react-native-haptic-feedback';

HapticFeedback.trigger('impactMedium');

const start = 2000;
const years = new Array(new Date().getFullYear() - start + 1)
  .fill(0)
  .map((_, i) => {
    const value = start + i;
    return { value, label: value };
  })
  .reverse();

const Home = () => {
  const defaultValue = 2010;
  const [currentValue, setCurrentValue] = useState(defaultValue);

  const handelPickerItemChange = (value) => {
    setCurrentValue(value);
  };

  return (
    <View style={styles.pickerContainer}>
      <Picker
        values={years}
        defaultValue={defaultValue}
        withTranslateZ={true}
        withOpacity={true}
        withScale={true}
        visibleItems={5}
        itemHeight={32}
        containerStyle={styles.containerStyle}
        dividerStyle={styles.pickerDivider}
        labelStyle={styles.pickerItemLabel}
        onChange={handelPickerItemChange}
      />

      <Text>{currentValue}</Text>
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    width: 120,
  },
  pickerDivider: {
    borderColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  pickerItemLabel: {
    color: '#000000',
    fontSize: 25,
  },
});
