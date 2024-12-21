import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Salary',
  'Investment',
  'Other'
];

export const TransactionForm = ({ onSuccess }) => {
  const { actor } = useAuth();
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: CATEGORIES[0],
    transactionType: 'expense'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await actor.addTransaction(
        Number(formData.amount),
        formData.description,
        formData.category,
        formData.transactionType
      );
      setFormData({
        amount: '',
        description: '',
        category: CATEGORIES[0],
        transactionType: 'expense'
      });
      onSuccess();
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? 'Adding...' : 'Add Transaction'}
      </button>
    </form>
  );
};
