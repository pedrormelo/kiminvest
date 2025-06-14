import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>KIMINVEST</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { paddingTop: 60, paddingBottom: 20, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  form: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  input: {
    height: 50, borderColor: '#444', borderWidth: 1,
    paddingHorizontal: 16, borderRadius: 8, marginBottom: 16,
    backgroundColor: '#1c1c1c', color: '#fff'
  },
  button: {
    backgroundColor: '#fff', paddingVertical: 14,
    borderRadius: 8, alignItems: 'center', marginTop: 8
  },
  buttonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
});