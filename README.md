# AI Health Guard

Your Personal Health Assistant powered by AI.

## Features

- Symptom-based disease prediction
- Detailed health recommendations
- Pregnancy risk assessment
- Heart disease prediction
- Diabetes prediction
- Dark mode support
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Python 3.8+ (for backend)
- Flask (for backend)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-health-guard-frontend.git
cd ai-health-guard-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=AI Health Guard
VITE_APP_DESCRIPTION=Your Personal Health Assistant
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DARK_MODE=true
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

The frontend expects the following API endpoints:

- `GET /api/symptoms` - Get list of all symptoms
- `POST /api/analyze` - Analyze symptoms and get disease prediction
- `POST /api/pregnancy` - Pregnancy risk assessment
- `POST /api/heart` - Heart disease prediction
- `POST /api/diabetes` - Diabetes prediction

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
