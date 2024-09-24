"use client";
import { useEffect, useState } from "react";
import DropdownMenu from "./components/DropdownMenu";
import ItemList from "./components/ItemList";
import { CREATED_AT_ASC, FILE_NAME_ASC, FILE_NAME_DESC } from "./constants";

interface SortOption {
  label: string,
  value: string
}

type Sort = {
  sortBy: string | null
  sortOrder: string | null
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('select_order');
  const [sort, setSort] =  useState<Sort>({ sortBy: null, sortOrder: null });

  const fetchData = async () => {
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/items`
    try {
      if(sort.sortBy && sort.sortOrder) {
        const queryString = `?sortBy=${sort.sortBy}&sortOrder=${sort.sortOrder}`;
        url +=queryString;
      }
      const resp = await fetch(url);
      const data =  await resp.json();
      setItems(data?.data);
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }

  const onSelect = (value: string) => {
    setSelectedOption(value);
    if(value === CREATED_AT_ASC) {
      setSort({ sortBy: "created_at", sortOrder: "asc" });
    } else if (value === FILE_NAME_ASC) {
      setSort({ sortBy: "filename", sortOrder: "asc"});
    } else if (value === FILE_NAME_DESC) {
      setSort({ sortBy: "filename", sortOrder: "desc"})
    }
  }

  useEffect(()=>{
    if(selectedOption != "select_order") {
      fetchData();
    }
  }, [sort])

  const sortOptions: SortOption [] = [
    { label: "Select sort order", value: "select_order" },
    { label: "sort by created at ascendent", value: "created_at_asc"},
    { label: "sort by filename ascendent", value: "filename_asc"},
    { label: "sort by filename descendent", value: "filename_desc"}
  ]
  return (
    <div className="container mx-auto bg-gray-400 p-5 mt-5">
      <h1 className="text-3xl font-bold mb-4 text-center">Items</h1>
      <DropdownMenu options={sortOptions} 
        selectedOption={selectedOption} 
        onSelect={onSelect}/>
      
      <ItemList items={items}/>
    </div>
  );
}
