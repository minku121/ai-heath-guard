import { useState } from 'react';
import { Card, Input, Button, Spinner, Chip, Select, SelectItem } from "@nextui-org/react";

export default function HeartPage() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ prediction_text: string; color: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Convert numeric string values to numbers before sending
    const processedData = {
      ...formData,
      age: Number(formData.age),
      trestbps: Number(formData.trestbps),
      chol: Number(formData.chol),
      restecg: Number(formData.restecg),
      thalach: Number(formData.thalach),
      oldpeak: Number(formData.oldpeak),
      slope: Number(formData.slope),
      ca: Number(formData.ca)
    };

    try {
      const response = await fetch('/api/heart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze heart condition');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to analyze heart condition. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Heart Disease Analysis</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Enter Health Parameters</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Age (in years)"
                placeholder="Enter age between 20-80"
                name="age"
                type="number"
                min="20"
                max="80"
                value={formData.age}
                onChange={handleChange}
                required
                description="Your current age in years"
              />

              <Select
                label="Sex"
                placeholder="Select your gender"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
              >
                <SelectItem key="Male" value="Male">Male</SelectItem>
                <SelectItem key="Female" value="Female">Female</SelectItem>
              </Select>

              <Select
                label="Chest Pain Type"
                placeholder="Select pain level"
                name="cp"
                value={formData.cp}
                onChange={handleChange}
                required
                description="Type of chest pain experienced"
              >
                <SelectItem key="Low pain" value="Low pain">Typical Angina (Type 1)</SelectItem>
                <SelectItem key="Mild pain" value="Mild pain">Atypical Angina (Type 2)</SelectItem>
                <SelectItem key="Moderate pain" value="Moderate pain">Non-anginal Pain (Type 3)</SelectItem>
                <SelectItem key="Extreme pain" value="Extreme pain">Asymptomatic (Type 4)</SelectItem>
              </Select>

              <Input
                label="Resting Blood Pressure (mm Hg)"
                placeholder="Enter value between 90-200"
                name="trestbps"
                type="number"
                min="90"
                max="200"
                value={formData.trestbps}
                onChange={handleChange}
                required
                description="Blood pressure when at rest"
              />

              <Input
                label="Serum Cholesterol (mg/dl)"
                placeholder="Enter value between 120-570"
                name="chol"
                type="number"
                min="120"
                max="570"
                value={formData.chol}
                onChange={handleChange}
                required
                description="Amount of cholesterol in blood"
              />

              <Select
                label="Fasting Blood Sugar > 120 mg/dl"
                placeholder="Select blood sugar status"
                name="fbs"
                value={formData.fbs}
                onChange={handleChange}
                required
                description="Blood sugar levels after fasting"
              >
                <SelectItem key="Yes" value="Yes">Yes ({'>'}120 mg/dl)</SelectItem>
                <SelectItem key="No" value="No">No (≤120 mg/dl)</SelectItem>
              </Select>

              <Select
                label="Resting ECG Results"
                placeholder="Select ECG result"
                name="restecg"
                value={formData.restecg}
                onChange={handleChange}
                required
                description="Electrocardiographic measurements at rest"
              >
                <SelectItem key="0" value="0">Normal</SelectItem>
                <SelectItem key="1" value="1">ST-T Wave Abnormality</SelectItem>
                <SelectItem key="2" value="2">Left Ventricular Hypertrophy</SelectItem>
              </Select>

              <Input
                label="Maximum Heart Rate"
                placeholder="Enter value between 60-220"
                name="thalach"
                type="number"
                min="60"
                max="220"
                value={formData.thalach}
                onChange={handleChange}
                required
                description="Maximum heart rate achieved during exercise"
              />

              <Select
                label="Exercise Induced Angina"
                placeholder="Select if pain occurred"
                name="exang"
                value={formData.exang}
                onChange={handleChange}
                required
                description="Chest pain caused by exercise"
              >
                <SelectItem key="Yes" value="Yes">Yes (Pain during exercise)</SelectItem>
                <SelectItem key="No" value="No">No (No pain)</SelectItem>
              </Select>

              <Input
                label="ST Depression"
                placeholder="Enter value between 0-6.2"
                name="oldpeak"
                type="number"
                step="0.1"
                min="0"
                max="6.2"
                value={formData.oldpeak}
                onChange={handleChange}
                required
                description="ST depression induced by exercise relative to rest"
              />

              <Input
                label="Slope of Peak Exercise ST Segment"
                placeholder="Enter value (1-3)"
                name="slope"
                type="number"
                min="1"
                max="3"
                value={formData.slope}
                onChange={handleChange}
                required
                description="1: Upsloping, 2: Flat, 3: Downsloping"
              />

              <Input
                label="Number of Major Vessels"
                placeholder="Enter value (0-3)"
                name="ca"
                type="number"
                min="0"
                max="3"
                value={formData.ca}
                onChange={handleChange}
                required
                description="Number of major vessels colored by fluoroscopy (0-3)"
              />

              <Select
                label="Thalassemia"
                placeholder="Select thalassemia type"
                name="thal"
                value={formData.thal}
                onChange={handleChange}
                required
                description="Blood disorder that affects hemoglobin production"
              >
                <SelectItem key="Normal" value="Normal (No Thalassemia)">Normal</SelectItem>
                <SelectItem key="Fixed" value="Fixed Defect (Beta-thalassemia minor)">Fixed Defect</SelectItem>
                <SelectItem key="Reversible" value="Reversible Defect (Beta-thalassemia intermedia)">Reversible Defect</SelectItem>
                <SelectItem key="Serious" value="Serious Defect (Beta-thalassemia major)">Serious Defect</SelectItem>
              </Select>

              {error && (
                <p className="text-danger text-sm">{error}</p>
              )}

              <Button
                color="primary"
                className="w-full"
                type="submit"
                disabled={loading}
                size="lg"
              >
                {loading ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  'Predict Heart Disease Risk'
                )}
              </Button>
            </form>
          </Card>

          {/* Results Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            {result ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Prediction</h3>
                  <Chip
                    style={{ backgroundColor: result.color }}
                    className="text-white text-lg"
                    size="lg"
                  >
                    {result.prediction_text}
                  </Chip>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-foreground/60">
                  Fill in your health parameters and click "Predict Heart Disease Risk" to get your analysis.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
} 