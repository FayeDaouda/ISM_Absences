import 'package:http/http.dart' as http;

import 'dart:convert';

import 'package:get/get.dart';

class EtudiantController extends GetxController {
  var isLoading = false.obs;

  var etudiant = {}.obs;

  var absences = [].obs;

  var presences = [].obs;

  Future fetchEtudiant(String id) async {
    isLoading.value = true;

    try {
      final response = await http.get(
        Uri.parse('http://localhost:3000/etudiants/$id'),
      );

      if (response.statusCode == 200) {
         etudiant.value = jsonDecode(response.body);
      } else {
        Get.snackbar(
          'Erreur',
          'Impossible de récupérer vos informations personnelles veuillez réessayer plus tard',
        );
      }
    } catch (e) {
      Get.snackbar('Erreur', 'Une erreur est survenue veuillez réessayer plus tard');
    } finally {
      isLoading.value = false;
    }
  }

  Future fetchPresencesEtAbsences(String idEtudiant) async {
    isLoading.value = true;

    try {
      final responseAbsences = await http.get(
        Uri.parse('http://localhost:3000/absences?etudiantId=$idEtudiant'),
      );

      final responsePresences = await http.get(
        Uri.parse('http://localhost:3000/presences?etudiantId=$idEtudiant'),
      );

      if (responseAbsences.statusCode == 200 &&
          responsePresences.statusCode == 200) {
        absences.value = jsonDecode(responseAbsences.body);

        presences.value = jsonDecode(responsePresences.body);
      } else {
        Get.snackbar(
          'Erreur,impossible de voir ses absences et presences','impossible de récupérer les absences et présences',
        );
      }
    } catch (e) {
      Get.snackbar('Erreur', 'Une erreur est survenue');
    } finally {
      isLoading.value = false;
    }
  }
}















