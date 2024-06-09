'use server'

export async function transcribeFile(formData: FormData): Promise<any> {
  try {
    const response = await fetch(`https://d687-2600-1700-7b00-5e10-8ee4-68a0-27ea-4836.ngrok-free.app/audio`, {
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

export async function processAudio(formData: FormData): Promise<any> {
  try {
    const response = await fetch(`http://127.0.0.1:8005/process-audio/`, {
      method: 'POST',
      body: formData, // Forward the incoming FormData which includes the file and options
    });
    if (!response.ok) throw new Error('Failed to process audio');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Audio processing error:', error);
    throw new Error('Error processing audio file');
  }
}

export async function fetchExampleData(): Promise<any> {
  try {
    const response = await fetch(`https://bafa-2600-1700-7b00-5e10-ccf3-92e3-f6c7-a049.ngrok-free.app/example-data`, {
      method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to fetch example data');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching example data:', error);
    throw new Error('Error fetching example data');
  }
}

export async function getExampleData(): Promise<any> {
  try {
    const response = await fetch(`localhost:8080/toy-data`, {
      method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to fetch example data');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching example data:', error);
    throw new Error('Error fetching example data');
  }
}