import 'etudiant.dart';
import 'filière.dart';
import 'niveau.dart';

class Classe {
  final int id;
  final Filiere filiere;
  final Niveau niveau;
  final List<Etudiant> etudiants; 

  Classe({
    required this.id,
    required this.filiere,
    required this.niveau,
    required this.etudiants,
  });

  factory Classe.fromJson(Map<String, dynamic> json) {
    return Classe(
      id: json['id'],
      filiere: Filiere.fromJson(json['filiere']),
      niveau: Niveau.fromJson(json['niveau']),
      etudiants: (json['etudiants'] as List)
          .map((e) => Etudiant.fromJson(e))
          .toList(),
    );
  }
}
