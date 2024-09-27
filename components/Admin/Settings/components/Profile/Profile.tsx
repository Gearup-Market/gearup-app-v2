// components/PayoutForm.tsx
import React from 'react';
import styles from './Profile.module.scss';
import { PersonalInfoForm } from './components';

const Profile: React.FC = () => {

  return (
    <div className={styles.container}>
      <PersonalInfoForm />
    </div>
  );
};

export default Profile;
