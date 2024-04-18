'use server'

export async function transcribeFile(formData: FormData): Promise<any> {
  try {
    const url = process.env.NGROK_API_URL; // Your ngrok URL set in .env.local
    const response = await fetch(`${url}/audio`, {
      method: 'POST',
      body: formData, // Forward the incoming request body to the ngrok service
    });
    if (!response.ok) throw new Error('Failed to transcribe');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Error transcribing file');
  }
}
