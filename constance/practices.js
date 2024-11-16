//level : Low, Medium, High
const practices = [
    {
        name: "Eye",
        description: "Take a break to relax your eyes.",
        emoji: "👁️", // Eye emoji
        color: "#009c41",
        time: 24,
        timeOut: 5,
        status: true,
        level: "high"
    },
    {
        name: "Drinking Water",
        description: "Stay hydrated by drinking water.",
        emoji: "💧", // Water droplet emoji
        color: "#007f9c",
        time: 60,
        timeOut: 5,
        status: true,
        level: "medium"
    },
    {
        name: "Walking",
        description: "Get up and stretch your legs.",
        emoji: "🚶", // Person walking emoji
        color: "#bd6500",
        time: 10,
        timeOut: 5,
        status: true,
        level: "low"
    }
];

module.exports = { practices };
