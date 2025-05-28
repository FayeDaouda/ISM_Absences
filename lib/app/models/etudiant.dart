import 'package:flutter_application_1/app/models/classe.dart';

class Etudiant {
  final String matricule;
  final String nom;
  final String prenom;
  final String photo;
  final Classe classe;
  



  Etudiant( {
    required this.matricule,
    required this.nom,
    required this.prenom,
    required this.photo,
    required this.classe,

  });

  factory Etudiant.fromJson(Map<String, dynamic> json) {
    return Etudiant(
      matricule: json['matricule'],
      nom: json['nom'],
      prenom: json['prenom'],
      photo: json['photo'] ?? '',
      classe: Classe.fromJson(json['classe']), 
    );
  }
}
