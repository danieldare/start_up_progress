import { TPhase } from 'types';
import { v4 as uuid } from 'uuid';

export const initialPhases: TPhase[] = [
  {
    completed: false,
    id: uuid(),
    title: 'Foundation  office',
    tasks: [
      {
        id: uuid(),
        completed: false,
        description: 'Setup virtual office',
      },
      {
        id: uuid(),
        completed: false,
        description: 'Set Mission & vision',
      },
      {
        id: uuid(),
        completed: false,
        description: 'Select business name',
      },
      {
        id: uuid(),
        completed: false,
        description: 'Buy domains',
      },
    ],
  },
  {
    completed: false,
    id: uuid(),
    title: 'Discovery',
    tasks: [
      {
        id: uuid(),
        completed: false,
        description: 'Create roadmap',
      },
      {
        id: uuid(),
        completed: false,
        description: 'Competitor analysis',
      },
    ],
  },
  {
    completed: false,
    id: uuid(),
    title: 'Delivery',
    tasks: [
      {
        id: uuid(),
        completed: false,
        description: 'Release marketing website',
      },
      {
        id: uuid(),
        completed: false,
        description: 'Release MVP',
      },
    ],
  },
];
