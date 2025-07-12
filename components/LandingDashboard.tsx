import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { TOP_DEMAND_SKILLS_DATA, SKILL_CATEGORY_DISTRIBUTION_DATA, MOCK_USERS } from '../constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.274-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.274.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const SkillsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: number | string }> = ({ icon, label, value }) => (
    <div className="bg-dark-card border border-dark-border rounded-lg p-5 flex items-center gap-4 flex-1 min-w-[180px]">
        {icon}
        <div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-dark-text-secondary text-sm">{label}</p>
        </div>
    </div>
);


const LandingDashboard: React.FC = () => {
    
    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Top In-Demand Skills',
                color: '#e5e7eb',
                font: { size: 16, weight: 'bold' }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: '#9ca3af' },
                grid: { color: 'rgba(39, 39, 42, 0.5)' } // dark-border equivalent
            },
            x: {
                ticks: { color: '#9ca3af' },
                grid: { color: 'transparent' }
            },
        },
    };

    const doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
                labels: {
                    color: '#9ca3af',
                    font: { size: 12 },
                    boxWidth: 20
                }
            },
            title: {
                display: true,
                text: 'Opportunities by Category',
                color: '#e5e7eb',
                font: { size: 16, weight: 'bold' }
            },
        },
    };

    const uniqueSkills = new Set(MOCK_USERS.flatMap(u => [...u.skillsOffered, ...u.skillsWanted]).map(s => s.name));

    return (
        <div className="bg-dark-card border border-dark-border rounded-xl shadow-2xl p-6 space-y-8">
            <div className="flex flex-wrap gap-4">
                <StatCard icon={<UsersIcon />} label="Active Members" value={MOCK_USERS.length} />
                <StatCard icon={<SkillsIcon />} label="Unique Skills" value={uniqueSkills.size} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8" style={{minHeight: '300px'}}>
                <div className="lg:col-span-3 bg-secondary p-4 rounded-lg border border-dark-border">
                    <Bar options={barChartOptions} data={TOP_DEMAND_SKILLS_DATA} />
                </div>
                <div className="lg:col-span-2 bg-secondary p-4 rounded-lg border border-dark-border">
                    <Doughnut options={doughnutChartOptions} data={SKILL_CATEGORY_DISTRIBUTION_DATA} />
                </div>
            </div>
        </div>
    );
}

export default LandingDashboard;
