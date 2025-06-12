import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class DashboardAbsences extends StatefulWidget {
  @override
  _DashboardAbsences createState() => _DashboardAbsences();
}

class _DashboardAbsences extends State<DashboardAbsences> {
  Map<String, dynamic>? data;

  Future<void> fetchData() async {
    final response = await http.get(
      Uri.parse('http://192.168.1.182:3000/dashboard/absences'),
    );

    if (response.statusCode == 200) {
      setState(() {
        data = json.decode(response.body);
      });
    } else {
      throw Exception('Erreur de chargement des données');
    }
  }

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Widget buildStat(String title, int count, Color color) {
    return Column(
      children: [
        Text(
          "$count",
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: color),
        ),
        Text(title, style: TextStyle(fontSize: 14)),
      ],
    );
  }

  Color getChipColor(String status) {
    switch (status) {
      case 'Absent':
        return Colors.red;
      case 'Retard':
        return Colors.orange;
      case 'Justifiée':
        return Colors.green;
      case 'Justifier':
        return Colors.purple;
      default:
        return Colors.grey;
    }
  }
  @override
  Widget build(BuildContext context) {
    if (data == null) {
      return Scaffold(
        appBar: AppBar(title: Text("ABSENCES")),
        body: Container(
          color: Colors.orange[50],  
          child: Center(
            child: CircularProgressIndicator(),
          ),
          ),
);
    }

    final etudiant = data!['etudiant'];
    final stats = data!['statistiques'];
    final historique = List<Map<String, dynamic>>.from(data!['historique']);

    return Scaffold(
      appBar: AppBar(
        title: Text('Dashboard Étudiant'),
        backgroundColor: Colors.orange,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 2,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.calendar_today), label: 'Planning'),
          BottomNavigationBarItem(icon: Icon(Icons.note_add), label: 'Justification'),
          BottomNavigationBarItem(icon: Icon(Icons.warning), label: 'Absences'),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ListTile(
                leading: CircleAvatar(child: Icon(Icons.person)),
                title: Text(etudiant['nom']),
                subtitle: Text(
                  "${etudiant['matricule']} - ${etudiant['classe']}\nMail: ${etudiant['email']}",
                ),
              ),
              SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  buildStat("Absences", stats['absences'], Colors.red),
                  buildStat("Retards", stats['retards'], Colors.orange),
                  buildStat("Justifiées", stats['justifiees'], Colors.green),
                ],
              ),
              SizedBox(height: 20),
              Row(
                children: [
                  Icon(Icons.calendar_today, color: Colors.red, size: 18),
                  SizedBox(width: 8),
                  Text(
                    "Historique de vos absences",
                    style: TextStyle(fontWeight: FontWeight.bold, color: Colors.red),
                  ),
                ],
              ),
              SizedBox(height: 4),
              Text("Consultez toutes vos présences, absences et leurs statuts\n"),
              ...historique.map((entry) {
                return Card(
                  elevation: 2,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  child: Padding(
                    padding: const EdgeInsets.all(12.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(entry['matiere'],
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                        SizedBox(height: 4),
                        Text(entry['date']),
                        SizedBox(height: 8),
                        Wrap(
                          spacing: 8,
                          children: List<Widget>.from(
                            entry['etat'].map((e) {
                              final color = getChipColor(e);
                              return Chip(
                                label: Text(e),
                                backgroundColor: color.withOpacity(0.2),
                                labelStyle: TextStyle(color: color),
                              );
                            }),
                          ),
                        ),
                        SizedBox(height: 6),
                        Text(
                          "Justification: ${entry['justification']}",
                          style: TextStyle(fontStyle: FontStyle.italic, fontSize: 13),
                        )
                      ],
                    ),
                  ),
                );
              }),
            ],
          ),
        ),
      ),
    );
  }
}
