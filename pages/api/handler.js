import {getCashBalance, getHealth, updateBalance, updateHealth} from './manageDB';

export const handleCashReward = async (SuccessRate, userId) => {

    let rewardChances = [
        { points: 0, weight: 100 - SuccessRate }, // Less likely as inputValue increases
        { points: 1000, weight: SuccessRate >= 25 ? 30 : 0 }, // Guaranteed if inputValue >= 25
        { points: 2000, weight: SuccessRate >= 50 ? 40 : 20 }, // Guaranteed if inputValue >= 50
        { points: 5000, weight: SuccessRate } // Most likely as inputValue increases
    ];

    let reward = 0;
    let totalWeight = rewardChances.reduce((acc, curr) => acc + curr.weight, 0);
    let randomNum = Math.random() * totalWeight;

    for (let i = 0; i < rewardChances.length; i++) {
        if (randomNum < rewardChances[i].weight) {
            reward = rewardChances[i].points;
            break;
        }
        randomNum -= rewardChances[i].weight;
    }
    console.log(reward);
    const currentBalance = await getCashBalance(userId);
    const newBalance = currentBalance + reward;
    await updateBalance(userId, newBalance);
};

export const handleHealthDecrease = async (dangerRate, userId) => {  // Health decreased in steps based on dangerRate
    if (dangerRate > 0) {
        let healthDecrease = dangerRate > 70 ? 50 : dangerRate > 30 ? 20 : dangerRate > 15 ? 10 : 5;
        const currentHealth = await getHealth(userId);
        if (currentHealth <= 30) {
            throw new Error('Health too low, heal first!');
        }
        const newHealth = currentHealth - healthDecrease;
        await updateHealth(userId, newHealth);
    }
};