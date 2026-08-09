# Task: Do It

**Description:**
The project is designed to allow users to manage their tasks by adding, editing, and deleting them. The project is called **Task: Do It**.

## Non-Functional Requirements

**NFR001:** The favicon must represent the project accurately. Choose a beautiful font family and apply it consistently using CSS.

**NFR002:** The background color must be gray with a linear gradient.

**NFR003:** The title must display **"Task: Do It"** using an `<h1>` tag, and the subtitle must display **"My Tasks"** using an `<h2>` tag. Both must use capitalized text, a beautiful font family, and a bold font weight.

**NFR004:** Use cards to display the tasks, with CSS hover effects. When a task is completed, its name must be displayed in bold. When a task is not completed, its name must use a `font-weight` of `500`.

**NFR005:** The project must be developed using HTML, CSS, and Vanilla JavaScript. HTML and CSS have already been initialized. Use an array of objects with the following structure:

**Example:**

```javascript
const tasks = [
  { task: "Go to the mall", done: true },
  { task: "Clean my house", done: false }
];
```

**NFR006:** Create a text input where users can type a task to add. Next to the input, there must be a button to add the task.

**NFR007:** Use emojis or icons for the **Add Task**, **Edit**, and **Delete** buttons. Apply visually consistent and harmonious effects to these icons or emojis.

## Functional Requirements

**FR001:** Add a new task with `done` set to `false` by default.

**FR002:** Allow users to change a task's status from `true` to `false` or from `false` to `true`.

**FR003:** Allow users to delete a selected task, regardless of whether its `done` status is `true` or `false`.

## Observations

The project must be developed using HTML, CSS, and Vanilla JavaScript on a single page.

**Now, just do it.**
