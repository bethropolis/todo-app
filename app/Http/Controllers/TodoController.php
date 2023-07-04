<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::all();
        return response()->json($todos);
    }
    
    public function store(Request $request)
    {
        $todo = new Todo;
        $todo->title = $request->input('title');
        $todo->save();
        return response()->json($todo, 201);
    }

    public function show($id)
    {
        $todo = Todo::find($id);
        if (!$todo) {
            return response()->json(['message' => 'Todo not found'], 404);
        }
        return response()->json($todo);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::find($id);
        if (!$todo) {
            return response()->json(['message' => 'Todo not found'], 404);
        }
        $todo->title = $request->input('title');
        $todo->save();
        return response()->json($todo);
    }

    public function destroy($id)
    {
        $todo = Todo::find($id);
        if (!$todo) {
            return response()->json(['message' => 'Todo not found'], 404);
        }
        $todo->delete();
        return response()->json(['message' => 'Todo deleted']);
    }
}
