import React from 'react';
import FlowEditor from './components/FlowEditor';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="p-4 border-b bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">Organigrama — Prototipo</h1>
          <div className="text-sm text-gray-600">Auth: Supabase (social)</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <p className="mb-4">Editor básico (single-user) con plantillas y export fácil.</p>
        <div className="h-[640px] border rounded bg-white">
          <FlowEditor />
        </div>
      </main>
    </div>
  );
}
