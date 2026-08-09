# ✔️ Task: Do It

A sleek, lightweight, and highly interactive **Vanilla JavaScript Task Management Application** designed with a modern, glassmorphic aesthetic. This project showcases key concepts of Document Object Model (DOM) manipulation, event handling, dynamic CSS styling, and client-side data persistence.

---

## 🚀 Live Preview & UI Aesthetics

The application features a modern, clean, and interactive user interface:
*   **Glassmorphic Design:** The main card features a translucent background with dynamic background blurring (`backdrop-filter: blur(8px)`) against a soft, fluid slate-gray linear gradient.
*   **Micro-Interactions:** Custom hover effects on interactive buttons (scale, rotate, color shifts) and lift animations on task cards for a tactile feel.
*   **Seamless Typography:** Styled globally with the elegant **Poppins** font family, utilizing strict hierarchical font-weights to distinguish active and completed tasks.
*   **SVG Favicon:** Fully customized, lightweight SVG favicon (`✔️`) embedded directly in the HTML document.

---

## 🌟 Key Features

*   **⚡ Double-Click & Inline Editing:** Edit tasks on the fly! Double-click any task name or click the pencil icon (`✏️`) to instantly swap the label for an interactive input. Press `Enter` to save or `Escape`/`❌` to cancel.
*   **💾 LocalStorage Persistence:** Your tasks are safe! All task additions, modifications, status toggles, and deletions are saved in real-time to the browser's `localStorage` so they survive page reloads.
*   **➕ Fluent Add & Auto-Scroll:** Add tasks instantly. The container auto-scrolls with a smooth animation to focus on your newly added task at the bottom of the list.
*   **🧹 Smart Empty State:** Shows a beautiful, welcoming empty-state message (`✨ No tasks left! Add a task to get started.`) when there are no pending or completed tasks.
*   **📱 Fully Responsive:** Carefully optimized with fluid flexbox layouts and `rem` units for high legibility across mobile devices, tablets, and large desktop screens.

---

## 🛠️ Technology Stack

*   **HTML5:** Semantic architecture with built-in form validation, accessible attributes (`aria-labels`), and custom SVG favicons.
*   **CSS3 (Vanilla):** Modern CSS utilizing linear gradients, custom-styled minimalist scrollbars, flexbox layouts, active states, and custom bezier transitions (`cubic-bezier(0.4, 0, 0.2, 1)`).
*   **JavaScript (ES6+):** Pure Vanilla JS using modern event delegation, local persistence, lifecycle logic, dynamic DOM generation, and clean functional programming patterns.
*   **Google Fonts:** `Poppins` (Weights: 400, 500, 600, 700).

---

## 📋 Requirements Mapping

This project was built to conform strictly to a robust set of Functional (FR) and Non-Functional Requirements (NFR). Below is a mapping of how each was achieved:

### Non-Functional Requirements (NFR)

| ID | Requirement Specification | Technical Implementation in Code |
| :--- | :--- | :--- |
| **NFR001** | Accurate representation with favicon and consistent, beautiful font family. | Implemented using a custom inline SVG favicon (`✔️`) and the Google Font **Poppins** applied globally to `body`, `input`, and `button` elements. |
| **NFR002** | Background color must be gray with a linear gradient. | Styled `body` with `background: linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)`. |
| **NFR003** | Title `<h1>` is **"Task: Do It"** and subtitle `<h2>` is **"My Tasks"** in bold, capitalized text. | Created semantic header blocks, styled with `text-transform: capitalize`, `font-weight: 700` (`h1`), and `font-weight: 600` (`h2`). |
| **NFR004** | Use cards to display tasks with hover effects. Completed is **bold**, incomplete is **500 weight**. | `.task-card` wraps each item with an elegant `translateY` transition. Completed items toggle the `.completed` class (`font-weight: 700` & line-through), pending items use `.pending` (`font-weight: 500`). |
| **NFR005** | Standardized tasks structure using an array of objects. | Instantiated local state mapped directly to: `const tasks = [{ task: "...", done: true/false }]`. |
| **NFR006** | Text input and adjacent button to add tasks. | Standardized a flexbox container form `#add-task-form` holding `#task-input` and `#add-task-btn` side-by-side. |
| **NFR007** | Use emojis or icons for interactions with consistent, harmonious hover effects. | Custom actions styled with scale-ups and rotations: `➕ Add` (rotates 90°), `✏️` (rotates -5°), `🗑️` (rotates 5°), and status circle toggles (`⚪` -> `✔️`). |

