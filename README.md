# Ruta de estudio · Módulo 4

Aplicación NativeScript y Angular para el módulo 4 de Coursera. Continúa [Módulo 3](https://github.com/juandavidguzman2018-spec/modulo3) y agrega **Funciones nativas** al menú lateral. Android es la plataforma de evaluación para cámara, compartir, notificaciones y mapas.

## Requisitos de evaluación

| # | Evidencia |
|---|---|
| 1 | [Registro de Firebase](src/app/core/push.service.ts) con `initializeApp()`, `getToken()` y `onToken()`. El token se muestra en [Funciones nativas](src/app/native-tools/native-tools.component.html). |
| 2 | [PushService](src/app/core/push.service.ts) escucha `onMessage` y muestra un toast con el título y el cuerpo en primer plano. |
| 3 | [Compartir texto](src/app/native-tools/native-tools.component.ts) usa `@nativescript/social-share`. |
| 4 | [Compartir foto](src/app/native-tools/native-tools.component.ts) usa `shareImage()` con una imagen nativa. |
| 5 | [Tomar foto](src/app/native-tools/native-tools.component.ts) usa `@nativescript/camera`, solicita permiso y captura una imagen. |
| 6 | La [vista previa](src/app/native-tools/native-tools.component.html) muestra la foto capturada y activa el botón para compartir esa misma imagen. |
| 7 | [Google Maps](src/app/native-tools/native-tools.module.ts) registra el plugin. El [manifiesto](App_Resources/Android/src/main/AndroidManifest.xml) obtiene la clave a través de Gradle. |
| 8 | El [componente del mapa](src/app/native-tools/study-map.component.ts) agrega un marcador en la Biblioteca Virgilio Barco de Bogotá. |
| 9 | [Jasmine](tests/reading.store.spec.ts) comprueba el reducer real de NgRx, el selector, la deduplicación y la eliminación. |
| 10 | [Karma](karma.conf.cjs) ejecuta Jasmine en Chrome Headless y genera `reports/junit.xml` con `karma-junit-reporter`. |

## Ejecutar las pruebas

[Reporte JUnit de la ejecución verificada](evidence/junit.xml). Cuatro pruebas pasaron. Se omitió el nombre del equipo en esta copia.

Con Node.js 22.13 o posterior y Chrome o Chromium instalado, ejecuta desde la raíz.

```sh
npm ci
npm run check
npm test
```

Si Chrome está en una ubicación diferente, configura `CHROME_BIN` con la ruta al ejecutable. `npm test` empaqueta la suite, ejecuta Karma y escribe el reporte en `reports/junit.xml`.

## Configurar Firebase en Android

1. Crea un proyecto en la [consola de Firebase](https://console.firebase.google.com/) y agrega una app Android con el identificador `org.coursera.rutadeestudio.modulo4`.
2. Descarga el archivo Android `google-services.json` de esa app y colócalo en `App_Resources/Android/src/google-services.json`. Gradle requiere ese archivo para preparar el APK.
3. Ejecuta `npm run android` en un dispositivo o emulador con servicios de Google Play. Abre **Menú → Funciones nativas → Obtener token FCM**.
4. En Firebase Messaging, crea una notificación, elige **Enviar mensaje de prueba** y pega el token mostrado por la app. Deja la app abierta en primer plano para ver el toast. Usa exclusivamente tu token de prueba.

Consulta la [configuración nativa de Firebase](https://docs.nativescript.org/plugins/firebase-core) y el [envío de una notificación de prueba](https://firebase.google.com/docs/cloud-messaging/android/first-message).

## Configurar el mapa en Android

1. En tu proyecto de Google Cloud, habilita **Maps SDK for Android** y crea una [clave de API para Android](https://developers.google.com/maps/documentation/android-sdk/get-api-key). Restringe la clave al identificador de la app y al SHA-1 de la firma que utilices.
2. En tu terminal de PowerShell, define la propiedad de Gradle para esa sesión con `$env:ORG_GRADLE_PROJECT_ROUTE_MAPS_API_KEY = 'tu-clave-local'`.
3. Desde esa terminal, recompila con `npm run android`. Abre **Funciones nativas → Ver mapa** y toca el marcador.

El archivo local de Firebase, la clave de Maps y el token de dispositivo se mantienen fuera del repositorio. Para la cámara, usa preferiblemente un dispositivo físico. La API Express del módulo anterior se puede iniciar con `npm run api` para probar el catálogo.
