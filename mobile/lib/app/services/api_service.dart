import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/user.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:3000'; // ou ton IP locale

  static Future<User?> login(String username, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/login'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'username': username,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return User.fromJson(data);
    } else {
      return null;
    }
  }
}
