import { Card, Button } from "@nextui-org/react";
import { SymptomsSearch } from '../components/SymptomsSearch';
import { useNavigate } from 'react-router-dom';

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-8 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          AI Health Guard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Your Personal Health Assistant
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8">
          <Card className="w-full p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Symptom Analysis
            </h2>
            <p className="mb-6">
              Enter your symptoms to get instant health analysis and recommendations.
            </p>
            <SymptomsSearch />
          </Card>
        </div>

        <div className="md:col-span-4">
          <Card className="w-full p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Other Health Tools
            </h2>
            <div className="space-y-4">
              <Button
                color="primary"
                variant="flat"
                className="w-full"
                onClick={() => navigate('/pregnancy')}
              >
                Pregnancy Risk Assessment
              </Button>
              <Button
                color="primary"
                variant="flat"
                className="w-full"
                onClick={() => navigate('/heart')}
              >
                Heart Disease Prediction
              </Button>
              <Button
                color="primary"
                variant="flat"
                className="w-full"
                onClick={() => navigate('/diabetes')}
              >
                Diabetes Prediction
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            About AI Health Guard
          </h2>
          <p className="mb-4">
            AI Health Guard is your comprehensive health companion that uses advanced machine learning
            to provide personalized health insights and recommendations. Our platform offers:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Instant symptom analysis and disease prediction</li>
            <li>Personalized health recommendations</li>
            <li>Pregnancy risk assessment</li>
            <li>Heart disease prediction</li>
            <li>Diabetes risk analysis</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
