import React from 'react'
import NumberFormat from 'react-number-format'

const FormatCurrency = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: parseFloat(values.value),
          },
        });
      }}
      thousandSeparator
      fixedDecimalScale
      decimalScale={2}
      prefix='R$ '
    />
  );
}

export default FormatCurrency
