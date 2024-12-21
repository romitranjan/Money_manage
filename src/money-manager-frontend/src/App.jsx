import React from 'react';
import { MoneyManager } from './components/MoneyManager';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800">ICP Money Manager</h1>
          </div>
        </nav>
        <main className="py-8">
          <MoneyManager />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;