Developed by Lovkush Shrivastav

## 📄 ARCHITECTURE.md  

```markdown
# Quiz App – Architecture & Design Decisions

## 🔹 Framework & Tools
- **React + Vite** → Chosen for fast bundling and modern development.  
- **TailwindCSS** → Utility-first CSS framework for rapid UI design.  
- **ESLint** → Code linting for cleaner and more consistent code.  

## 🔹 Project Architecture
- **index.html** → Entry point for the app.  
- **src/** → Contains all React components and logic.  
  - `App.jsx` – Main app container  
  - `components/` – UI components like QuestionCard, Scoreboard, etc.  
  - `assets/` – Images or icons  
- **vite.config.js** → Vite configuration  
- **tailwind.config.js** → Tailwind setup  

## 🔹 Design Choices
1. **Component-Based Design**  
   Each quiz element (question, options, score) is a reusable React component.  

2. **State Management**  
   - Local component state using `useState` for score, current question, and user answers.  
   - Chosen for simplicity (no Redux/Context needed for small app).  

3. **Responsiveness**  
   TailwindCSS ensures mobile-first, responsive design with minimal custom CSS.  

4. **Performance**  
   Vite ensures fast development and optimized production builds.  

---

## 🔮 Future Improvements
- Add timer for each question  
- Add categories & difficulty levels  
- Store scores in localStorage or backend  
- User authentication for personalized quizzes  
