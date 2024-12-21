import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export const TransactionList = ({ transactions, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded-md"/>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-center text-gray-500">No transactions yet</p>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className={`p-4 rounded-lg border ${
                  tx.transactionType === 'income' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-red-500 bg-red-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{tx.description}</h3>
                    <p className="text-sm text-gray-600">{tx.category}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(Number(tx.timestamp) / 1000000).toLocaleString()}
                    </p>
                  </div>
                  <span 
                    className={`font-bold ${
                      tx.transactionType === 'income' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}
                  >
                    {tx.transactionType === 'income' ? '+' : '-'}
                    ${Number(tx.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
