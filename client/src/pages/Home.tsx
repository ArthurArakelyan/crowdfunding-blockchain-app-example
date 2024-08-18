import React from 'react';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const Home = () => {
  const { campaigns, campaignsLoading } = useStateContext();

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={campaignsLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;