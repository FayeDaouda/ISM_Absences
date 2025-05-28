import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import '../../controllers/auth_controller.dart';

class DashboardVigilePage extends StatefulWidget {
  DashboardVigilePage({Key? key}) : super(key: key);

  @override
  _DashboardVigilePageState createState() => _DashboardVigilePageState();
}

class _DashboardVigilePageState extends State<DashboardVigilePage> {
  final AuthController authController = Get.find();
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  QRViewController? controller;

  String? scannedData;
  String selectedMode = 'scanner';
  final TextEditingController idController = TextEditingController();

  final Map<String, Map<String, dynamic>> studentsData = {
    '123456': {
      'name': 'Mamadou Ndiaye',
      'filiere': 'Informatique',
      'scolariteAJour': true,
    },
    '789101': {
      'name': 'Awa Diop',
      'filiere': 'Gestion',
      'scolariteAJour': false,
    },
  };

  @override
  void initState() {
    super.initState();
    // Forcer le mode manuel sur le web
    if (kIsWeb) {
      selectedMode = 'manual';
    }
  }

  void _onQRViewCreated(QRViewController controller) {
    this.controller = controller;
    controller.scannedDataStream.listen((scanData) {
      controller.pauseCamera();
      setState(() {
        scannedData = scanData.code;
      });
    });
  }

  @override
  void dispose() {
    controller?.dispose();
    idController.dispose();
    super.dispose();
  }

  void _valider() {
    Get.snackbar('Validation', 'Entrée validée pour l\'étudiant.');
    setState(() {
      scannedData = null;
      idController.clear();
    });
    controller?.resumeCamera();
  }

  void _refuser() {
    Get.snackbar('Refus', 'Entrée refusée pour l\'étudiant.');
    setState(() {
      scannedData = null;
      idController.clear();
    });
    controller?.resumeCamera();
  }

  void _validerIdManuel() {
    final input = idController.text.trim();
    if (studentsData.containsKey(input)) {
      setState(() {
        scannedData = input;
      });
    } else {
      Get.snackbar("Erreur", "ID étudiant non reconnu.");
    }
  }

  @override
  Widget build(BuildContext context) {
    final student = scannedData != null ? studentsData[scannedData] : null;

    return Scaffold(
      appBar: AppBar(
        title: Text('Dashboard Vigile'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () {
              authController.logout();
            },
          ),
        ],
      ),
      body: Column(
        children: [
          SizedBox(height: 10),
          // Boutons de sélection de mode
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: kIsWeb
                    ? null
                    : () {
                        setState(() {
                          selectedMode = 'scanner';
                          scannedData = null;
                          idController.clear();
                          controller?.resumeCamera();
                        });
                      },
                child: Text("Scanner le QR code"),
              ),
              SizedBox(width: 10),
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    selectedMode = 'manual';
                    scannedData = null;
                    controller?.pauseCamera();
                  });
                },
                child: Text("Saisir ID"),
              ),
            ],
          ),
          SizedBox(height: 10),

          Expanded(
            flex: 3,
            child: selectedMode == 'scanner'
                ? kIsWeb
                    ? Center(child: Text('Le scan QR n’est pas disponible sur le Web.'))
                    : scannedData == null
                        ? QRView(
                            key: qrKey,
                            onQRViewCreated: _onQRViewCreated,
                          )
                        : _studentInfoWidget(student)
                : Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        TextField(
                          controller: idController,
                          decoration: InputDecoration(
                            labelText: 'Entrer l\'ID étudiant',
                            border: OutlineInputBorder(),
                          ),
                          keyboardType: TextInputType.number,
                        ),
                        SizedBox(height: 10),
                        ElevatedButton(
                          onPressed: _validerIdManuel,
                          child: Text("Valider l'ID"),
                        ),
                        if (scannedData != null) _studentInfoWidget(student),
                      ],
                    ),
                  ),
          ),

          if (student != null)
            Padding(
              padding: EdgeInsets.all(16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  ElevatedButton.icon(
                    onPressed: _valider,
                    icon: Icon(Icons.check),
                    label: Text('Valider'),
                    style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                  ),
                  ElevatedButton.icon(
                    onPressed: _refuser,
                    icon: Icon(Icons.close),
                    label: Text('Refuser'),
                    style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }

  Widget _studentInfoWidget(Map<String, dynamic>? student) {
    if (student == null) {
      return Center(child: Text('Étudiant non reconnu.'));
    }

    return Container(
      color: Colors.grey[200],
      padding: EdgeInsets.all(16),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'Nom: ${student['name']}',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 8),
          Text('Filière: ${student['filiere']}'),
          SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.circle,
                color: student['scolariteAJour'] ? Colors.green : Colors.red,
                size: 20,
              ),
              SizedBox(width: 8),
              Text(
                student['scolariteAJour'] ? 'Scolarité à jour' : 'Scolarité non à jour',
                style: TextStyle(
                  fontSize: 16,
                  color: student['scolariteAJour'] ? Colors.green : Colors.red,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
