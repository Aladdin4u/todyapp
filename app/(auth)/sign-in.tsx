import Input from "@/components/Input";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useSession } from "@/utils/ctx";
import { useLocalSearchParams } from "expo-router";
import { Formik, FormikValues } from "formik";
import { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Yup from "yup";

const SigninSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email Address is required"),
});

export default function SignInScreen() {
  const { signIn } = useSession();
  const insets = useSafeAreaInsets();
  const { email } = useLocalSearchParams<{
    email: string;
  }>();

  const [open, setOpen] = useState(false);

  const onSubmit = async (values: FormikValues) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log("data", data);
      if (data?.accessToken) {
        signIn(JSON.stringify(data));
      } else {
        Alert.alert('Error',data.message);
      }
    } catch (e) {
      console.error("err", e);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <Formik
        initialValues={{ email: email, username: "", password: "" }}
        validationSchema={SigninSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <View>
              <ThemedText type="defaultSemiBold" style={styles.text}>
                Create account
              </ThemedText>
              <ThemedText
                type="subtitle"
                style={[styles.text, { color: Colors.neutral.secondary }]}
              >
                Create your account and feel the benefits
              </ThemedText>

              <View style={{ marginTop: 40 }}>
                <ThemedText style={styles.label}>Username</ThemedText>
                <Input
                  placeholder="Enter your username"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                <HelperText
                  type="error"
                  visible={touched.username && errors.username ? true : false}
                >
                  {errors.username}
                </HelperText>
              </View>

              <View style={{ marginTop: 12 }}>
                <ThemedText style={styles.label}>Password</ThemedText>
                <Input
                  placeholder="Enter your password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={!open}
                  right={
                    <TextInput.Icon
                      icon={open ? "eye" : "eye-off"}
                      onPress={() => setOpen(!open)}
                    />
                  }
                />
                <HelperText
                  type="error"
                  visible={touched.password && errors.password ? true : false}
                >
                  {errors.password}
                </HelperText>
              </View>
            </View>
            <Button
              mode="contained"
              onPress={(e) => handleSubmit()}
              style={styles.button}
              disabled={
                errors.email != null ||
                errors.username != null ||
                errors.password != null
              }
            >
              Sign Up
            </Button>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  form: {
    flex: 1,
    justifyContent: "space-between",
    padding: 12,
  },
  text: {
    textAlign: "center",
  },
  label: {
    marginBottom: 12,
  },
  button: {
    borderRadius: 16,
    fontSize: 18,
    padding: 6,
  },
});