### Functional Requirements (FR)

| ID | Requirement Specification | Technical Implementation in Code |
| :--- | :--- | :--- |
| **FR001** | Add new tasks with `done: false` as default. | The submit event listener pushes an object with `done: false` to the local `tasks` array, saves to storage, and re-renders. |
| **FR002** | Toggle status between completed and incomplete. | `toggleTaskStatus(index)` dynamically toggles the boolean `done` property, updating both storage and the visual DOM classes. |
| **FR003** | Delete selected tasks regardless of completion status. | `deleteTask(index)` executes a surgical `splice(index, 1)` array operation and updates state accordingly. |

---

## 📂 Project Architecture

```
task-do-it/
├── assets/
│   └── docs/
│       └── requirements.md  # Original functional and non-functional specifications
├── index.html               # Main application layout, header, form, and list container
├── script.js                # Task data models, storage synchronization, and DOM render logic
├── styles.css               # Base styles, variables, typography, transitions, and hover animations
└── README.md                # Comprehensive documentation and project guide
```

---

## ⚙️ Technical Deep Dive

### 💾 Unified Data Lifecycle
The application utilizes a robust state-sync loop. There is a single source of truth (`tasks` array in memory) that is modified via functional helpers and then synchronizes back to `localStorage`:

```javascript
// Local Storage Load
tasks = JSON.parse(localStorage.getItem('task_do_it_tasks')) || [...defaultTasks];

// State Synchronization Trigger
function saveTasks() {
  localStorage.setItem('task_do_it_tasks', JSON.stringify(tasks));
}
```

### ✏️ Dynamic Inline Editor
Instead of popping up separate windows or prompt dialogs, editing is fully integrated directly inside the card. When the user double-clicks the text or clicks the edit icon, a `.editing` class is toggled on the list item.

```css
/* Toggles element visibility depending on state */
.task-card.editing .task-text,
.task-card.editing .status-btn,
.task-card.editing .standard-actions {
  display: none;
}

.task-card.editing .edit-input {
  display: block;
}

.task-card.editing .edit-actions {
  display: flex;
}
```

This ensures a seamless experience with zero layout shift, keeping the card dimensions clean and stable.

### 🎨 Micro-Interactions (CSS Physics)
Rather than standard binary color changes, all icons, buttons, and card elevations use customized `cubic-bezier` timing curves to simulate natural movement:

```css
.task-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.task-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
}
```

---

## 🏃 Getting Started

No build tools, compilation, or web servers are required to run this project. It runs completely out of the box on all modern browsers!

### Option 1: Just Double-Click
1. Clone or download the repository.
2. Locate the project folder `/fundamentals-dom/task-do-it/`.
3. Double-click `index.html` to open it instantly in your default web browser.

### Option 2: Live Server (VS Code)
If you are developing locally:
1. Open the project directory in VS Code.
2. If you have the **Live Server** extension installed, click **Go Live** in the bottom-right corner of your editor window.
3. The app will launch in your browser at `http://127.0.0.1:5500/fundamentals-dom/task-do-it/index.html`.

---

## 💡 How To Use the App

1.  **Add a Task:** Type your task in the input field at the top and hit `Enter` or click the `➕ Add` button.
2.  **Complete a Task:** Click the circular status icon (`⚪`) on the left side of any card. It will swap to a checkmark (`✔️`), the text will cross out, and the card's font-weight will bold. Click it again to revert.
3.  **Edit a Task:** Double-click the task text or click the pencil icon (`✏️`) to enter edit mode. Change the text and press `Enter` (or click `💾`) to save. Press `Escape` (or click `❌`) to discard your changes.
4.  **Delete a Task:** Click the trash can icon (`🗑️`) on the right side of any task card to permanently remove it from your list.

---

<div align="center">Made with with ❤️ and ☕ by <strong>Álisson</strong> &copy; 2026*</div>
