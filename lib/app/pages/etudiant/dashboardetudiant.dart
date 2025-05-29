import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'dashboardabsences.dart';
import 'dashboardjustification.dart';

class DashboardEtudiant extends StatefulWidget {
  const DashboardEtudiant({Key? key}) : super(key: key);

  @override
  State<DashboardEtudiant> createState() => _DashboardEtudiantState();
}

class _DashboardEtudiantState extends State<DashboardEtudiant> {
  final RxInt absents = 5.obs;
  final RxInt retards = 1.obs;
  final RxInt justifies = 2.obs;

  final Map<String, List<Map<String, String>>> emploiDuTemps = {
    "Lundi": [{'heure': '08h - 12h', 'cours': 'Physique', 'salle': 'Salle 504'}],
    "Mardi": [],
    "Mercredi": [{'heure': '08h - 12h', 'cours': 'Flutter', 'salle': 'Salle 303'}],
    "Jeudi": [],
    "Vendredi": [{'heure': '08h - 12h', 'cours': 'Python', 'salle': 'Salle 204'}],
    "Samedi": [{'heure': '08h - 12h', 'cours': 'Flutter', 'salle': 'Salle 101'}],
  };

  final String studentName = "DAOUDA FALL";
  final String matricule = "ISM20222025";
  final String niveau = "L3 CDSD";
  final String email = "daouda.fall@ism.edu.sn";

  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8F6F4),
      appBar: AppBar(
        backgroundColor: Colors.orange,
        title: const Text('Dashboard Étudiant'),
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Get.back(),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) => setState(() => _selectedIndex = index),
        backgroundColor: Colors.orange[100],
        selectedItemColor: Colors.orange[800],
        unselectedItemColor: Colors.grey[700],
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.calendar_today),
            label: 'Planning',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.fact_check),
            label: 'Justification',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.error_outline),
            label: 'Absences',
          ),
        ],
      ),
      body: IndexedStack(
        index: _selectedIndex,
        children: [
          _buildPlanning(),
          const DashboardJustification(
            date: "2024-05-10",
            matiere: "Programmation mobile",
          ),
          DashboardAbsences(),
        ],
      ),
    );
  }

  Widget _buildPlanning() {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const CircleAvatar(
                radius: 30,
                backgroundColor: Colors.orange,
                child: Icon(Icons.person, color: Colors.white),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(studentName, style: const TextStyle(fontWeight: FontWeight.bold)),
                    Text(matricule),
                    Text(niveau),
                    Text(
                      "Mail: $email",
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: Color.fromARGB(255, 254, 183, 2),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Obx(() {
            return Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _StatBox(label: "Absences", count: absents.value, color: Colors.red, bgColor: Colors.red.shade50),
                _StatBox(label: "Retards", count: retards.value, color: Colors.orange, bgColor: Colors.orange.shade50),
                _StatBox(label: "Justifiées", count: justifies.value, color: Colors.green, bgColor: Colors.green.shade50),
              ],
            );
          }),
          const SizedBox(height: 24),
          const Align(
            alignment: Alignment.centerLeft,
            child: Text("📅 Emploi du temps", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.brown)),
          ),
          const SizedBox(height: 6),
          const Align(
            alignment: Alignment.centerLeft,
            child: Text("Votre planning de cours de la semaine"),
          ),
          const SizedBox(height: 12),
          Expanded(
            child: SingleChildScrollView(
              child: GridView.count(
                physics: const NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                crossAxisCount: 3,
                crossAxisSpacing: 8,
                mainAxisSpacing: 8,
                children: emploiDuTemps.keys.map((jour) {
                  final coursList = emploiDuTemps[jour]!;
                  return Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: Colors.orange[100],
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(jour, style: const TextStyle(fontWeight: FontWeight.bold)),
                        const SizedBox(height: 10),
                        if (coursList.isEmpty)
                          const Text("Aucun cours", textAlign: TextAlign.center),
                        for (var cours in coursList)
                          Padding(
                            padding: const EdgeInsets.only(bottom: 6.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(cours['cours']!, style: const TextStyle(fontWeight: FontWeight.w600)),
                                Text(cours['heure']!),
                                Text(cours['salle']!),
                              ],
                            ),
                          ),
                      ],
                    ),
                  );
                }).toList(),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _StatBox extends StatelessWidget {
  final String label;
  final int count;
  final Color color;
  final Color bgColor;

  const _StatBox({
    required this.label,
    required this.count,
    required this.color,
    required this.bgColor,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 90,
      height: 90,
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            count.toString().padLeft(2, '0'),
            style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold, color: color),
          ),
          const SizedBox(height: 4),
          Text(label, style: TextStyle(color: color)),
        ],
      ),
    );
  }
}
