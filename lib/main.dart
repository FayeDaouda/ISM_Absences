// main.dart
import 'package:flutter/material.dart';
import 'package:flutter_application_1/app/pages/etudiant/dashboardjustification.dart';
import 'package:get/get.dart';

import 'app/routes/app_routes.dart';
import 'app/bindings/auth_binding.dart';
import 'app/pages/auth/login.dart';
import 'app/pages/etudiant/dashboardetudiant.dart';
import 'app/pages/etudiant/dashboardabsences.dart'; 
import 'app/pages/etudiant/dashboardjustification.dart';
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
      initialRoute: AppRoutes.dashboardEtudiant,
      
      // Déclaration des routes
      getPages: [
        GetPage(
          name: AppRoutes.dashboardEtudiant,
          page: () => DashboardEtudiant(),
          binding: AuthBinding(),
        ),
        GetPage(
          name: AppRoutes.login,
          page: () => LoginPage(),
          binding: AuthBinding(),
        ),
        GetPage(
          name: AppRoutes.dashboardjustification,
          page: () => DashboardJustification(etudiantData: {}, dashboardData: {}, absences: [], utilisateurs: [], etudiantId: '',),
          binding: AuthBinding(),
        ),


  GetPage(
          name: AppRoutes.dashboardAbsences,
          page: () => DashboardAbsences(),
          binding: AuthBinding(),
        ),

        
        
        
      ],
    );
  }
  
}
