import { useRouter } from 'next/router';
import { useMedals } from '@hooks/useMedals';
import MedalTable from '@components/MedalTable';
import '@styles/globals.css';

export default function Home() {
  const { data, error } = useMedals();
  const router = useRouter();
  const sortParam = (router.query.sort as string) || 'gold';

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return <MedalTable data={data} sortBy={sortParam} />;
}
