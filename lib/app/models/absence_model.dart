class Absence {
  final String date;
  final String status;
  bool justifie;
  final String matiere;

  Absence({
    required this.date,
    required this.status,
    required this.justifie,
    required this.matiere,
  });

  factory Absence.fromJson(Map<String, dynamic> json) {
    return Absence(
      date: json['date'],
      status: json['status'],
      justifie: json['justifie'],
      matiere: json['matiere'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'date': date,
      'status': status,
      'justifie': justifie,
      'matiere': matiere,
    };
  }
}
