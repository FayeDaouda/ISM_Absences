class Niveau {
  final int id;
  final String nom;

  Niveau({required this.id, required this.nom});

  factory Niveau.fromJson(Map<String, dynamic> json) {
    return Niveau(
      id: json['id'],
      nom: json['nom'],
    );
  }
}
