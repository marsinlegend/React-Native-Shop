import React, { useEffect, useReducer } from 'react';
import { Text, TextInput, View } from 'react-native';
import { validate } from '../../../helpers/validators';
import s from './styles';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };

    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };

    default:
      return state;
  }
};

const Input = ({
  id,
  label,
  errorText,
  validators,
  onInput,
  initValue,
  initValid,
  inputStyle,
  ...inputProps
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initValue || '',
    isTouched: false,
    isValid: initValid || false,
  });

  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [id, inputState.value, inputState.isValid, onInput]);

  const changeHandler = (text) => {
    dispatch({
      type: 'CHANGE',
      val: text,
      validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const element = (
    <TextInput
      style={{ ...s.input, ...inputStyle }}
      onChangeText={changeHandler}
      onEndEditing={touchHandler}
      value={inputState.value}
      {...inputProps}
    />
  );

  return (
    <View style={s.formControl}>
      <Text style={s.label}>{label}</Text>

      {element}
      {!inputState.isValid && inputState.isTouched && (
        <Text style={s.error}>{errorText}</Text>
      )}
    </View>
  );
};

export default Input;
