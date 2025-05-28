import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class JustificationController extends GetxController {
  var absencesNonJustifiees = [].obs;
  var isLoading = false.obs;


  final int etudiantId = 1; /// id de l'etudiant connecté
  }

  /// Récupère les absences non justifiées de l'étudiant
  
  Future<void> fetchAbsencesNonJustifiees(dynamic isLoading, dynamic absencesNonJustifiees) async {
    isLoading.value = true;

    try {
      var etudiantId;
      final response = await http.get(
        Uri.parse('http://localhost:3000/absences?etudiantId=$etudiantId&justifie=false'),
      );

      if (response.statusCode == 200) {
        absencesNonJustifiees.value = jsonDecode(response.body);
      } else {
        Get.snackbar('Erreur', 'Impossible de récupérer les absences non justifiées');
      }
    } catch (e) {
      Get.snackbar('Erreur', 'Une erreur est survenue lors de la récupération des absences');
    } finally {
      isLoading.value = false;
    }
  }

  /// Soumettre une justification d'absence
  Future<void> soumettreJustification(int absenceId, String motif, dynamic absencesNonJustifiees) async {
    try {
      final response = await http.patch(
        Uri.parse('http://localhost:3000/absences/$absenceId'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'justifie': true,
          'motif': motif,
        }),
      );

      if (response.statusCode == 200) {
        Get.snackbar('Succès', 'Justification envoyée avec succès');
        fetchAbsencesNonJustifiees( absenceId, absencesNonJustifiees); 
      } else {
        Get.snackbar('Erreur', 'Échec de la justification');
      }
    } catch (e) {
      Get.snackbar('Erreur', 'Erreur lors de la soumission');
    }
  }
  /// Annuler une justification d'absence

  Future<void> annulerJustification(int absenceId, dynamic absencesNonJustifiees) async {
    try {
      final response = await http.patch(
        Uri.parse('http://localhost:3000/absences/$absenceId'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'justifie': false,
          'motif': '',
        }),
      );

      if (response.statusCode == 200) {
        Get.snackbar('Succès', 'Justification annulée avec succès');
        fetchAbsencesNonJustifiees (absenceId, absencesNonJustifiees);
      } else {
        Get.snackbar('Erreur', 'Échec de l\'annulation de la justification');
      }
    } catch (e) {
      Get.snackbar('Erreur', 'Erreur lors de l\'annulation de la justification');
    }
  }