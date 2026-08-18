# ParallaxNex — Parallax Global & Nexmize AI Collaboration Portal

Welcome to the **ParallaxNex** official project repository. This portal is a futuristic, immersive web experience showcasing the collaborative partnership between **Parallax Global** (design, development, VR, and IT services) and **Nexmize AI** (machine learning, data analytics, and automation systems).

The application is built as a highly responsive, modern, single-page application using **React**, **Three.js**, **Tailwind CSS**, and **Vite**.

---

## 🚀 Key Features

* **3D Visualizations (Three.js)**:
  * **Hero**: Immersive wireframe spinning 3D Icosahedron with custom interactive lights and starfield particles.
  * **Work**: Interactive rotating wireframe 3D Box.
  * **Vision**: Interactive 3D Orbiting solar-like planetary rings and central pulsating core.
  * **Timeline**: Custom 3D bouncing particle system representing the history of milestones.
  * **Team**: Interactive 3D wireframe Tetrahedron.
* **Interactive UI**:
  * **Cursor**: Custom neon-blue cursor that transforms and expands when hovering over buttons, navigation links, and cards.
  * **Cards Tilt**: 3D tilt perspective animations on team cards reflecting mouse positions.
  * **Navbar**: Dynamic sticky navbar that applies a backdrop-blur effect on scrolling down.
  * **Line Expansion**: Scroll-triggered path drawing of the timeline line using `IntersectionObserver`.

---

## 🛠️ Technology Stack

* **Frontend Framework**: [React (v18)](https://react.dev/)
* **Build Tool**: [Vite (v5)](https://vitejs.dev/)
* **3D Graphics Engine**: [Three.js](https://threejs.org/)
* **Styling**: [Tailwind CSS (v3)](https://tailwindcss.com/)
* **Icons Library**: [Lucide React](https://lucide.dev/)
* **State Management**: [React Query](https://tanstack.com/query/latest) & [React Router (v6)](https://reactrouter.com/)

---

## 📂 Project Structure

```text
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── favicon.png
│   ├── swami.jpg           # Swami Kshatriya Profile
│   └── mansideore.jpg      # Mansi Deore Profile
├── src/
│   ├── components/
│   │   ├── images/         # Local image assets
│   │   │   ├── samimg.jpg      # Sanmati Ukhalkar Profile
│   │   │   ├── Sanketimg.jpg   # Sanket Dhage Profile
│   │   │   ├── vjydeore.jpg    # Vijay Deore Profile
│   │   │   ├── pg_transparent.png
│   │   │   └── nex_transparent.png
│   │   ├── Layout.jsx      # Navigation, Cursor & Footer layout
│   │   ├── Hero.jsx        # 3D Icosahedron & Hero intro
│   │   ├── Work.jsx        # 3D Box & Showcase projects
│   │   ├── Vision.jsx      # 3D Orbit system & tech vision
│   │   ├── Timeline.jsx    # 3D Particles & Journey milestones
│   │   ├── Team.jsx        # 3D Tetrahedron & Founders tilt cards
│   │   └── NotFound.jsx    # Custom 404 page
│   ├── App.jsx             # Main page routing & scroll handling
│   ├── main.jsx            # Entry point bootsrapper
│   └── index.css           # Styling rules & Tailwind injections
├── index.html              # Main HTML entry
├── package.json            # Configuration and script file
├── vite.config.js          # Vite config
├── tailwind.config.js      # Tailwind theme configuration
└── postcss.config.js       # PostCSS config
```

---

## 👥 The Team

Meet the visionary minds driving ParallaxNex forward:

| Swami Kshatriya | Sanmati Ukhalkar | Sanket Dhage | Vijay Deore | Mansi Deore |
| :---: | :---: | :---: | :---: | :---: |
| ![Swami](./public/swami.jpg) | ![Sanmati](./src/components/images/samimg.jpg) | ![Sanket](./src/components/images/Sanketimg.jpg) | ![Vijay](./src/components/images/vjydeore.jpg) | ![Mansi](./public/mansideore.jpg) |
| **Founder** | **Co-Founder** | **Co-Founder** | **Founder** | **Co-Founder** |
| *Parallax Global* | *Parallax Global* | *Parallax Global* | *Nexmize AI* | *Nexmize AI* |

---

## 💻 Local Installation and Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or above) installed on your system.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Sanmati-Ukhalkar/parallax-nex.git
   cd parallax-nex
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the port specified in terminal).

4. Build for production:
   ```bash
   npm run build
   ```
