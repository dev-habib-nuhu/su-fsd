"use client"
import React, { useState, useEffect} from 'react';
import Dropdown from './components/Dropdown';
import ItemList from './components/ItemList';

type SortOption = {
  label: string;
  value: string;
}

export default function IndexPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [sortedItems, setSortedItems] = useState<Item[]>([]);
  const [sortOption, setSortOption] = useState<string>('select_order');

  const sortItems = (option: string) => {
    let sorted:Item[] = [];
    if (option === 'created_at') {
      sorted = [...items].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (option === 'filename_asc') {
      sorted = [...items].sort((a, b) => {
        const numA = parseInt(a.filename.replace(/\D/g, ''), 10) || 0;
        const numB = parseInt(b.filename.replace(/\D/g, ''), 10) || 0;
        return numA - numB || a.filename.localeCompare(b.filename);
      });
    } else if (option === 'filename_desc') {
      sorted = [...items].sort((a, b) => {
        const numA = parseInt(a.filename.replace(/\D/g, ''), 10) || 0;
        const numB = parseInt(b.filename.replace(/\D/g, ''), 10) || 0;
        return numB - numA || b.filename.localeCompare(a.filename);
      });
    }
    if(option != 'select_order'){
      setSortedItems(sorted);
      setSortOption(option);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/items');
        const data = await response.json();
  
        setItems(data?.data);
        sortItems('select_order');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const sortOptions: SortOption[] = [
    {label:'Select sort order', value:'select_order'},
    { label: 'Sort by created at ascendent', value: 'created_at' },
    { label: 'Sort by filename ascendent', value: 'filename_asc' },
    { label: 'Sort by filename descendent', value: 'filename_desc' },
  ];

  return (
    <div className="container mx-auto mt-8 bg-gray-500 p-5 rounded-md">
      <h1 className="text-3xl font-semibold mb-4 text-center">Item List</h1>
      <Dropdown options={sortOptions} selectedOption={sortOption} onSelect={sortItems} />
      <ItemList items={sortedItems} />
    </div>
  );
};
