import { useState, useMemo, useEffect } from 'react';
import { MedalData } from '@/types/medals';
import { sortMedals } from '@/utils/sortUtils';
import { useRouter } from 'next/router';

export default function MedalTable({ data, sortBy }: { data: MedalData[]; sortBy: string }) {
  const router = useRouter();
  // Initialized from the URL query parameter passed to the page (sortBy)
  const [currentSort, setCurrentSort] = useState(sortBy);

  // Memoized sorted data based on currentSort
  const sortedData = useMemo(
    () => sortMedals([...data], currentSort).slice(0, 10),
    [data, currentSort],
  );

  // Sync local state with prop if URL changes
  useEffect(() => {
    setCurrentSort(sortBy);
  }, [sortBy]);

  // Update both state and URL on column click
  const handleSort = (column: string) => {
    setCurrentSort(column);
    router.push(`/?sort=${column}`, undefined, { shallow: true });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">MEDAL COUNT</h2>

      <table className="w-full text-left border-collapse">
        <thead className="text-sm text-gray-700 border-b-2 border-gray-800">
          <tr className="border-b">
            <th></th>
            <th className="cursor-pointer" onClick={() => handleSort('gold')}>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              </div>
            </th>
            <th className="cursor-pointer" onClick={() => handleSort('silver')}>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
              </div>
            </th>
            <th className="cursor-pointer" onClick={() => handleSort('bronze')}>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-amber-700 rounded-full"></span>
              </div>
            </th>
            <th className="cursor-pointer text-gray-900" onClick={() => handleSort('total')}>
              TOTAL
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((country, index) => (
            <tr key={country.code} className="text-sm border-b border-gray-300 last:border-none">
              <td className="flex items-center gap-2 p-3">
                <span className="w-5 text-gray-500">{index + 1}</span>
                <span className={`icon ${country.code.toLowerCase()}`}></span>
                <span className="font-semibold">{country.code}</span>
              </td>
              <td className="p-3">{country.gold}</td>
              <td className="p-3">{country.silver}</td>
              <td className="p-3">{country.bronze}</td>
              <td className="p-3 font-bold">{country.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
