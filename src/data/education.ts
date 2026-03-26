export interface Education {
  id: string;
  degree: string;
  institution: string;
  date: string;
  gpa: number;
  maxGpa: number;
  courses: string[];
  achievements: string;
}

export const education: Education[] = [
  {
    id: "lpu-btech",
    degree: "B.Tech Computer Science and Engineering (DSML)",
    institution: "Lovely Professional University, Punjab, India",
    date: "2023 - Present",
    gpa: 7.1,
    maxGpa: 10.0,
    courses: ["Data Structures & Algorithms", "Object-Oriented Programming", "Machine Learning", "Database Systems"],
    achievements: "Specializing in Data Science and Machine Learning path."
  },
  {
    id: "kv2-senior",
    degree: "Senior Secondary",
    institution: "Kendriya Vidyalaya No.2, Jaipur, Rajasthan",
    date: "Apr 2021 - Jun 2022",
    gpa: 66,
    maxGpa: 100,
    courses: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
    achievements: "Completed 12th Grade"
  },
  {
    id: "kv2-secondary",
    degree: "Secondary",
    institution: "Kendriya Vidyalaya No.2, Jaipur, Rajasthan",
    date: "2019 - 2020",
    gpa: 77,
    maxGpa: 100,
    courses: ["Science", "Mathematics"],
    achievements: "Completed 10th Grade"
  }
];
