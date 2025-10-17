# ChefAI - Smart Recipe Generator

## 📝 What This Project Does

**ChefAI** is an AI-powered recipe discovery web application that generates personalized recipe suggestions based on ingredients you have in your kitchen. Users select ingredients, set dietary preferences (vegetarian, vegan, allergies), and receive instant AI-generated recipes with detailed cooking instructions, nutritional information, and the ability to save favorites locally.

**Tech Stack:** Next.js 16 (React 19) • TypeScript • Tailwind CSS v4 • shadcn/ui • Groq AI (LLaMA 3.3) • LocalStorage

---

## Overview

An intelligent recipe generation application that creates personalized recipes based on your available ingredients and dietary preferences.

## Features

- 🔍 **Ingredient-Based Search**: Select ingredients you have on hand
- 🍽️ **Smart Recipe Suggestions**: Get unique recipe recommendations tailored to your preferences
- 📖 **Detailed Instructions**: Step-by-step cooking instructions with tips
- 📊 **Nutrition Information**: Calorie and macro information for each recipe
- ❤️ **Favorites**: Save your favorite recipes for quick access
- 🥗 **Dietary Preferences**: Support for vegetarian, vegan, and various dietary restrictions
- 💬 **Recipe Assistant**: Interactive chatbot to answer cooking questions
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Required: Groq API Key for AI recipe generation
GROQ_API_KEY=your_groq_api_key_here

# Optional: OpenAI API Key (fallback for chat feature)
OPENAI_API_KEY=your_openai_api_key_here
```

**How to get API keys:**

#### Groq API Key (Required)
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or log in to your account
3. Navigate to the API Keys section
4. Create a new API key
5. Copy and paste it into your `.env.local` file

#### OpenAI API Key (Optional)
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Go to the API Keys section
4. Create a new secret key
5. Copy and paste it into your `.env.local` file

**Important:**
- Never commit `.env.local` to version control
- Keep your API keys secure and private
- Without `GROQ_API_KEY`, recipe generation will not work
- The chat feature will use mock responses if no API keys are provided

### 3. Run the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. **Set Preferences**: Configure your dietary restrictions and taste preferences
2. **Select Ingredients**: Choose from filtered ingredients based on your preferences
3. **Generate Recipes**: Get personalized recipe suggestions
4. **View Details**: See detailed instructions, ingredients, and nutrition info
5. **Save Favorites**: Add recipes to your favorites for easy access later
6. **Ask Questions**: Use the recipe assistant chatbot for cooking help

## Tech Stack

### Frontend
- **Framework**: Next.js 16.0.0 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4.1.9
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **State Management**: React Hooks + LocalStorage
- **Form Handling**: React Hook Form + Zod validation
- **Notifications**: React Hot Toast & Sonner

### Backend & AI
- **AI Provider**: Groq SDK (LLaMA 3.3 70B Versatile)
- **Fallback AI**: OpenAI GPT-3.5 Turbo (optional)
- **API Routes**: Next.js API Routes
- **Runtime**: Node.js

### Development Tools
- **Package Manager**: npm/pnpm
- **Linting**: ESLint
- **PostCSS**: Tailwind CSS PostCSS plugin

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GROQ_API_KEY` | Groq API key for AI recipe generation | **Yes** | - |
| `OPENAI_API_KEY` | OpenAI API key (fallback for chat feature) | No | - |

**Notes:**
- Recipe generation requires `GROQ_API_KEY`
- Chat assistant will use Groq if available, fall back to OpenAI, or use mock responses
- All data is stored locally in the browser (localStorage)
- No backend database is required

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── chat/              # Recipe assistant chatbot endpoint
│   │   └── recipes/
│   │       ├── generate/      # Recipe generation endpoint
│   │       └── details/       # Recipe details endpoint
│   ├── recipe/[name]/         # Dynamic recipe detail page
│   ├── recipes/               # Recipe search page
│   ├── preferences/           # User preferences page
│   ├── favorites/             # Favorites page
│   └── about/                 # About page
├── components/
│   ├── ui/                    # UI component library
│   ├── chat/                  # Chatbot components
│   ├── preferences/           # Preference components
│   ├── ingredient-selector.tsx
│   ├── recipe-card.tsx
│   └── recipe-details-view.tsx
├── lib/
│   ├── favorites-store.ts     # Local storage for favorites
│   ├── preferences.ts         # Preferences management
│   └── utils.ts               # Utility functions
└── types/
    └── preferences.ts         # Type definitions
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Troubleshooting

### Recipe Generation Fails
- **Check**: Ensure `GROQ_API_KEY` is set in `.env.local`
- **Verify**: API key is valid and has available credits
- **Restart**: Development server after adding environment variables

### Chat Not Working
- **Check**: At least one API key (`GROQ_API_KEY` or `OPENAI_API_KEY`) is configured
- **Fallback**: App will use mock responses if no API keys are available

### Build Errors
- **TypeScript**: Run `npm run build` to check for type errors
- **Dependencies**: Delete `node_modules` and reinstall: `npm install`
- **Cache**: Delete `.next` folder and rebuild

### Styling Issues
- **Clear Cache**: Delete `.next` folder and rebuild
- **Tailwind**: Ensure `@import "tailwindcss";` is in `app/globals.css`

## Data Storage

- **Preferences**: Stored in browser's localStorage
- **Favorites**: Stored in browser's localStorage
- **No Backend Database**: All data is client-side only
- **Privacy**: No user data is sent to external servers except AI API calls

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard:
   - `GROQ_API_KEY`
   - `OPENAI_API_KEY` (optional)
4. Deploy

### Other Platforms
1. Build the project: `npm run build`
2. Set environment variables on your hosting platform
3. Deploy the `.next` folder and `public` directory
4. Ensure Node.js 18+ is available

## License

MIT