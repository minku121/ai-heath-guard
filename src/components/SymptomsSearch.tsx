import React, { useState, useEffect, useRef } from 'react';
import { Input, Spinner, Card, Button, Chip } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { searchSymptoms, analyzeSymptoms } from '../services/symptomsService';
import { useDebounce } from '../hooks/useDebounce';

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

export const SymptomsSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [analysis, setAnalysis] = useState<DiseaseAnalysis | null>(null);
  const debouncedQuery = useDebounce(query, 300);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSymptoms = async () => {
      if (!debouncedQuery.trim()) {
        setSymptoms([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await searchSymptoms(debouncedQuery);
        setSymptoms(results);
        setShowResults(true);
      } catch (err) {
        setError('Failed to fetch symptoms. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSymptoms();
  }, [debouncedQuery]);

  const handleSymptomSelect = (symptom: Symptom) => {
    if (!selectedSymptoms.includes(symptom.name)) {
      setSelectedSymptoms([...selectedSymptoms, symptom.name]);
    }
    setQuery('');
    setShowResults(false);
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) {
      setError('Please select at least one symptom');
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeSymptoms(selectedSymptoms);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze symptoms. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative" ref={searchRef}>
        <Input
          type="text"
          label="Enter your symptoms"
          placeholder="Type to search symptoms..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          className="w-full"
          endContent={loading && <Spinner size="sm" />}
        />

        <AnimatePresence>
          {showResults && (symptoms.length > 0 || loading || error) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full mt-2 bg-background border border-divider rounded-lg shadow-lg"
            >
              {loading ? (
                <div className="p-4 text-center">
                  <Spinner size="sm" />
                  <span className="ml-2">Searching...</span>
                </div>
              ) : error ? (
                <div className="p-4 text-danger">{error}</div>
              ) : symptoms.length > 0 ? (
                <div className="max-h-96 overflow-y-auto">
                  {symptoms.map((symptom) => (
                    <motion.div
                      key={symptom.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ backgroundColor: 'rgba(var(--nextui-primary-rgb), 0.1)' }}
                      className="p-3 cursor-pointer hover:bg-primary/10"
                      onClick={() => handleSymptomSelect(symptom)}
                    >
                      <div className="font-medium">{symptom.name}</div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No symptoms found. Try a different search term.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Symptoms */}
      <div className="mt-4 flex flex-wrap gap-2">
        {selectedSymptoms.map((symptom) => (
          <Chip
            key={symptom}
            onClose={() => removeSymptom(symptom)}
            className="bg-primary/10 text-primary"
          >
            {symptom}
          </Chip>
        ))}
      </div>

      {/* Analyze Button */}
      <div className="mt-4">
        <Button
          color="primary"
          onClick={handleAnalyze}
          isLoading={analyzing}
          disabled={selectedSymptoms.length === 0}
        >
          Analyze Symptoms
        </Button>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">{analysis.disease}</h2>
            <p className="mb-4">{analysis.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Precautions</h3>
                <ul className="list-disc pl-5">
                  {analysis.precautions.map((precaution, index) => (
                    <li key={index}>{precaution}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Medications</h3>
                <ul className="list-disc pl-5">
                  {analysis.medications.map((medication, index) => (
                    <li key={index}>{medication}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Diet Recommendations</h3>
                <ul className="list-disc pl-5">
                  {analysis.diet.map((diet, index) => (
                    <li key={index}>{diet}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Workout Recommendations</h3>
                <ul className="list-disc pl-5">
                  {analysis.workout.map((workout, index) => (
                    <li key={index}>{workout}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}; 