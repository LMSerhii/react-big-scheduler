// Спочатку створюємо ресурси, оскільки вони потрібні для команди проекту
export const mockResources = [
  {
    id: "1",
    name: "John Doe",
    role: "Developer",
    availableHours: 160,
    allocatedHours: 120,
    skills: ["React", "TypeScript", "Node.js"]
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Designer",
    availableHours: 160,
    allocatedHours: 80,
    skills: ["UI/UX", "Figma", "Adobe XD"]
  },
  {
    id: "3",
    name: "Mike Johnson",
    role: "Developer",
    availableHours: 160,
    allocatedHours: 140,
    skills: ["React", "Python", "AWS"]
  }
];

export const mockProjects = [
  {
    id: "1",
    name: "Project A",
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
    deadline: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    totalHours: 500,
    allocatedHours: 200,
    team: [mockResources[0], mockResources[1]], // Використовуємо реальні об'єкти Resource
    requiredRoles: [
      {
        role: "Developer",
        count: 2,
        hours: 300
      },
      {
        role: "Designer",
        count: 1,
        hours: 200
      }
    ]
  },
  {
    id: "2",
    name: "Project B",
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    deadline: new Date(new Date().setMonth(new Date().getMonth() + 2)),
    totalHours: 300,
    allocatedHours: 150,
    team: [mockResources[1], mockResources[2]],
    requiredRoles: [
      {
        role: "Developer",
        count: 1,
        hours: 160
      },
      {
        role: "Designer",
        count: 1,
        hours: 140
      }
    ]
  }
];

export const mockEvents = [
  {
    id: "1",
    resourceId: "1",
    projectId: "1",
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 5)),
    hoursPerDay: 8,
    totalHours: 40, // 5 днів * 8 годин
    title: "Frontend Development",
    bgColor: "#1976d2"
  },
  {
    id: "2",
    resourceId: "2",
    projectId: "1",
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 3)),
    hoursPerDay: 6,
    totalHours: 18, // 3 дні * 6 годин
    title: "UI Design",
    bgColor: "#388e3c"
  },
  {
    id: "3",
    resourceId: "3",
    projectId: "2",
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 4)),
    hoursPerDay: 8,
    totalHours: 32, // 4 дні * 8 годин
    title: "Backend Integration",
    bgColor: "#e64a19"
  }
];
