export type TTask = {
  id: string;
  description: string;
  completed: boolean;
};

export type TPhase = {
  id: string;
  title: string;
  tasks: TTask[];
  completed: boolean;
};
