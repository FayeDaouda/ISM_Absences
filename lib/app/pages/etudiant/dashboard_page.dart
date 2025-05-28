import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../controllers/auth_controller.dart';

class DashboardEtudiantPage extends StatelessWidget {
  DashboardEtudiantPage({Key? key}) : super(key: key);

  final AuthController authController = Get.find();

  // Absences et Retards
  final RxList<Map<String, dynamic>> absences = RxList([
    {'date': '2025-05-20', 'status': 'Absent', 'justified': false},
    {'date': '2025-05-22', 'status': 'Retard', 'justified': true},
  ]);

  void justifyAbsence(int index) {
    if (!absences[index]['justified']) {
      absences[index]['justified'] = true;
      absences.refresh();
      Get.snackbar('Justification', 'Absence justifiée pour le ${absences[index]['date']}');
    } else {
      Get.snackbar('Information', 'Absence déjà justifiée');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Dashboard Étudiant'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () {
              authController.logout();
            },
          )
        ],
      ),
      body: Obx(() {
        if (absences.isEmpty) {
          return Center(child: Text('Aucune absence ou retard'));
        }
        return ListView.builder(
          itemCount: absences.length,
          itemBuilder: (context, index) {
            final item = absences[index];
            return ListTile(
              title: Text('${item['date']} - ${item['status']}'),
              subtitle: Text(item['justified'] ? 'Justifiée' : 'Non justifiée'),
              trailing: item['justified']
                  ? Icon(Icons.check, color: Colors.green)
                  : ElevatedButton(
                      child: Text('Justifier'),
                      onPressed: () => justifyAbsence(index),
                    ),
            );
          },
        );
      }),
    );
  }
}
