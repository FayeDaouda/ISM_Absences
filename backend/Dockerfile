# Étape 1 : construire l'application avec Maven
FROM maven:3.8.7-eclipse-temurin-17 AS build
WORKDIR /app

# Copier les fichiers Maven
COPY pom.xml .
COPY src ./src

# Construire le projet (skip tests pour accélérer)
RUN mvn clean package -DskipTests

# Étape 2 : image runtime Java minimal
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copier le jar construit depuis l'étape build
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Exposer le port 8080
EXPOSE 8080

# Commande pour lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
