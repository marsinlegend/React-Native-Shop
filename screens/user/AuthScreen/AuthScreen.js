import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
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
import { useDispatch, useSelector } from 'react-redux';
import {
  authSelector,
  checkAuth,
  clearState,
  login,
  signup,
} from '../../../store/auth/authSlice';
import CentredView from '../../../components/UI/CentredView/CentredView';

const AuthScreen = ({ navigation }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const dispatch = useDispatch();
  const { isFetching, isError, errMessage } = useSelector(
    authSelector,
  );

  useEffect(() => {
    (async () => {
      await dispatch(checkAuth());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      Alert.alert('Authentication error!', errMessage, [
        {
          text: 'Okay',
        },
      ]);
      clearState();
    }
  }, [isError, errMessage]);

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

  const authHandler = useCallback(async () => {
    if (isLoginMode) {
      await dispatch(
        login({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
      );
    } else {
      await dispatch(
        signup({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
      );
    }
  }, [dispatch, formState]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <LinearGradient
        colors={[Colors.darkPrimary, Colors.accent]}
        style={s.gradient}
      >
        {isFetching ? (
          <CentredView>
            <ActivityIndicator size="large" color="#fff" />
          </CentredView>
        ) : (
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

              <View style={s.buttonBox}>
                <Button
                  title={isLoginMode ? 'Login' : 'Sign Up'}
                  color={Colors.defaultPrimary}
                  disabled={!formState.isValid}
                  onPress={authHandler}
                />
              </View>

              <View style={s.switchBox}>
                <Button
                  title={`Switch to ${
                    isLoginMode ? ' Register' : 'Login'
                  }`}
                  color={Colors.accent}
                  onPress={switchModeHandler}
                />
              </View>
            </ScrollView>
          </Card>
        )}
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
