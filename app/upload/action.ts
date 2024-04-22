'use server'

export async function transcribeFile(formData: FormData): Promise<any> {
  try {
    const response = await fetch(`https://0628-2600-1700-7b00-5e10-a421-3d2-7c33-bdf.ngrok-free.app/audio`, {
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
