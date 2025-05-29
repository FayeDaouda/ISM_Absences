//main.dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'app/routes/app_routes.dart';
import 'app/bindings/auth_binding.dart';
import 'app/pages/auth/login_page.dart';
import 'app/pages/etudiant/dashboard_page.dart';
import 'app/pages/vigile/pointage_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'ISM Pointage',
      debugShowCheckedModeBanner: false,
      
      // Page de démarrage
      initialRoute: AppRoutes.login,
      
      // Déclaration des routes
      getPages: [
        GetPage(
          name: AppRoutes.login,
          page: () => const LoginPage(),
          binding: AuthBinding(),
        ),
        GetPage(
          name: AppRoutes.dashboardEtudiant,
          page: () => DashboardEtudiantPage(),

          // Ajoute bindings si besoin
        ),
        GetPage(
          name: AppRoutes.dashboardVigile,
          page: () => DashboardVigilePage(),

          // Ajoute bindings si besoin
        ),
      ],
    );
  }
}
