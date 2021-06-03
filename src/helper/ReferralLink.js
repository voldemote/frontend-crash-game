export const generateReferralLink = (userId) => {
    return `${window.location.origin.toString()}/?ref=${userId}`;
};
