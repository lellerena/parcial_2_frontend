# 🚀 X - Clone (Anteriormente Twitter)

## 📱 Una aplicación de microblogging desarrollada con JavaScript y Firebase

Un proyecto moderno que recrea las principales funcionalidades de X (anteriormente conocido como Twitter), permitiendo a los usuarios compartir pensamientos, interactuar con publicaciones y gestionar su perfil en una interfaz limpia e intuitiva.

---

## ✨ Características principales

-   🔐 **Sistema de autenticación completo** mediante Firebase Authentication
-   👤 **Perfiles de usuario** con historial de publicaciones
-   📝 **Creación y eliminación de posts**
-   💬 **Sistema de respuestas** a publicaciones
-   ❤️ **Interacción mediante likes**
-   🔄 **Timeline personalizado** ordenado cronológicamente
-   📱 **Diseño responsive** para todas las pantallas

---

## 📋 Historias de usuario implementadas

✅ Como usuario, puedo crear una cuenta y autenticarme (recuperar mi contraseña mediante Firebase)

✅ Como usuario, puedo visitar mi página de perfil para leer todas mis publicaciones

✅ Como usuario, puedo ver solamente mis publicaciones en el Timeline ordenadas por fecha más reciente

✅ Como usuario, puedo crear una publicación o eliminar una publicación que he creado

✅ Como usuario, puedo responder y dar "me gusta" a mis publicaciones

---

## 🛠️ Tecnologías utilizadas

-   **HTML5** y **CSS3** para estructura y diseño
-   **JavaScript** puro para toda la funcionalidad
-   **Firebase Authentication** para gestión de usuarios
-   **Cloud Firestore** para almacenamiento de datos
-   **Diseño modular** con separación de responsabilidades

---

## 🏗️ Estructura del proyecto

El proyecto está organizado de forma modular para facilitar su mantenimiento:

```
├── index.html          # Punto de entrada principal
├── styles.css          # Estilos globales
├── config.js           # Configuración de Firebase
├── app.js              # Inicialización de la aplicación
├── auth.js             # Gestión de autenticación
├── posts.js            # Creación y gestión de publicaciones
├── replies.js          # Sistema de respuestas
├── profile.js          # Funcionalidad de perfil de usuario
└── ui.js               # Utilidades de interfaz
```

---

## 🚀 Cómo ejecutar el proyecto

1. Clona este repositorio
2. Abre el archivo `index.html` en tu navegador
3. ¡Listo! Ya puedes crear una cuenta e interactuar con la aplicación

> **Nota**: Para el completo funcionamiento, asegúrate de tener conexión a internet para la comunicación con Firebase.

---

## 🔧 Configuración de Firebase

El proyecto utiliza Firebase como backend. La configuración ya está integrada y lista para usar:

```javascript
const firebaseConfig = {
    apiKey: 'AIzaSyD33QpNMiP35qx9Hup8brWDdOFY25r_4lM',
    authDomain: 'frontend-parcial-2.firebaseapp.com',
    projectId: 'frontend-parcial-2',
    ...
}
```

---

## 👨‍💻 Equipo de desarrollo - Grupo 3

-   **Luis Llerena**
-   **Jhon Jimenez**
-   **Daniel Morillo**

---

## 📝 Notas de implementación

-   La aplicación utiliza un enfoque modular para facilitar el mantenimiento y la escalabilidad
-   Todos los datos se sincronizan en tiempo real con Firebase
-   El diseño sigue las tendencias actuales de la plataforma X (anteriormente Twitter)
-   Sistema completo de gestión de estado para una experiencia fluida

---

## 🔮 Futuras mejoras

-   [ ] Sistema de seguimiento entre usuarios
-   [ ] Funcionalidad de retweet
-   [ ] Notificaciones en tiempo real
-   [ ] Hashtags y tendencias
-   [ ] Modo oscuro

---

Desarrollado para la asignatura **DLLO APLICACIONES WEB FRONTEND** - Universidad del Norte, 2025
