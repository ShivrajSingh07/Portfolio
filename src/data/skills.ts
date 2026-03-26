export interface Skill {
  name: string;
  category: "Languages" | "Data Science & ML" | "Web Development" | "Data Visualization" | "Database" | "Tools & Concepts";
  proficiency: number;
  icon?: string;
}

export const skills: Skill[] = [
  // Languages
  { name: 'Python', category: 'Languages', proficiency: 90 },
  { name: 'Java', category: 'Languages', proficiency: 85 },
  { name: 'JavaScript', category: 'Languages', proficiency: 80 },
  { name: 'SQL', category: 'Languages', proficiency: 80 },
  
  // Data Science & ML
  { name: 'Pandas', category: 'Data Science & ML', proficiency: 95 },
  { name: 'NumPy', category: 'Data Science & ML', proficiency: 90 },
  { name: 'Scikit-learn', category: 'Data Science & ML', proficiency: 85 },
  { name: 'TensorFlow', category: 'Data Science & ML', proficiency: 75 },
  { name: 'Keras', category: 'Data Science & ML', proficiency: 75 },
  
  // Data Visualization
  { name: 'Matplotlib', category: 'Data Visualization', proficiency: 90 },
  { name: 'Seaborn', category: 'Data Visualization', proficiency: 85 },
  { name: 'Plotly', category: 'Data Visualization', proficiency: 80 },
  { name: 'Tableau', category: 'Data Visualization', proficiency: 70 },
  
  // Web Development
  { name: 'React.js', category: 'Web Development', proficiency: 80 },
  { name: 'Next.js', category: 'Web Development', proficiency: 75 },
  { name: 'Node.js', category: 'Web Development', proficiency: 70 },
  { name: 'Express.js', category: 'Web Development', proficiency: 70 },
  { name: 'HTML/CSS', category: 'Web Development', proficiency: 90 },
  
  // Database
  { name: 'MongoDB', category: 'Database', proficiency: 80 },
  
  // Tools & Concepts
  { name: 'Git/GitHub', category: 'Tools & Concepts', proficiency: 90 },
  { name: 'DSA', category: 'Tools & Concepts', proficiency: 85 },
  { name: 'OOP', category: 'Tools & Concepts', proficiency: 85 },
  { name: 'Firebase', category: 'Tools & Concepts', proficiency: 70 }
];
