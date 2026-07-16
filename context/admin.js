// context/admin.js

const isAdmin = (user) => {
    if (!user) {
        throw new Error("Authentication required");
    }

    if (user.role !== "admin") {
        throw new Error("Access denied. Admin only.");
    }

    return true;
};
export default isAdmin;