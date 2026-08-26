import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const ItemTable = ({ items, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Stock':
        return <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">In Stock</span>;
      case 'Low Stock':
        return <span className="inline-flex rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-800">Low Stock</span>;
      case 'Out of Stock':
        return <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">Out of Stock</span>;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full whitespace-nowrap text-left text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-6 py-4 font-medium">ID</th>
            <th className="px-6 py-4 font-medium">Image</th>
            <th className="px-6 py-4 font-medium">Item Name</th>
            <th className="px-6 py-4 font-medium">Category</th>
            <th className="px-6 py-4 font-medium">Price (₹)</th>
            <th className="px-6 py-4 font-medium">Stock</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {items.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">{item.itemId}</td>
              <td className="px-6 py-4">
                <div className="h-10 w-10 flex-shrink-0">
                  {item.image ? (
                    <img className="h-10 w-10 rounded-md object-cover" src={`http://localhost:5000${item.image}`} alt={item.name} />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-gray-400">
                      Img
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
              <td className="px-6 py-4 text-gray-500">{item.category}</td>
              <td className="px-6 py-4 text-gray-900">{formatCurrency(item.price)}</td>
              <td className="px-6 py-4 text-gray-900">{item.stock}</td>
              <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  <button 
                    onClick={() => onEdit(item)}
                    className="rounded bg-indigo-50 p-1.5 text-indigo-600 hover:bg-indigo-100 transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => onDelete(item._id)}
                    className="rounded bg-red-50 p-1.5 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                No items found. Add some items to your inventory.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
