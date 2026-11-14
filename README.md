# 🎓 SeniorSphere — TIET Campus Peer Mentorship Network

## 🏛️ About the Project
SeniorSphere is an Object-Oriented peer mentorship and academic doubt-resolution website engineered for the student community of Thapar Institute of Engineering & Technology (TIET). Developed by our team of 3 students as our Semester 3 OOPs Project, the platform connects juniors with verified seniors to resolve academic bottlenecks, prepare for ESTs, and schedule 1-on-1 mentorship sessions.

## 🌟 Key Features
*   **Campus Authentication:** Strict `@thapar.edu` login with a 10-digit roll number parser that auto-assigns Junior/Senior roles and academic batches.
*   **Course-Tagged Doubt Forum:** Q&A board featuring anonymous posting, code/formula formatting, and verified senior answers.
*   **1:1 Mentorship Scheduling:** Conflict-free atomic booking for virtual (Google Meet) or in-person campus meetups. Seniors can also instantly offer sessions directly from the doubt forum.
*   **Smart Mentor Directory:** Filter seniors by branch, CGPA, and technical domain. The website automatically restricts views to higher academic years.
*   **Real-Time Comms:** Custom notification tray and direct peer messaging for seamless campus coordination.
*   **TIET Branding:** Responsive website UI styled in Thapar's official crimson, gold, and slate.

## 🛠️ Tech Stack We Used
<img src="https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black" alt="React" height="30" /> <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" height="30" />

*   **Frontend:** React 18
*   **Build Tool:** Vite 5
*   **Styling:** Tailwind CSS 3
*   **Icons & Typography:** Lucide React, Plus Jakarta Sans

## 🚀 Getting Started

**1. Prerequisites**  
Ensure you have Node.js (v18+) and Git installed.

**2. Installation**  
Clone the repository and install the required dependencies:
```bash
git clone https://github.com/sri-shh/SeniorSphereProject.git
cd SeniorSphereProject
npm install
```

**3. Run the Development Server**  
Start the local server with Hot Module Replacement:
```bash
npm run dev
```
Open your web browser and navigate to `http://localhost:5173`.

**4. Testing the Roles (Demo Credentials)**  
Log in with any `@thapar.edu` email to test both student perspectives:
*   **Junior Mode:** Enter a recent batch roll number to post doubts, filter mentors, and book 1:1 sessions.
*   **Senior Mode:** Enter an earlier batch roll number to access the mentor dashboard, publish slots, and answer questions.

**5. Production Build**  
To generate and preview an optimized production build:
```bash
npm run build
npm run preview
```

## 🧩 Object-Oriented Design & Principles
*   **Encapsulation:** State and business logic are isolated within strict domain objects (e.g., Student, MentorshipSlot, DoubtPost).
*   **Modularity:** Reusable, single-responsibility UI components (cards, filters, modals) for high cohesion.
*   **Polymorphic Rendering:** Interfaces dynamically adapt based on user role (Junior/Senior), session format, and booking status.
*   **Data Modeling:** Standardized schemas cleanly map relationships between users, questions, and mentorship slots across the platform.

## 📁 Project Structure

```text
seniorsphere-tiet/
├── index.html              # Main HTML entry point
├── package.json            # Dependencies and npm scripts
├── package-lock.json       # Deterministic dependency lockfile
├── vite.config.js          # Vite build configuration
├── tailwind.config.js      # Tailwind color extensions & font settings
├── postcss.config.js       # PostCSS plugins (Tailwind & Autoprefixer)
├── .gitignore              # Ignored files (node_modules, builds, zips, logs)
├── README.md               # Repository documentation and OOPs project overview
├── App.jsx                 # Root-level application code
└── src/
    ├── main.jsx            # React root DOM mounting point
    ├── App.jsx             # Primary application component
    └── index.css           # Global Tailwind directives & custom scrollbars
```
