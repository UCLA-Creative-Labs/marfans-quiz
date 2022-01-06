export interface Question {
  question: string;
  answers: Answer[];
}

export interface Answer {
  answer: string;
  projects: string[];
}

export interface ProjectScores {
  [project: string]: number
}
