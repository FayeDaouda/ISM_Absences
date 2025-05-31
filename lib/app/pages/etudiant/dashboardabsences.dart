import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../controllers/auth_controller.dart';

class DashboardAbsences extends StatelessWidget {
  DashboardAbsences({Key? key}) : super(key: key);

  final AuthController authController = Get.find();
  final RxList<Map<String, dynamic>> absences = RxList([
    {
      'date': '2025-05-22',
      'status': 'Retard',
      'justified': true,
      'matiere': 'Gestion des Projets Informatiques',
    },
    {
      'date': '17-02-2025',
      'status': 'Retard',
      'justified': true,
      'matiere': 'Programmation Mobile',
    },
    {
      'date': '05-01-2025',
      'status': 'Absent',
      'justified': false,
      'matiere': 'Flask',
    },
  ]);

  void justifyAbsence(int index) {
    if (!absences[index]['justified']) {
      absences[index]['justified'] = true;
      absences.refresh();
      Get.snackbar(
        'Justification',
        'Absence justifiée pour le ${absences[index]['date']}',
      );
    } else {
      Get.snackbar('Information', 'Absence déjà justifiée');
    }
  }

  @override
  Widget build(BuildContext context) {
    final String studentName = "DAOUDA FALL";
    final String matricule = "ISM20222025";
    final String niveau = "L3 GLRS";
    final String email = "daouda.fall@ism.edu.sn";

    return Scaffold(
      backgroundColor: const Color(0xFFF8F6F4),
      appBar: AppBar(
        backgroundColor: Colors.orange[700],
        title: const Text('Absences'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => authController.logout(),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Profil étudiant
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                children: [
                  const CircleAvatar(
                    radius: 30,
                    backgroundColor: Color.fromARGB(255, 230, 87, 34),
                    child: Icon(Icons.person, color: Colors.white),
                  ),
                  const SizedBox(width: 16),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        studentName,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      Text(matricule),
                      Text(niveau),
                      Text("Mail: $email"),
                    ],
                  ),
                ],
              ),
            ),

            // Statistiques
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Obx(() {
                final totalAbsences =
                    absences.where((e) => e['status'] == 'Absent').length;
                final totalRetards =
                    absences.where((e) => e['status'] == 'Retard').length;
                final totalJustified =
                    absences.where((e) => e['justified'] == true).length;

                return Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    StatCard(
                      label: "Absences",
                      count: totalAbsences,
                      color: Colors.red,
                      backgroundColor: const Color(0xFFFFCDD2),
                    ),
                    StatCard(
                      label: "Retards",
                      count: totalRetards,
                      color: Colors.orange,
                      backgroundColor: const Color(0xFFFFE0B2),
                    ),
                    StatCard(
                      label: "Justifiées",
                      count: totalJustified,
                      color: Colors.green,
                      backgroundColor: const Color(0xFFC8E6C9),
                    ),
                  ],
                );
              }),
            ),

            const SizedBox(height: 20),

            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.0),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  "📅 Historique de vos absences",
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Color.fromARGB(251, 251, 68, 2),
                  ),
                ),
              ),
            ),

            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.0),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  "Consultez toutes vos présences, absences et leurs statuts",
                ),
              ),
            ),

            const SizedBox(height: 10),

            Obx(() {
              return ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: absences.length,
                itemBuilder: (context, index) {
                  final item = absences[index];
                  return Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16.0,
                      vertical: 4.0,
                    ),
                    child: Card(
                      elevation: 2,
                      child: Padding(
                        padding: const EdgeInsets.all(12.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              item['matiere'] ?? '',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(item['date']),
                            Row(
                              children: [
                                StatusBadge(
                                  text: item['status'],
                                  color: item['status'] == 'Absent'
                                      ? Colors.red
                                      : Colors.orange,
                                ),
                                const SizedBox(width: 8),
                                if (item['justified'])
                                  const StatusBadge(
                                    text: "Justifiée",
                                    color: Colors.green,
                                  )
                                else
                                  ElevatedButton(
                                    onPressed: () => justifyAbsence(index),
                                    child: const Text("Justifier"),
                                  ),
                              ],
                            ),
                            if (item['justified'])
                              const Padding(
                                padding: EdgeInsets.only(top: 8.0),
                                child: Text(
                                  "Justification: justifiez votre absence ",
                                  style: TextStyle(color: Colors.brown),
                                ),
                              ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              );
            }),
          ],
        ),
      ),
    );
  }
}

class StatCard extends StatelessWidget {
  final String label;
  final int count;
  final Color color;
  final Color backgroundColor;

  const StatCard({
    required this.label,
    required this.count,
    required this.color,
    required this.backgroundColor,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      color: backgroundColor,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        child: Column(
          children: [
            Text(
              count.toString(),
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 18,
                color: color,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(color: color),
            ),
          ],
        ),
      ),
    );
  }
}

class StatusBadge extends StatelessWidget {
  final String text;
  final Color color;

  const StatusBadge({required this.text, required this.color, Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.2),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        text,
        style: TextStyle(color: color, fontWeight: FontWeight.bold),
      ),
    );
  }
}
