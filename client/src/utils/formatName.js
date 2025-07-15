export const formatName = (fullName) => {
    if (!fullName || typeof fullName !== 'string') return "";
    const names = fullName.trim().split(" ");
    if (names.length === 1) {
        return names[0];
    } else {
        return `${names[0]} ${names[1][0]}.`;
    }
};