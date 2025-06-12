import 'package:flutter/material.dart';
import 'package:flutter_application_1/app/pages/etudiant/dashboardjustification.dart';
import 'package:flutter_application_1/app/pages/etudiant/dashboardabsences.dart';

import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:qr_flutter/qr_flutter.dart';

class DashboardEtudiant extends StatefulWidget {
  @override
  _DashboardEtudiantState createState() => _DashboardEtudiantState();
}

class _DashboardEtudiantState extends State<DashboardEtudiant> {
  int _selectedIndex = 0;

  int absences = 0;
  int retards = 0;
  int justifiees = 0;
  List emplois = [];
  String qrData = "Etudiant_12345";
  String etudiantId = '';

  final List<String> joursSemaine = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  @override
  void initState() {
    super.initState();
    fetchDashboardData();
  }

  Future<void> fetchDashboardData() async {
    try {
      final dashboardResponse = await http.get(
        Uri.parse('http://192.168.1.182:3000/api/etudiants'),
      );

      if (dashboardResponse.statusCode == 200) {
        final dashboardData = json.decode(dashboardResponse.body);

        final id = dashboardData['etudiantId'] ?? dashboardData['matricule'] ?? '';

        final emploisResponse = await http.get(
          Uri.parse('http://192.168.1.182:3000/emplois/$id'),
        );

        if (emploisResponse.statusCode == 200) {
          final emploisData = json.decode(emploisResponse.body);

          setState(() {
            absences = dashboardData['absences'] ?? 0;
            retards = dashboardData['retards'] ?? 0;
            justifiees = dashboardData['justifiees'] ?? 0;
            qrData = dashboardData['matricule'] ?? "ISM2222";
            etudiantId = id;

            emplois = List.from(emploisData);
          });
        } else {
          throw Exception('Erreur lors du chargement de l\'emploi du temps');
        }
      } else {
        throw Exception('Erreur lors du chargement des données du dashboard');
      }
    } catch (e) {
      print('Erreur fetchDashboardData: $e');
    }
  }

  Widget _buildPlanningPage() {
    final List<Widget> emploiCards = joursSemaine.map((jour) {
      final emploiDuJour = emplois.firstWhere(
        (e) => e['jour'] == jour,
        orElse: () => {'jour': jour, 'matiere': 'Aucun cours'},
      );
      return _buildEmploiCard(emploiDuJour);
    }).toList();

    return SingleChildScrollView(
      padding: EdgeInsets.all(16),
      child: Column(
        children: [
          Center(
            child: Container(
              padding: EdgeInsets.all(8),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.orangeAccent),
                borderRadius: BorderRadius.circular(12),
                color: Colors.white,
              ),
              child: QrImageView(
                data: qrData,
                version: QrVersions.auto,
                size: 150.0,
              ),
            ),
          ),
          SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildStatCard("Absences", absences.toString(), Colors.red[100], Colors.red),
              _buildStatCard("Retards", retards.toString(), Colors.yellow[100], Colors.orange),
              _buildStatCard("Justifiées", justifiees.toString(), Colors.green[100], Colors.green),
            ],
          ),
          SizedBox(height: 24),
          Align(
            alignment: Alignment.centerLeft,
            child: Row(
              children: [
                Icon(Icons.calendar_month, color: Colors.red),
                SizedBox(width: 8),
                Text("Emploi du temps", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          SizedBox(height: 8),
          Text("Votre planning de cours de la semaine"),
          SizedBox(height: 16),
          Wrap(spacing: 12, runSpacing: 12, children: emploiCards),
        ],
      ),
    );
  }

  Widget _buildJustificationPage() {
    if (etudiantId.isEmpty) {
      return Center(child: CircularProgressIndicator());
    }

    return DashboardJustification(
      etudiantId: etudiantId,
      etudiantData: {},
      dashboardData: {},
      absences: [],
      utilisateurs: [],
    );
  }

  Widget _buildAbsencesPage() {
    return DashboardAbsences();
  }

  Widget _buildPage() {
    switch (_selectedIndex) {
      case 0:
        return _buildPlanningPage();
      case 1:
        return _buildJustificationPage();
      case 2:
        return _buildAbsencesPage();
      default:
        return _buildPlanningPage();
    }
  }

  Widget _buildStatCard(String label, String value, Color? bgColor, Color? textColor) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 16, horizontal: 12),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Text(value, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: textColor)),
          SizedBox(height: 4),
          Text(label, style: TextStyle(color: textColor)),
        ],
      ),
    );
  }

  Widget _buildEmploiCard(Map emploi) {
    return Container(
      width: 120,
      padding: EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: Colors.orange[50],
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.orange),
      ),
      child: Column(
        children: [
          Text(emploi['jour'] ?? '', style: TextStyle(fontWeight: FontWeight.bold)),
          SizedBox(height: 4),
          Text(emploi['matiere'] ?? 'Aucun cours', textAlign: TextAlign.center),
          if (emploi['heure'] != null)
            Text(emploi['heure'], textAlign: TextAlign.center),
          if (emploi['salle'] != null)
            Text(emploi['salle'], textAlign: TextAlign.center),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Dashboard Étudiant"),
        backgroundColor: Colors.orange,
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: _buildPage(),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.orange,
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.calendar_today), label: 'Planning'),
          BottomNavigationBarItem(icon: Icon(Icons.fact_check), label: 'Justification'),
          BottomNavigationBarItem(icon: Icon(Icons.warning), label: 'Absences'),
        ],
      ),
    );
  }
}
