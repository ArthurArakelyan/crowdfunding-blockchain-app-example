import React, { useContext, createContext, FC, PropsWithChildren, useMemo } from 'react';

import { useSendTransaction, useReadContract, useActiveAccount } from 'thirdweb/react';
import { prepareContractCall, resolveMethod } from 'thirdweb';
import { ethers } from 'ethers';
import { contract } from '../client';

const StateContext = createContext<any>({});

export const useStateContext = () => useContext(StateContext);

export const StateContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const activeAccount = useActiveAccount();
  const { mutate: sendTransaction, isPending: sendTransactionsLoading } = useSendTransaction();

  const { data: campaigns, isLoading: campaignsLoading } = useReadContract({
    contract: contract,
    // @ts-ignore
    method: resolveMethod('getCampaigns'),
    params: [],
  });

  const parsedCampaigns = useMemo(() => {
    if (!campaigns) {
      return [];
    }

    return (campaigns as any[]).map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.formatEther(campaign.target.toString()),
      deadline: +campaign.deadline.toString(),
      amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i,
    }));
  }, [campaigns]);

  const userCampaigns = useMemo(() => {
    if (!parsedCampaigns.length || !activeAccount) {
      return [];
    }

    return parsedCampaigns.filter((campaign) => campaign.owner === activeAccount.address);
  }, [campaigns]);

  const publishCampaign = async (form: any) => {
    try {
      if (!activeAccount) {
        return alert('Please connect your wallet');
      }

      await sendTransaction(await prepareContractCall({
        contract,
        method: resolveMethod('createCampaign'),
        params: [
          activeAccount.address, // owner
          form.title, // title
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(), // deadline,
          form.image,
        ],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const donateToCampaign = async (pId: number, amount: string) => {
    try {
      if (!activeAccount) {
        return alert('Please connect your wallet');
      }

      await sendTransaction(await prepareContractCall({
        contract,
        method: resolveMethod('donateToCampaign'),
        value: ethers.parseUnits(amount, 18),
        params: [pId],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        createCampaign: publishCampaign,
        donateToCampaign,
        sendTransactionsLoading,
        campaigns: parsedCampaigns,
        campaignsLoading,
        userCampaigns,
        address: activeAccount?.address,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
