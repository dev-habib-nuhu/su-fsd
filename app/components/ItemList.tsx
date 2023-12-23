interface ItemListProps {
  items: Item[];
}

export default function ItemList({ items }:ItemListProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.created_at + item.filename} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
          <div className="w-full flex items-center justify-between p-6 space-x-6">
            <div className="flex-1 truncate">
              <div className="text-sm font-medium text-indigo-600 truncate">{item.created_at}</div>
              <div className="mt-2">
                <p className="text-xl font-semibold text-gray-900">{item.filename}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

