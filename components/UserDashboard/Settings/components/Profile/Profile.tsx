// components/PayoutForm.tsx
import React from 'react';
import styles from './Profile.module.scss';
import { PersonalInfoForm, SocialForm } from './components';

const Profile: React.FC = () => {

  return (
    <div className={styles.container}>
      <PersonalInfoForm />
      <SocialForm />
    </div>
  );
};

export default Profile;
