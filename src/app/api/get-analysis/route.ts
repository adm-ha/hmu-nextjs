// src/app/api/get-analysis/route.ts (NEW FILE)
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userQuery, systemPrompt } = await request.json();

  // Your API key is now 100% secure on the server
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured on server' },
      { status: 500 }
    );
  }

  // Note: I updated the model to a more common one, update if you had a specific preview
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
  };

  let retries = 3;
  let delay = 1000;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }

      const result = await response.json();
      const candidate = result.candidates?.[0];

      if (candidate && candidate.content?.parts?.[0]?.text) {
        // Success! Send just the text back to the client.
        return NextResponse.json({ text: candidate.content.parts[0].text });
      } else {
        throw new Error("Invalid response structure from API.");
      }

    } catch (e: any) {
      console.error(e.message);
      if (i === retries - 1) {
        return NextResponse.json(
          { error: "Failed to get response from AI after multiple attempts." },
          { status: 500 }
        );
      }
      await new Promise(res => setTimeout(res, delay));
      delay *= 2;
    }
  }

  // Fallback in case loop finishes without returning
  return NextResponse.json(
    { error: 'An unexpected error occurred.' },
    { status: 500 }
  );
}