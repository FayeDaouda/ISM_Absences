class Filiere {
  final int id;
  final String nom;

  Filiere({required this.id, required this.nom});

  factory Filiere.fromJson(Map<String, dynamic> json) {
    return Filiere(
      id: json['id'],
      nom: json['nom'],
    );
  }
}
  