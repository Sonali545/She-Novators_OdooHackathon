
import React, { useState } from 'react';
import { Skill } from '../types';
import SkillTag from './SkillTag';

interface SkillEditorProps {
  title: string;
  skills: Skill[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
}

const SkillEditor: React.FC<SkillEditorProps> = ({ title, skills, onAdd, onRemove }) => {
    const [newSkill, setNewSkill] = useState('');
    
    const handleAdd = () => {
        if(newSkill.trim()) {
            onAdd(newSkill.trim());
            setNewSkill('');
        }
    }
    
    return (
        <div>
            <label className="block text-sm font-medium text-dark-text-secondary mb-2">{title}</label>
            <div className="space-y-2">
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={newSkill} 
                        onChange={(e) => setNewSkill(e.target.value)} 
                        onKeyPress={(e) => e.key === 'Enter' && handleAdd()} 
                        placeholder="Add a skill" 
                        className="w-full bg-secondary border border-dark-border rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary" 
                    />
                    <button 
                        type="button"
                        onClick={handleAdd} 
                        className="bg-primary hover:bg-primary-hover text-white font-bold p-2.5 rounded-lg flex-shrink-0"
                    >
                      +
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 min-h-[40px] bg-secondary rounded-lg p-2 border border-dark-border">
                    {skills.map(skill => (
                        <SkillTag 
                            key={skill.id} 
                            skillName={skill.name} 
                            onRemove={() => onRemove(skill.id)} 
                            className={title.includes("Offer") ? "bg-teal-600 text-white" : "bg-indigo-600 text-white"} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillEditor;
