export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string[];
  techStack: string[];
  thumbnailUrl: string;
  images: string[];
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
  date: string;
  metrics?: { label: string; value: string }[];
  bgType?: 'network' | 'particles' | 'cloud';
}

export const projects: Project[] = [
  {
    id: "fraud-detection",
    title: "End-to-End Credit Card Fraud Detection System",
    shortDescription: "Machine learning system for detecting fraudulent credit card transactions using real-world datasets.",
    fullDescription: "Built a robust credit card fraud detection system using Python & Scikit-learn. Performed extensive data preprocessing including feature scaling and handled class imbalance using SMOTE. Compared multiple models, identifying XGBoost as the top performer. Visualized fraud patterns and transaction trends using Seaborn and Plotly.",
    category: ["Machine Learning", "Data Science"],
    techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "Seaborn", "Plotly"],
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    images: [],
    githubUrl: "https://github.com/ShivrajSingh07/End-to-End-Credit-Card-Fraud-Detection-System-",
    featured: true,
    date: "Jan 2026 - Feb 2026",
    bgType: "network"
  },
  {
    id: "villaura-booking",
    title: "Villaura – Airbnb-Style Booking Platform",
    shortDescription: "Full-stack property listing and booking platform leveraging Node.js and MongoDB.",
    fullDescription: "Developed a comprehensive property reservation system. Designed RESTful APIs for user authentication and booking management, implemented CRUD operations with Mongoose schema validation, and integrated a Map API for interactive property locations. Deployed publicly on Render.",
    category: ["Web Development", "Full Stack"],
    techStack: ["Node.js", "Express.js", "MongoDB", "EJS", "JavaScript", "Render"],
    thumbnailUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=600",
    images: [],
    githubUrl: "https://github.com/shivrajsingh07",
    featured: true,
    date: "Aug 2025",
    bgType: "cloud"
  },
  {
    id: "stock-market-ml",
    title: "Stock Market Prediction with ML",
    shortDescription: "Time series forecasting system predicting stock price changes using LSTMs and Random Forests.",
    fullDescription: "Designed a stock price prediction system utilizing deep learning on historical time series data. Conducted precise feature engineering incorporating technical indicators (RSI, MACD, moving averages). Analyzed performance via RMSE and MAE, projecting trends through interactive dashboards.",
    category: ["Deep Learning", "Time Series"],
    techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Plotly"],
    thumbnailUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600",
    images: [],
    githubUrl: "https://github.com/ShivrajSingh07/Stock-Market-Prediction-with-ML",
    featured: true,
    date: "Sep 2025 - Oct 2025",
    bgType: "particles"
  },
  {
    id: "gui-app-java",
    title: "GUI Application using Java Swing",
    shortDescription: "Modular and scalable Java Swing application created during Summer Training.",
    fullDescription: "Created modular and reusable Java Swing components improving UI structure. Utilized event-driven architecture using ActionListeners for dynamic tasks and real-time updates. Enhanced logic with automatic reindexing constraints.",
    category: ["Software Engineering", "Java"],
    techStack: ["Java", "Swing", "Git", "OOP"],
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    images: [],
    githubUrl: "#",
    featured: true,
    date: "Jun 2025 - Aug 2025",
    bgType: "network"
  }
];
