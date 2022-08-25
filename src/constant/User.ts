export interface UserProps {
  name: string;
  position?: string;
  username?: string;
  avatarUrl?: string;
  githubUsername?: string;
  email?: string;
  phone?: string;
  location?: string;
  resumeUrl?: string;
  resumeName?: string;
}

const User: UserProps = {
  name: 'Seeable Tarlac',
  position: '',
  username: '',
  avatarUrl: '',
  githubUsername: '',
  email: 'seeabletarlac@gmail.com',
  phone: '+63 9-------',
  location: 'Paniqui, Tarlac',
  resumeUrl: '',
  resumeName: '',
};

export default User;
