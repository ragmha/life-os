import { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import { router } from 'expo-router'

import { FontSize, FontWeight, Spacing } from '@/theme'
import { useTheme } from '@/theme/hooks'

/**
 * Login screen component with email/password form and basic validation.
 */
export default function LoginScreen() {
  const { colors } = useTheme()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function validateEmail(value: string): string {
    if (!value.trim()) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return 'Enter a valid email address'
    return ''
  }

  function validatePassword(value: string): string {
    if (!value) return 'Password is required'
    if (value.length < 6) return 'Password must be at least 6 characters'
    return ''
  }

  function handleLogin() {
    const emailErr = validateEmail(email)
    const passwordErr = validatePassword(password)

    setEmailError(emailErr)
    setPasswordError(passwordErr)

    if (!emailErr && !passwordErr) {
      router.replace('/(tabs)')
    }
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Sign in to continue
        </Text>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderColor: emailError ? colors.warning : colors.border,
                },
              ]}
              placeholder="you@example.com"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text)
                if (emailError) setEmailError(validateEmail(text))
              }}
              testID="login-email-input"
            />
            {emailError ? (
              <Text
                style={[styles.errorText, { color: colors.warning }]}
                testID="login-email-error"
              >
                {emailError}
              </Text>
            ) : null}
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text }]}>Password</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderColor: passwordError ? colors.warning : colors.border,
                },
              ]}
              placeholder="••••••••"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text)
                if (passwordError) setPasswordError(validatePassword(text))
              }}
              testID="login-password-input"
            />
            {passwordError ? (
              <Text
                style={[styles.errorText, { color: colors.warning }]}
                testID="login-password-error"
              >
                {passwordError}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleLogin}
            testID="login-submit-button"
          >
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: Spacing.borderRadius.md,
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.buttonPadding.horizontal,
    paddingVertical: Spacing.md,
  },
  buttonText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  container: {
    flex: 1,
  },
  errorText: {
    fontSize: FontSize.xs,
    marginTop: Spacing.xxs,
  },
  field: {
    marginBottom: Spacing.md,
  },
  form: {
    marginTop: Spacing.xxl,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.gutter,
  },
  input: {
    borderRadius: Spacing.borderRadius.md,
    borderWidth: 1,
    fontSize: FontSize.md,
    marginTop: Spacing.xs,
    paddingHorizontal: Spacing.inputPadding.horizontal,
    paddingVertical: Spacing.inputPadding.vertical,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  subtitle: {
    fontSize: FontSize.md,
    marginTop: Spacing.xs,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
  },
})
