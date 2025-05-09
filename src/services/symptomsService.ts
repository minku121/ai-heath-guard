import env from '../config/env';

interface Symptom {
  id: string;
  name: string;
  description?: string;
}

interface DiseaseAnalysis {
  disease: string;
  description: string;
  precautions: string[];
  medications: string[];
  diet: string[];
  workout: string[];
}

let cachedSymptoms: string[] = [];

export const searchSymptoms = async (query: string): Promise<Symptom[]> => {
  try {
    // If we don't have cached symptoms, fetch them
    if (cachedSymptoms.length === 0) {
      const response = await fetch(`${env.apiUrl}/api/symptoms`);
      if (!response.ok) {
        throw new Error('Failed to fetch symptoms');
      }
      cachedSymptoms = await response.json();
    }

    // Filter symptoms based on query
    const filteredSymptoms = cachedSymptoms
      .filter(symptom => 
        symptom.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10); // Limit to 10 suggestions for better performance

    return filteredSymptoms.map((symptom, index) => ({
      id: index.toString(),
      name: symptom
    }));
  } catch (error) {
    console.error('Error searching symptoms:', error);
    return [];
  }
};

export const analyzeSymptoms = async (symptoms: string[]): Promise<DiseaseAnalysis> => {
  try {
    const response = await fetch(`${env.apiUrl}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symptoms }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze symptoms');
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw error;
  }
}; 