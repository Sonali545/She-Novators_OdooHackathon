
import { User } from '../types';
import { MOCK_USERS } from '../constants';

const USERS_KEY = 'skillforge_users';

// --- Initialization ---
export const initUsers = (): void => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(MOCK_USERS));
  }
};

// --- Synchronous CRUD Operations ---

export const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

export const loginUser = (email: string, password: string): User | null => {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    // This is a simple password check for a demo. Do not use this in production.
    if (user && user.password === password) {
        // Return user data without the password
        const { password, ...userToReturn } = user;
        return userToReturn as User;
    }
    return null;
};

export const getUserById = (id: string): User | undefined => {
  const users = getUsers();
  return users.find(u => u.id === id);
};

export const addUser = (newUserData: Omit<User, 'id' | 'profilePhotoUrl'>): User => {
    const users = getUsers();
    const userExists = users.some(u => u.email.toLowerCase() === newUserData.email.toLowerCase());

    if (userExists) {
        throw new Error("An account with this email already exists.");
    }
    
    const user: User = {
        ...newUserData,
        id: `user-${Date.now()}`,
        profilePhotoUrl: `https://picsum.photos/seed/${newUserData.name.split(' ')[0]}/200`
    };

    const updatedUsers = [...users, user];
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    return user;
};

export const updateUserInStorage = (updatedUser: User): User => {
    let users = getUsers();
    const userIndex = users.findIndex(u => u.id === updatedUser.id);
    if (userIndex > -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return updatedUser;
    }
    throw new Error("User not found for update");
}

export const getActivityForUser = (userId: string): any[] => {
    // This is a placeholder as the backend is removed.
    console.log(`Fetching activity for ${userId}`);
    return []; 
};
