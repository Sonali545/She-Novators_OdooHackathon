
import { User, Skill, Availability, SwapRequest, SwapStatus } from './types';

export const SKILLS: Skill[] = [
  { id: '1', name: 'AI/ML' },
  { id: '2', name: 'Frontend Development' },
  { id: '3', name: 'Backend Development' },
  { id: '4', name: 'Cloud Computing' },
  { id: '5', name: 'UI/UX Design' },
  { id: '6', name: 'Project Management' },
  { id: '7', name: 'Data Science' },
  { id: '8', name: 'DevOps' },
  { id: '9', name: 'Cybersecurity' },
  { id: '10', name: 'Mobile Development' },
];

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    password: 'password123',
    location: 'Mumbai, India',
    profilePhotoUrl: 'https://picsum.photos/seed/priya/200',
    skillsOffered: [SKILLS[1], SKILLS[2]], // Frontend, Backend
    skillsWanted: [SKILLS[4], SKILLS[6]], // UI/UX Design, Data Science
    availability: Availability.Weekends,
    isProfilePublic: true,
    rating: 4.8,
    reviews: 18,
    feedback: [
      { id: 'fb-1', fromUserName: 'Rohan Gupta', fromUserPhotoUrl: 'https://picsum.photos/seed/rohan/100', rating: 5, comment: "Priya is an amazing developer. Learned so much!" },
      { id: 'fb-2', fromUserName: 'Anjali Singh', fromUserPhotoUrl: 'https://picsum.photos/seed/anjali/100', rating: 4, comment: "Great swap, very helpful with my frontend questions." }
    ]
  },
  {
    id: 'user-2',
    name: 'Rohan Gupta',
    email: 'rohan@example.com',
    password: 'password123',
    location: 'Delhi, India',
    profilePhotoUrl: 'https://picsum.photos/seed/rohan/200',
    skillsOffered: [SKILLS[0], SKILLS[6]], // AI/ML, Data Science
    skillsWanted: [SKILLS[3], SKILLS[7]], // Cloud Computing, DevOps
    availability: Availability.Evenings,
    isProfilePublic: true,
    rating: 4.9,
    reviews: 25,
    feedback: [
        { id: 'fb-3', fromUserName: 'Sanya Verma', fromUserPhotoUrl: 'https://picsum.photos/seed/sanya/100', rating: 5, comment: "Rohan's Python skills for ML are top-notch." }
    ]
  },
  {
    id: 'user-3',
    name: 'Anjali Singh',
    email: 'anjali@example.com',
    password: 'password123',
    location: 'Bangalore, India',
    profilePhotoUrl: 'https://picsum.photos/seed/anjali/200',
    skillsOffered: [SKILLS[4]], // UI/UX Design
    skillsWanted: [SKILLS[1], SKILLS[5]], // Frontend Dev, Project Management
    availability: Availability.Weekdays,
    isProfilePublic: true,
    rating: 4.5,
    reviews: 12,
    feedback: []
  },
  {
    id: 'user-4',
    name: 'Vikram Mehta',
    email: 'vikram@example.com',
    password: 'password123',
    location: 'Chennai, India',
    profilePhotoUrl: 'https://picsum.photos/seed/vikram/200',
    skillsOffered: [SKILLS[7], SKILLS[3]], // DevOps, Cloud Computing
    skillsWanted: [SKILLS[8], SKILLS[2]], // Cybersecurity, Backend Dev
    availability: Availability.Flexible,
    isProfilePublic: true,
    rating: 4.7,
    reviews: 22,
    feedback: [
      { id: 'fb-4', fromUserName: 'Aditi Rao', fromUserPhotoUrl: 'https://picsum.photos/seed/aditi/100', rating: 5, comment: "Fantastic CI/CD pipeline help from Vikram!" }
    ]
  },
  {
    id: 'user-5',
    name: 'Aditi Rao',
    email: 'aditi@example.com',
    password: 'password123',
    location: 'Hyderabad, India',
    profilePhotoUrl: 'https://picsum.photos/seed/aditi/200',
    skillsOffered: [SKILLS[9], SKILLS[8]], // Mobile Dev, Cybersecurity
    skillsWanted: [SKILLS[4], SKILLS[0]], // UI/UX Design, AI/ML
    availability: Availability.Weekends,
    isProfilePublic: true,
    rating: 4.6,
    reviews: 15,
    feedback: []
  },
];

const indianNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Saanvi", "Aadya", "Kiara", "Diya", "Pihu"];
const indianLocations = ["Ahmedabad", "Jaipur", "Lucknow", "Surat", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam"];

for (let i = 5; i < 20; i++) {
    const name = `${indianNames[i % indianNames.length]} Kumar`;
    MOCK_USERS.push({
        id: `user-${i+1}`,
        name: name,
        email: `${name.split(' ')[0].toLowerCase()}${i}@example.com`,
        password: 'password123',
        location: `${indianLocations[i % indianLocations.length]}, India`,
        profilePhotoUrl: `https://picsum.photos/seed/user${i}/200`,
        skillsOffered: [SKILLS[i % SKILLS.length], SKILLS[(i+1) % SKILLS.length]],
        skillsWanted: [SKILLS[(i+2) % SKILLS.length], SKILLS[(i+3) % SKILLS.length]],
        availability: Object.values(Availability)[i % 4],
        isProfilePublic: true,
        rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
        reviews: 5 + Math.floor(Math.random() * 20),
        feedback: [],
    });
}


export const MOCK_SWAP_REQUESTS: SwapRequest[] = [
  {
    id: 'req-1',
    fromUser: MOCK_USERS[1], // Rohan
    toUser: MOCK_USERS[0],   // Priya
    offeredSkill: MOCK_USERS[1].skillsOffered[0], // Rohan offers AI/ML
    wantedSkill: MOCK_USERS[0].skillsOffered[0], // Rohan wants Priya's Frontend
    message: "Hey Priya, I'd love to learn some frontend from you. I can help with your machine learning projects in return!",
    status: SwapStatus.Pending,
    createdAt: '2024-05-20T10:00:00Z',
  },
  {
    id: 'req-2',
    fromUser: MOCK_USERS[2], // Anjali
    toUser: MOCK_USERS[0],   // Priya
    offeredSkill: MOCK_USERS[2].skillsOffered[0], // Anjali offers UI/UX
    wantedSkill: MOCK_USERS[0].skillsOffered[0], // Anjali wants Priya's Frontend
    message: "Hi Priya, saw you offer Frontend dev. I'm an expert in UI/UX and would love to swap.",
    status: SwapStatus.Accepted,
    createdAt: '2024-05-18T14:30:00Z',
  },
   {
    id: 'req-3',
    fromUser: MOCK_USERS[3], // Vikram
    toUser: MOCK_USERS[4],   // Aditi
    offeredSkill: MOCK_USERS[3].skillsOffered[0], // Vikram offers DevOps
    wantedSkill: MOCK_USERS[4].skillsOffered[0], // Vikram wants Aditi's Mobile Dev
    message: "Hey Aditi, let's swap skills. My DevOps expertise for your Mobile Dev knowledge.",
    status: SwapStatus.Rejected,
    createdAt: '2024-05-19T09:00:00Z',
  },
  {
    id: 'req-4',
    fromUser: MOCK_USERS[4], // Aditi
    toUser: MOCK_USERS[1],   // Rohan
    offeredSkill: MOCK_USERS[4].skillsOffered[1], // Aditi offers Cybersecurity
    wantedSkill: MOCK_USERS[1].skillsOffered[1], // Aditi wants Rohan's Data Science
    message: "Rohan, your profile looks great. I can help you with security if you can show me the ropes on Data Science.",
    status: SwapStatus.Pending,
    createdAt: '2024-05-21T11:00:00Z',
  }
];

// --- DATA FOR CHART.JS ---
export const TOP_DEMAND_SKILLS_DATA = {
    labels: ['AI/ML', 'Data Science', 'Cloud Computing', 'Frontend Dev', 'Cybersecurity'],
    datasets: [{
        label: 'Demand Score',
        data: [95, 92, 88, 85, 80],
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
        borderRadius: 4,
    }, ],
};

export const SKILL_CATEGORY_DISTRIBUTION_DATA = {
    labels: ['Tech & Development', 'Design & Creative', 'Business & Management'],
    datasets: [{
        label: 'Job Opportunities',
        data: [65, 20, 15],
        backgroundColor: [
            'rgba(79, 70, 229, 0.9)',
            'rgba(5, 150, 105, 0.9)',
            'rgba(217, 119, 6, 0.9)',
        ],
        borderColor: '#121212',
        borderWidth: 3,
    }, ],
};