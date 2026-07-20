import { neon } from '@neondatabase/serverless';

export default async function handler(request, response) {
  // Connect to the Neon database safely using Vercel's environment variables
  const sql = neon(process.env.DATABASE_URL);

  // Handle Fetching Data (when the page loads)
  if (request.method === 'GET') {
    try {
      const entries = await sql`SELECT * FROM entries ORDER BY created_at DESC`;
      return response.status(200).json(entries);
    } catch (error) {
      return response.status(500).json({ error: "Failed to fetch entries" });
    }
  }

  // Handle Saving Data (when the user clicks submit)
  if (request.method === 'POST') {
    try {
      const { content } = request.body;
      const result = await sql`INSERT INTO entries (content) VALUES (${content}) RETURNING *`;
      return response.status(201).json(result[0]);
    } catch (error) {
      return response.status(500).json({ error: "Failed to save entry" });
    }
  }

  // Reject anything else
  return response.status(405).json({ message: "Method not allowed" });
}