import medalsData from '@root/medals.json';
import { NextApiRequest, NextApiResponse } from 'next';
import { MedalData } from '@/types/medals';

/**
 * API Route Handler for fetching Olympic medal data
 *
 * @param req - The HTTP request object (from Next.js API)
 * @param res - The HTTP response object (from Next.js API)
 *
 * @returns {void} Responds with a JSON array of medal data.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MedalData[] | { error: string }>,
) {
  try {
    // Calculating total count of medals and appending it in the response
    const medalsDataCompleted: MedalData[] = (medalsData as Omit<MedalData, 'total'>[]).map(
      (item) => ({
        ...item,
        total: item.gold + item.silver + item.bronze,
      }),
    );

    res.status(200).json(medalsDataCompleted);
  } catch (err: unknown) {
    console.error('Error in medals API route:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
