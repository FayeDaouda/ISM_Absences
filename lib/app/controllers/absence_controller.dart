import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/absence_model.dart';

class AbsenceController extends GetxController {
  var absences = <Absence>[].obs;
  var isLoading = false.obs;

  // Tu peux récupérer l'ID ou l'email de l'étudiant via un autre contrôleur si nécessaire.
  final String apiUrl = 'http://192.168.1.182:3000/absences';

  @override
  void onInit() {
    fetchAbsences();
    super.onInit();
  }

  Future<void> fetchAbsences() async {
    try {
      isLoading.value = true;
      final response = await http.get(Uri.parse(apiUrl));

      if (response.statusCode == 200) {
        final List<dynamic> jsonData = jsonDecode(response.body);
        absences.value = jsonData.map((e) => Absence.fromJson(e)).toList();
      } else {
        Get.snackbar('Erreur', 'Impossible de charger les absences');
      }
    } catch (e) {
      Get.snackbar('Erreur', 'Une erreur est survenue');
    } finally {
      isLoading.value = false;
    }
  }

  void justifyAbsence(int index) {
    if (!absences[index].justifie) {
      absences[index].justifie = true;
      absences.refresh();

    

      Get.snackbar('Justification', 'Absence justifiée pour le ${absences[index].date}');
    } else {
      Get.snackbar('Info', 'Absence déjà justifiée');
    }
  }
}
