<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodoResource;
use App\Models\Todos;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    // Display a listing of the todo items
    public function index()
    {
        // Get all the todo items from the database
        $todos = Todos::all();

        // Return a JSON response with the todo items as resources
        return response()->json(TodoResource::collection($todos));
    }

    // Store a newly created todo item in the database
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'title' => 'required|unique:todo',
            'category' => 'required|integer',
            'labels' => 'nullable|array',
            'date' => 'required|date'
        ]);

        // Create a new todo item with the request data
        $todo = Todos::create($request->all());

        // Return a JSON response with the todo item as a resource and a success message
        return response()->json([
            'data' => new TodoResource($todo),
            'message' => 'Todo item created successfully.'
        ]);
    }

    // Display the specified todo item
    public function show(Todos $todo)
    {
        // Return a JSON response with the todo item as a resource
        return response()->json(new TodoResource($todo));
    }

    // Update the specified todo item in the database
    public function update(Request $request, Todos $todo)
    {
        // Validate the request data
        $request->validate([
            'title' => 'required|unique:todo,title,' . $todo->id,
            'category' => 'required|integer',
            'labels' => 'nullable|array',
            'date' => 'required|date'
        ]);

        // Update the todo item with the request data
        $todo->update($request->all());

        // Return a JSON response with the todo item as a resource and a success message
        return response()->json([
            'data' => new TodoResource($todo),
            'message' => 'Todo item updated successfully.'
        ]);
    }

    // Remove the specified todo item from the database
    public function destroy(Todos $todo)
    {
        // Delete the todo item
        $todo->delete();

        // Return a JSON response with a success message
        return response()->json([
            'message' => 'Todo item deleted successfully.'
        ]);
    }
}
