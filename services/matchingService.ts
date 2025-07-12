import { User, MatchSuggestion } from '../types';

/**
 * Calculates a match score between the current user and another user.
 *
 * Scoring breakdown:
 * - 50 points if the other user offers a skill the current user wants.
 * - 30 points if the current user offers a skill the other user wants.
 * - 20 points if their availability matches.
 * Max score is 100.
 */
export const getMatchSuggestions = (currentUser: User, allUsers: User[]): MatchSuggestion[] => {
  if (!currentUser) return [];

  const otherUsers = allUsers.filter(u => u.id !== currentUser.id);
  const suggestions: MatchSuggestion[] = [];

  for (const otherUser of otherUsers) {
    let score = 0;
    const reasons: string[] = [];

    // Check if they offer something the current user wants
    const offeredMatch = otherUser.skillsOffered.find(offeredSkill => 
      currentUser.skillsWanted.some(wantedSkill => wantedSkill.id === offeredSkill.id)
    );
    if (offeredMatch) {
      score += 50;
      reasons.push(`Offers '${offeredMatch.name}'`);
    }
    
    // Check if the current user offers something they want
    const wantedMatch = currentUser.skillsOffered.find(offeredSkill =>
      otherUser.skillsWanted.some(wantedSkill => wantedSkill.id === offeredSkill.id)
    );
    if (wantedMatch) {
      score += 30;
       // Add reason only if it's not a direct part of the offered match to avoid redundancy
      if (!reasons.find(r => r.includes(wantedMatch.name))) {
          reasons.push(`Wants '${wantedMatch.name}'`);
      }
    }
    
    // Check for availability match
    if (currentUser.availability === otherUser.availability) {
      score += 20;
      reasons.push(`Same availability`);
    }

    if (score > 0) {
      suggestions.push({
        user: otherUser,
        score: Math.min(score, 100), // Cap at 100
        reason: reasons.join(' · '),
      });
    }
  }

  // Sort by score descending
  return suggestions.sort((a, b) => b.score - a.score);
};
