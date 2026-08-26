import { formatCurrency } from '../../utils/formatCurrency';

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="mt-4 space-y-4">
      {transactions && transactions.length > 0 ? (
        transactions.map((tx) => (
          <div key={tx._id} className="flex items-center justify-between rounded-lg border border-gray-100 p-4 transition-colors hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                <span className="text-sm font-medium">{tx.invoiceNumber.split('-')[1]}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{tx.invoiceNumber}</p>
                <p className="text-xs text-gray-500">{new Date(tx.createdAt).toLocaleDateString()} {new Date(tx.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">{formatCurrency(tx.grandTotal)}</p>
              <p className="text-xs text-green-600">Completed</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-sm text-gray-500 py-4">No recent transactions</p>
      )}
    </div>
  );
};

export default RecentTransactions;
