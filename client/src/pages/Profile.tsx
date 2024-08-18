import React from 'react';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const Profile = () => {
  const { userCampaigns, campaignsLoading } = useStateContext();

  return (
    <DisplayCampaigns
      title="My Campaigns"
      isLoading={campaignsLoading}
      campaigns={userCampaigns}
    />
  );
};

export default Profile;