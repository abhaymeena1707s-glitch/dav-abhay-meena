import { formatCurrency } from '../../utils/formatCurrency';

const PrintableInvoice = ({ bill }) => {
  if (!bill) return null;

  return (
    <div className="bg-white p-8 font-sans text-gray-900" style={{ width: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-wider text-indigo-600">StockManage</h1>
          <p className="mt-2 text-sm text-gray-500">123 Business Avenue, Tech Park</p>
          <p className="text-sm text-gray-500">City, State 12345</p>
          <p className="text-sm text-gray-500">Phone: (123) 456-7890</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-400">Invoice</h2>
          <p className="mt-2 text-sm font-medium">
            Invoice No: <span className="font-normal">{bill.invoiceNumber}</span>
          </p>
          <p className="text-sm font-medium">
            Date: <span className="font-normal">{new Date(bill.createdAt).toLocaleDateString()}</span>
          </p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-8 flex justify-between">
        <div>
          <h3 className="mb-2 text-sm font-bold uppercase text-gray-400">Bill To:</h3>
          <p className="font-medium">{bill.customerName || 'Walk-in Customer'}</p>
          {bill.customerPhone && <p className="text-sm text-gray-600">Phone: {bill.customerPhone}</p>}
        </div>
      </div>

      {/* Items Table */}
      <table className="mb-8 w-full text-left text-sm">
        <thead className="border-b-2 border-gray-900">
          <tr>
            <th className="py-3 font-bold">Item Description</th>
            <th className="py-3 font-bold text-right">Qty</th>
            <th className="py-3 font-bold text-right">Price</th>
            <th className="py-3 font-bold text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bill.items.map((item, index) => (
            <tr key={index}>
              <td className="py-3">{item.name}</td>
              <td className="py-3 text-right">{item.quantity}</td>
              <td className="py-3 text-right">{formatCurrency(item.price)}</td>
              <td className="py-3 text-right font-medium">{formatCurrency(item.price * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-64 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-500">Subtotal:</span>
            <span>{formatCurrency(bill.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-500">Tax (18%):</span>
            <span>{formatCurrency(bill.tax)}</span>
          </div>
          <div className="border-t-2 border-gray-900 pt-3 flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>{formatCurrency(bill.grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 border-t pt-8 text-center text-sm text-gray-500">
        <p>Thank you for your business!</p>
        <p className="mt-1">For any queries regarding this invoice, please contact support.</p>
      </div>
    </div>
  );
};

export default PrintableInvoice;
