// src/utils/api.ts

export const fetchUsersAndProfiles = async () => {
    const usersUrl = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json';
    const profilesUrl = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json';

    const [usersResponse, profilesResponse] = await Promise.all([
        fetch(usersUrl),
        fetch(profilesUrl)
    ]);

    const users = await usersResponse.json();
    const profiles = await profilesResponse.json();

    return { users, profiles };
};
