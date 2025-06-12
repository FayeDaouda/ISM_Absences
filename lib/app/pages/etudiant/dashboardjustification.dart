import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:http/http.dart' as http;
import 'package:path/path.dart';

class DashboardJustification extends StatefulWidget {
  final String etudiantId;

  DashboardJustification({
    required this.etudiantId, required Map etudiantData, required Map dashboardData, required List utilisateurs, required List absences,
  });

  @override
  State<DashboardJustification> createState() => _DashboardJustificationState();
}

class _DashboardJustificationState extends State<DashboardJustification> {
  final TextEditingController motifController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();

  Map<String, dynamic> etudiantData = {};
  int absences = 0;
  int retards = 0;
  int justifiees = 0;
  bool isLoading = true;

  File? preuveFile;
  String? preuveFileName;

  @override
  void initState() {
    super.initState();
    fetchDonnees();
  }

  Future<void> fetchDonnees() async {
    setState(() {
      isLoading = true;
    });

    final uri = Uri.parse('http://192.168.1.182:3000/etudiants/${widget.etudiantId}/dashboard');

    try {
      final response = await http.get(uri);
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          etudiantData = data['etudiant'];
          absences = data['absences'];
          retards = data['retards'];
          justifiees = data['justifiees'];
        });
      } else {
        print('Erreur de chargement: ${response.statusCode}');
      }
    } catch (e) {
      print('Erreur: $e');
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final String prenom = etudiantData['prenom'] ?? '';
    final String nom = etudiantData['nom'] ?? '';
    final String matricule = etudiantData['matricule'] ?? '';
    final String classe = etudiantData['classe'] ?? '';
    final String email = etudiantData['utilisateur']?['login'] ?? 'N/A';

    final int nonJustifiees = absences - justifiees;

    return Scaffold(
      appBar: AppBar(
        title: Text("JUSTIFICATION"),
        backgroundColor: const Color.fromARGB(255, 253, 206, 139),
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: fetchDonnees,
              child: SingleChildScrollView(
                physics: AlwaysScrollableScrollPhysics(),
                padding: EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildInfoEtudiant(prenom, nom, matricule, classe, email),
                    SizedBox(height: 16),
                    _buildStats(nonJustifiees, retards, justifiees),
                    SizedBox(height: 20),
                    Text("📝 Justifier une absence",
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                    SizedBox(height: 10),
                    _buildFormulaire(),
                    SizedBox(height: 20),
                    _buildBoutons(prenom, nom, matricule, classe, email),
                  ],
                ),
              ),
            ),
    );
  }

  Widget _buildInfoEtudiant(String prenom, String nom, String matricule, String classe, String email) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.orange.shade100,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("$prenom $nom", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          SizedBox(height: 4),
          Text("Matricule: $matricule"),
          Text("Classe: $classe"),
          Text("Email: $email"),
        ],
      ),
    );
  }

  Widget _buildStats(int abs, int retards, int justifiees) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        _buildStatCard("Absences", abs.toString(), Colors.red),
        _buildStatCard("Retards", retards.toString(), Colors.blue),
        _buildStatCard("Justifiées", justifiees.toString(), Colors.green),
      ],
    );
  }

  Widget _buildStatCard(String title, String value, Color color) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 24, horizontal: 28),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        border: Border.all(color: color, width: 2),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            value,
            style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: color),
          ),
          SizedBox(height: 8),
          Text(
            title,
            style: TextStyle(fontSize: 18, color: color, fontWeight: FontWeight.w600),
          ),
        ],
      ),
    );
  }

  Widget _buildFormulaire() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        TextField(
          controller: motifController,
          decoration: InputDecoration(labelText: "Motif", border: OutlineInputBorder()),
        ),
        SizedBox(height: 10),
        TextField(
          controller: descriptionController,
          maxLines: 4,
          decoration: InputDecoration(labelText: "Description", border: OutlineInputBorder()),
        ),
        SizedBox(height: 10),
        ElevatedButton.icon(
          onPressed: () async {
            final result = await FilePicker.platform.pickFiles(
              type: FileType.custom,
              allowedExtensions: ['jpg', 'jpeg', 'png'],
            );
            if (result != null && result.files.single.path != null) {
              setState(() {
                preuveFile = File(result.files.single.path!);
                preuveFileName = basename(preuveFile!.path);
              });
            }
          },
          icon: Icon(Icons.attach_file),
          label: Text('Joindre un fichier'),
        ),
        if (preuveFileName != null) Text('Fichier sélectionné : $preuveFileName'),
      ],
    );
  }

  Widget _buildBoutons(String prenom, String nom, String matricule, String classe, String email) {
    return Row(
      children: [
        Expanded(
          child: ElevatedButton(
            onPressed: () async {
              final motif = motifController.text.trim();
              final description = descriptionController.text.trim();

              if (motif.isEmpty || description.isEmpty) {
                ScaffoldMessenger.of(context as BuildContext).showSnackBar(
                  SnackBar(content: Text("Veuillez remplir tous les champs")),
                );
                return;
              }

              final uri = Uri.parse("http://192.168.1.182:3000/justifications");
              var request = http.MultipartRequest('POST', uri);

              request.fields.addAll({
                "matricule": matricule,
                "nom": nom,
                "prenom": prenom,
                "classe": classe,
                "email": email,
                "motif": motif,
                "description": description,
              });

              if (preuveFile != null) {
                request.files.add(
                  await http.MultipartFile.fromPath('preuve', preuveFile!.path),
                );
              }

              final response = await request.send();

              if (response.statusCode == 200 || response.statusCode == 201) {
                ScaffoldMessenger.of(context as BuildContext).showSnackBar(
                  SnackBar(content: Text("Justification envoyée")),
                );
                motifController.clear();
                descriptionController.clear();
                setState(() {
                  preuveFile = null;
                  preuveFileName = null;
                });
                await fetchDonnees();
              } else {
                ScaffoldMessenger.of(context as BuildContext).showSnackBar(
                  SnackBar(content: Text("Erreur d’envoi")),
                );
              }
            },
            style: ElevatedButton.styleFrom(backgroundColor: Colors.orange),
            child: Text("Soumettre"),
          ),
        ),
        SizedBox(width: 10),
        Expanded(
          child: OutlinedButton(
            onPressed: () {
              motifController.clear();
              descriptionController.clear();
              setState(() {
                preuveFile = null;
                preuveFileName = null;
              });
            },
            child: Text("Annuler"),
          ),
        ),
      ],
    );
  }
}
