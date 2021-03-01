import { useQuery } from 'react-query';
import { ApiUser, ApiError } from '../../utils/api';
import { useMemo } from 'react';
import { RoomInfo } from '../../types/api';
import { useQueryCache } from 'react-query';
import { Updater } from 'react-query/types/core/utils';

type ProfileData = { profile?: { user: ApiUser; rooms: { member: RoomInfo[]; owned: RoomInfo[] } } };

export function useCurrentUserProfile() {
  const result = useQuery<ProfileData, ApiError>('/user_profile');
  const cache = useQueryCache();

  return useMemo(() => {
    const { data, isLoading, ...rest } = result;
    const profile = data?.profile;
    // provide an updater function to optimistically set user data
    const update = (updater: Updater<ProfileData | undefined, ProfileData>) =>
      cache.setQueryData<ProfileData>('/user_profile', updater);
    return { profile: profile, user: profile?.user, isLoading, update, ...rest };
  }, [result, cache]);
}
