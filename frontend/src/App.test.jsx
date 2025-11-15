import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import App from "./App";
import * as api from "./lib/api";
import { expect } from "vitest";

vi.mock("./lib/api");


test("renders title", async ()=>{
    api.TodosAPI.list.mockResolvedValue([]);
    render(<App />);
    expect(await screen.findByText(/Todo App/i)).toBeInTheDocument();
});

test("loads and display todos", async ()=> {
    api.TodosAPI.list.mockResolvedValue([
        { _id: "1", title: "A", completed: false }
    ]);
    render(<App />);
    expect(await screen.findByText("A")).toBeInTheDocument();
});

test("adds a new todo", async ()=> {
    api.TodosAPI.list.mockResolvedValue([]);
    api.TodosAPI.create.mockResolvedValue(
        { _id: "2", title: "New Task", completed: false}
    );

    render(<App />);
    fireEvent.change(screen.getByLabelText("new-todo-input"), { target: { value: "New Task"} });
    fireEvent.click(screen.getByText("Add"));

    await waitFor(() =>{
        expect(screen.getByText("New Task")).toBeInTheDocument();
    })
});


test("toggles a todo", async ()=>{
    api.TodosAPI.list.mockResolvedValue([
        { _id: "1", title: "A", completed: false }
    ]);
    api.TodosAPI.update.mockResolvedValue(
        { _id: "1", title: "A", completed: true }
    );

    render(<App />);
    const checkbox = await screen.findByLabelText("toggle-A");
    fireEvent.click(checkbox);

    await waitFor(() =>{
        expect(screen.getByText("A")).toBeInTheDocument();
    })
})