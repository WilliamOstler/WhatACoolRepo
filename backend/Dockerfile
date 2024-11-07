# Build stage
FROM gradle:7.5.1-jdk17 as build

WORKDIR /app
COPY build.gradle .
COPY settings.gradle .
COPY src ./src

RUN gradle clean build -x test

# Production stage
FROM openjdk:17

WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8000
ENTRYPOINT ["java", "-jar", "app.jar"]
