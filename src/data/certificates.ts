export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl: string;
  imageUrl?: string;
}

export const certificates: Certificate[] = [
  {
    id: "aws-cloud-essentials",
    title: "AWS Cloud Technical Essentials",
    issuer: "Coursera",
    date: "Feb 2026",
    credentialId: "AWS-101",
    credentialUrl: "https://coursera.org/share/a4987d80e03ab23df2859a8c5061839e"
  },
  {
    id: "python-development",
    title: "Python Development",
    issuer: "CSE Pathshala",
    date: "Jun 2024",
    credentialId: "PY-02",
    credentialUrl: "https://drive.google.com/file/d/1edXUudX-4J1BvmaKhAHFvp9I_I57qUfX/view?usp=sharing"
  },
  {
    id: "web-design",
    title: "Web Design",
    issuer: "FreeCodeCamp",
    date: "Sep 2023",
    credentialId: "WD-03",
    credentialUrl: "https://www.freecodecamp.org/certification/fcc1934357c-3e19-40eb-af00-245f3ec2daf3/responsive-web-design"
  }
];
