import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class AuthController extends GetxController {
  var isLogged = false.obs;
  var role = ''.obs;
  

  Future<void> login(String username, String password) async {
     final response = await http.get(Uri.parse('http://192.168.1.182:3000/users?username=$username&password=$password'));

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);

      if (data.isNotEmpty) {
        final user = data[0];
        role.value = user['role'];
        isLogged.value = true;

        if (role.value == 'etudiant') {
          Get.offNamed('/dashboard-etudiant');
        } else if (role.value == 'vigile') {
          Get.offNamed('/dashboard-vigile');
        }
      } else {
        Get.snackbar('Erreur', 'Identifiants invalides');
      }
    } else {
      Get.snackbar('Erreur', 'Échec de la connexion au serveur');
    }
  }

  void logout() {
    isLogged.value = false;
    role.value = '';
    Get.offNamed('/login');
  }
}
