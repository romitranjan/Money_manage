import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard = ({ transactions }) => {
  const calculateMetrics = () => {
    const totalIncome = transactions
      .filter(tx => tx.transactionType === 'income')
      .reduce((sum, tx) => sum + Number(tx.amount), 0);

    const totalExpenses = transactions
      .filter(tx => tx.transactionType === 'expense')
      .reduce((sum, tx) => sum + Number(tx.amount), 0);

    const balance = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      balance
    };
  };

  const { totalIncome, totalExpenses, balance } = calculateMetrics();

  const prepareChartData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayTransactions = transactions.filter(tx => {
        const txDate = new Date(Number(tx.timestamp) / 1000000).toISOString().split('T')[0];
        return txDate === date;
      });

      const income = dayTransactions
        .filter(tx => tx.transactionType === 'income')
        .reduce((sum, tx) => sum + Number(tx.amount), 0);

      const expenses = dayTransactions
        .filter(tx => tx.transactionType === 'expense')
        .reduce((sum, tx) => sum + Number(tx.amount), 0);

      return {
        date,
        income,
        expenses
      };
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${balance.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              ${totalIncome.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              ${totalExpenses.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>7-Day Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={prepareChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#10B981" name="Income" />
                <Line type="monotone" dataKey="expenses" stroke="#EF4444" name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
