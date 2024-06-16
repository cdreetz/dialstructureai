'use server'

export async function checkEndpoint() {
  try {
    const response = await fetch(`https://2699-2600-1700-7b00-5e10-f950-cd01-6b55-6042.ngrok-free.app/health-check/`, {
      method: 'GET'
    });
    console.log('Check endpoint GET response:', response)
  } catch (error) {
    console.error('GET endpoint no response');
    throw new Error('Error checking endpoint');
  }
}

export async function processAudio(formData: FormData, options: {
  align: boolean,
  diarize: boolean,
  chat_transcription: boolean,
  summarize: boolean,
  analyze_sentiment: boolean,
  extract_keywords: boolean
}): Promise<any> {
  console.log('Form data in action:', formData)
  formData.append("align", "true");
  formData.append("diarize", "true");
  formData.append("chat_transcription", "true");
  formData.append("summarize", "true");
  formData.append("analyze_sentiment", "true");
  formData.append("extract_keywords", "true");
  console.log('Form data in action after appending:', formData)
  try {
    const response = await fetch(`https://2699-2600-1700-7b00-5e10-f950-cd01-6b55-6042.ngrok-free.app/process-audio/`, {
      method: 'POST',
      body: formData, // Forward the incoming FormData which includes the file and options
      
    });
    console.log('Action response:', response)

    if (!response.ok) {
      throw new Error('Failed to process audio');
    }

    const data = await response.json();
    console.log('JSON data after parsing:', data)
    return data;
  } catch (error) {
    console.error('Audio processing error:', error);
    throw new Error('Error processing audio file');
  }
}




