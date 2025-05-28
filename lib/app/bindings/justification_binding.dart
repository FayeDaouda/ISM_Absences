import 'package:get/get.dart';
import '../controllers/justification_controller.dart';

class JustificationBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<JustificationController>(() => JustificationController());
  }
}
