
# 🧙 Summoner Cards - LoL Card Generator

**Summoner Cards** es una web app generadora de cartas de jugador estilo *League of Legends*, 100% cliente, sin backend. Genera una carta visual única a partir de un nombre de invocador, asignando de forma aleatoria rol, elo, campeones e ítems, y la convierte en una imagen compartible.

## ✨ Demo

🌐 [summoner-cards.vercel.app](https://summoner-cards.vercel.app)  
🔗 Crea tu carta. Compártela. Reta a tus amigos.

---

## 🚀 Características

- 🎴 Generación de cartas visuales estilo LoL en el navegador.
- 🧠 Generación aleatoria de:
  - Rol (jungla, mid, support, etc.)
  - Tier / Elo (Iron a Challenger)
  - Campeón
  - Ítems 
- 🖼️ Render en tiempo real en `<canvas>` con los assets cargados localmente.
- 🌓 Soporte para dark/light mode con persistencia.
- 📤 Botón para compartir tu carta directamente en X (Twitter).

---


## 🛠️ Instalación local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/summoner-cards.git
   cd summoner-cards
   

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Accede a la app en `http://localhost:5173`.

---



## 💡 Notas técnicas

- Proyecto construido con **React 18 + TypeScript**.
- Estilado con **Tailwind CSS** + efectos personalizados.
- No se utiliza backend ni almacenamiento. Todo se ejecuta en el navegador.
- La imagen se genera con `<canvas>` y se exporta como URL `data:image/png`.

---


