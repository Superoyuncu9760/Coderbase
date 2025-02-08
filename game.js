let money = 0;
let moneyPerSecond = 1;
let rebirth = 0;
let superRebirth = 0;
let upgrade1Cost = 10;
let upgrade2Cost = 50;
let rebirthCost = 100; // Rebirth için başlangıç maliyeti
let interval = 1000;

// Yeni eklenen değişkenler
let totalMoney = 0;
let totalRebirth = 0;
let totalSuperRebirth = 0;
let totalGameTime = 0; // saniye cinsinden

function updateMoney() {
    const moneyGained = moneyPerSecond * Math.pow(1.2, rebirth) * Math.pow(1.5, superRebirth);
    money += moneyGained;
    totalMoney += moneyGained;
    document.getElementById('money').textContent = money.toFixed(2);
    document.getElementById('totalMoney').textContent = totalMoney.toFixed(2);
    document.getElementById('rebirth').textContent = rebirth;
    document.getElementById('superRebirth').textContent = superRebirth;
}

let moneyInterval = setInterval(updateMoney, interval);

function buyUpgrade1() {
    if (money >= upgrade1Cost) {
        money -= upgrade1Cost;
        moneyPerSecond += 1;
        upgrade1Cost = Math.floor(upgrade1Cost * 1.1);
        document.getElementById('upgrade1Cost').textContent = upgrade1Cost;
        document.getElementById('moneyPerSecond').textContent = moneyPerSecond;
        gainXP(10); // XP kazanımı
    }
}

function buyUpgrade2() {
    if (money >= upgrade2Cost) {
        money -= upgrade2Cost;
        interval = Math.max(100, interval * 0.95);
        clearInterval(moneyInterval);
        moneyInterval = setInterval(updateMoney, interval);
        upgrade2Cost = Math.floor(upgrade2Cost * 1.2);
        document.getElementById('upgrade2Cost').textContent = upgrade2Cost;
        gainXP(20); // XP kazanımı
    }
}

function rebirthUpgrade() {
    if (money >= rebirthCost) {
        money = 0; // Para miktarını sıfırla
        moneyPerSecond = 1;
        interval = 1000;
        rebirth += 1;
        totalRebirth += 1;

        // Yükseltme fiyatlarını sıfırla ve rebirth maliyetini artır
        upgrade1Cost = 10;
        upgrade2Cost = 50;
        rebirthCost = Math.floor(rebirthCost * 1.3);

        // HTML'de güncellenmiş fiyatları göster
        document.getElementById('upgrade1Cost').textContent = upgrade1Cost;
        document.getElementById('upgrade2Cost').textContent = upgrade2Cost;
        document.getElementById('rebirthCost').textContent = rebirthCost; // Burayı güncelle
        document.getElementById('totalRebirth').textContent = totalRebirth;
        document.getElementById('money').textContent = money.toFixed(2); // Para miktarını güncelle
        
        clearInterval(moneyInterval);
        moneyInterval = setInterval(updateMoney, interval);
    }
}

function superRebirthUpgrade() {
    if (rebirth >= 10) {
        money = 0;
        moneyPerSecond = 1;
        interval = 1000;
        rebirth = 0;
        superRebirth += 1;
        totalSuperRebirth += 1;
        document.getElementById('totalSuperRebirth').textContent = totalSuperRebirth;
        clearInterval(moneyInterval);
        moneyInterval = setInterval(updateMoney, interval);
    }
}

function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('light-mode')) {
        body.className = 'dark-mode';
    } else if (body.classList.contains('dark-mode')) {
        body.className = 'black-mode';
    } else {
        body.className = 'light-mode';
    }
}

function saveGame() {
    const gameData = {
        money: money,
        moneyPerSecond: moneyPerSecond,
        rebirth: rebirth,
        superRebirth: superRebirth,
        upgrade1Cost: upgrade1Cost,
        upgrade2Cost: upgrade2Cost,
        rebirthCost: rebirthCost,
        interval: interval,
        totalMoney: totalMoney,
        totalRebirth: totalRebirth,
        totalSuperRebirth: totalSuperRebirth,
        totalGameTime: totalGameTime
    };
    localStorage.setItem('idleGameSave', JSON.stringify(gameData));
}

function loadGame() {
    const savedGame = JSON.parse(localStorage.getItem('idleGameSave'));
    if (savedGame) {
        money = savedGame.money;
        moneyPerSecond = savedGame.moneyPerSecond;
        rebirth = savedGame.rebirth;
        superRebirth = savedGame.superRebirth;
        upgrade1Cost = savedGame.upgrade1Cost;
        upgrade2Cost = savedGame.upgrade2Cost;
        rebirthCost = savedGame.rebirthCost;
        interval = savedGame.interval;
        totalMoney = savedGame.totalMoney;
        totalRebirth = savedGame.totalRebirth;
        totalSuperRebirth = savedGame.totalSuperRebirth;
        totalGameTime = savedGame.totalGameTime;

        document.getElementById('money').textContent = money.toFixed(2);
        document.getElementById('rebirth').textContent = rebirth;
        document.getElementById('superRebirth').textContent = superRebirth;
        document.getElementById('upgrade1Cost').textContent = upgrade1Cost;
        document.getElementById('upgrade2Cost').textContent = upgrade2Cost;
        document.getElementById('rebirthCost').textContent = rebirthCost;
        document.getElementById('moneyPerSecond').textContent = moneyPerSecond;
        document.getElementById('totalMoney').textContent = totalMoney.toFixed(2);
        document.getElementById('totalRebirth').textContent = totalRebirth;
        document.getElementById('totalSuperRebirth').textContent = totalSuperRebirth;
        document.getElementById('totalGameTime').textContent = totalGameTime;

        clearInterval(moneyInterval);
        moneyInterval = setInterval(updateMoney, interval);
    }
}

function resetProgress() {
    document.getElementById('resetConfirm').style.display = 'block';
}

function cancelReset() {
    document.getElementById('resetConfirm').style.display = 'none';
}

function confirmReset() {
    localStorage.removeItem('idleGameSave');
    location.reload();
}

setInterval(saveGame, 15000);
window.onload = loadGame;

setInterval(() => {
    totalGameTime++;
    document.getElementById('totalGameTime').textContent = totalGameTime;
}, 1000);

// Seviye ve XP sistemi
let xp = 0;
let level = 1;

function gainXP(amount) {
    xp += amount;
    if (xp >= level * 100) {
        xp -= level * 100;
        level++;
        console.log(`Seviye atladınız! Yeni seviyeniz: ${level}`);
    }
}nasılsın 
