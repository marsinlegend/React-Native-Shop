import React, { useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../../helpers/validators';
import s from './styles';
import Input from '../../../components/UI/Input/Input';
import { useForm } from '../../../hooks/formHook';
import Card from '../../../components/UI/Card/Card';
import Colors from '../../../constants/Colors';

const AuthScreen = ({ route, navigation }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },

      password: {
        value: '',
        isValid: false,
      },
    },
    false,
  );
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },

        formState.inputs.email.isValid &&
          formState.inputs.password.value,
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },

        false,
      );
    }
    setIsLoginMode((prev) => !prev);
  };

  const authHandler = () => {};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <LinearGradient
        colors={[Colors.defaultPrimary, Colors.accent]}
        style={s.gradient}
      >
        <Card style={s.authContainer}>
          <ScrollView>
            {!isLoginMode && (
              <Input
                id="name"
                label="Full Name"
                errorText="Please enter a valid Full name (at least 5 characters)."
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
                keyboardType="default"
                autoCapitalize="sentences"
                returnKeyType="next"
              />
            )}

            <Input
              id="email"
              label="E-Mail"
              errorText="Please enter a valid email address."
              validators={[VALIDATOR_EMAIL()]}
              onInput={inputHandler}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
            <Input
              id="password"
              label="Password"
              errorText="Please enter a valid password (at least 5 characters)."
              validators={[VALIDATOR_MINLENGTH(5)]}
              onInput={inputHandler}
              keyboardType="default"
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="done"
            />

            {/*{isFetching ? (*/}
            {/*  <CentredView>*/}
            {/*    <ActivityIndicator*/}
            {/*      size="large"*/}
            {/*      color={Colors.defaultPrimary}*/}
            {/*    />*/}
            {/*  </CentredView>*/}
            {/*) : (*/}
            <Button
              title={isLoginMode ? 'Login' : 'Sign Up'}
              color={Colors.darkPrimary}
              disabled={!formState.isValid}
              onPress={authHandler}
            />
            {/*)}*/}

            <Card className={s.switchBox}>
              <Text>
                {isLoginMode
                  ? 'Do not Register?'
                  : 'Already register?'}
              </Text>

              <Button
                title={`Switch to ${
                  isLoginMode ? 'Register' : 'Login'
                }`}
                color={Colors.accent}
                onPress={switchModeHandler}
              />
            </Card>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
