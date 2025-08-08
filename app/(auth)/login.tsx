import Input from "@/components/Input";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Formik, FormikValues } from "formik";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, HelperText } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Yup from "yup";

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email Address is required"),
});

export default function LoginScreen() {
  const insets = useSafeAreaInsets();

  const onSubmit = async (values: FormikValues) => {
    try {
      router.navigate({ pathname: "/(auth)/sign-in", params: values });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Formik
            initialValues={{ email: "" }}
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
                  <ThemedText type="defaultSemiBold" style={[styles.text, {marginTop: 20}]}>
                    Welcome Back!
                  </ThemedText>
                  <ThemedText
                    type="subtitle"
                    style={[styles.text, { color: Colors.neutral.secondary }]}
                  >
                    Your work faster and structured with Todyapp
                  </ThemedText>

                  <View style={{ marginTop: 40 }}>
                    <ThemedText style={styles.label}>Email Address</ThemedText>
                    <Input
                      placeholder="name@example.com"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    <HelperText
                      type="error"
                      visible={touched.email && errors.email ? true : false}
                    >
                      {errors.email}
                    </HelperText>
                  </View>
                </View>
                <Button
                  mode="contained"
                  onPress={(e) => handleSubmit()}
                  style={styles.button}
                  disabled={errors.email != null}
                >
                  Next
                </Button>
              </View>
            )}
          </Formik>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
