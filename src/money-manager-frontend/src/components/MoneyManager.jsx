import React, { useState, useEffect } from 'react';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';
import { Dashboard } from './Dashboard';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export const MoneyManager = () => {
  const { actor } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const result = await actor.getTransactions();
      setTransactions(result);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [actor]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <Dashboard transactions={transactions} />
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Add New Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionForm onSuccess={fetchTransactions} />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-4">
          <TransactionList 
            transactions={transactions} 
            isLoading={isLoading} 
          />
        </div>
      </div>
    </div>
  );
};