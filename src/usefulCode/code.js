import { useState } from "react";
const [tittle, setTittle] = useState('reading')
const [assignee, setAssignee] = useState('sodia')
const [dueDate, setDueDate] = useState('2025/05/02')
const [priority, setPriority] = useState('yes')
const [description, setDescription] = useState('exam reading according to exam times table')
const [taskClass, setTaskClass] = useState('work')

function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // You can pass formData as a fetch body directly:
    fetch('http://localhost:9000/tasks', { method:'POST', body: formData });
    // You can generate a URL out of it, as the browser does by default:
    console.log(new URLSearchParams(formData).toString());
    // You can work with it as a plain object.
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson); // (!) This doesn't include multiple select values
    // Or you can get an array of name-value pairs.
    console.log([...formData.entries()]);
  }