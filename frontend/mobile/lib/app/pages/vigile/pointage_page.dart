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

  // Simulation des étudiants avec statuts de scolarité (true = à jour)
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
    super.dispose();
  }

  void _valider() {
    Get.snackbar('Validation', 'Entrée validée pour l\'étudiant.');
    setState(() {
      scannedData = null;
    });
    controller?.resumeCamera();
  }

  void _refuser() {
    Get.snackbar('Refus', 'Entrée refusée pour l\'étudiant.');
    setState(() {
      scannedData = null;
    });
    controller?.resumeCamera();
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
          // Zone QR Scanner ou affichage des infos
          Expanded(
            flex: 3,
            child: scannedData == null
                ? QRView(
                    key: qrKey,
                    onQRViewCreated: _onQRViewCreated,
                  )
                : Container(
                    color: Colors.grey[200],
                    padding: EdgeInsets.all(16),
                    child: student == null
                        ? Center(child: Text('Étudiant non reconnu.'))
                        : Column(
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
                                    student['scolariteAJour']
                                        ? 'Scolarité à jour'
                                        : 'Scolarité non à jour',
                                    style: TextStyle(
                                      fontSize: 16,
                                      color: student['scolariteAJour'] ? Colors.green : Colors.red,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                  ),
          ),

          // Boutons Valider / Refuser visibles seulement si étudiant reconnu
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

          if (scannedData != null && student == null)
            Padding(
              padding: EdgeInsets.all(16),
              child: ElevatedButton(
                onPressed: () {
                  setState(() {
                    scannedData = null;
                  });
                  controller?.resumeCamera();
                },
                child: Text('Scanner un autre QR'),
              ),
            )
        ],
      ),
    );
  }
}
