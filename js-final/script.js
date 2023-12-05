// script.js
let wood = 0;
let stone = 0;
let pickaxeLevel = 0; // 0 for Basic, 1 for Advanced, 2 for Expert
let axeLevel = 0;
let pickaxeUpgradeCost = { wood: 5, stone: 5 }; // initial upgrade cost
let axeUpgradeCost = { wood: 5, stone: 5 };
let craftedNumber = '';
let isMiningInProgress = false;
let isWoodcuttingInProgress = false;

const digitCosts = {

    // Each digit has a different cost in wood and stone
    '0': { wood: 2, stone: 1 },
    '1': { wood: 1, stone: 2 },
    '2': { wood: 2, stone: 2 },
    '3': { wood: 1, stone: 2 },
    '4': { wood: 2, stone: 1 },
    '5': { wood: 1, stone: 1 },
    '6': { wood: 2, stone: 1 },
    '7': { wood: 2, stone: 2 },
    '8': { wood: 2, stone: 1 },
    '9': { wood: 2, stone: 2 },
    
};

window.onload = function() {
    initializeDigits();
    updateUpgradeTooltip('pickaxe');
    updateUpgradeTooltip('axe');
};

function gatherResource(resourceType) {
    let isInProgress = resourceType === 'wood' ? isWoodcuttingInProgress : isMiningInProgress;
    if (isInProgress) {
        alert("Action already in progress!");
        return;
    }

    let gatheringTime = resourceType === 'wood' ? getChoppingTime() : getMiningTime();
    let loadingBar = document.createElement('div');
    loadingBar.id = 'loadingBar';
    document.getElementById(resourceType === 'wood' ? 'woodcuttingArea' : 'miningArea').appendChild(loadingBar);

    // Start loading bar animation
    setTimeout(function() {
        loadingBar.style.width = '100%';
    }, 10); // slight delay to ensure the animation starts

    // Set the action as in progress
    if (resourceType === 'wood') {
        isWoodcuttingInProgress = true;
    } else {
        isMiningInProgress = true;
    }

    // Complete the action
    setTimeout(function() {
        if (resourceType === 'wood') {
            wood++;
            isWoodcuttingInProgress = false;
        } else {
            stone++;
            isMiningInProgress = false;
        }
        loadingBar.remove();
        updateDisplay();
    }, gatheringTime);
}

function getMiningTime() {
    // Time decreases with higher level pickaxes
    return 3000 / (pickaxeLevel + 1); 
}

function getChoppingTime() {
    // Time decreases with higher level axes
    return 3000 / (axeLevel + 1);
}

function upgradeTool(tool) {
    let cost = tool === 'pickaxe' ? pickaxeUpgradeCost : axeUpgradeCost;
    let level = tool === 'pickaxe' ? pickaxeLevel : axeLevel;

    if (wood >= cost.wood && stone >= cost.stone && level < 2) {
        wood -= cost.wood;
        stone -= cost.stone;
        cost.wood *= 2; // Double the upgrade cost for next time
        cost.stone *= 2;

        if (tool === 'pickaxe') {
            pickaxeLevel++;
            updateToolDisplay('pickaxe', pickaxeLevel);
        } else {
            axeLevel++;
            updateToolDisplay('axe', axeLevel);
        }

        if ((tool === 'pickaxe' && pickaxeLevel === 2) || (tool === 'axe' && axeLevel === 2)) {
            document.getElementById(`upgrade${tool.charAt(0).toUpperCase() + tool.slice(1)}`).style.display = 'none';
        }

        updateDisplay();
        updateUpgradeTooltip(tool);
    } else if (level >= 2) {
        alert('Tool is already at maximum level!');
    } else {
        alert('Not enough resources for upgrade!');
    }
}

function updateToolDisplay(tool, level) {
    let levelNames = ['Basic', 'Advanced', 'Expert'];
    let toolTextElement = document.getElementById(tool);
    
    // Update only the text
    toolTextElement.childNodes[0].nodeValue = `${tool.charAt(0).toUpperCase() + tool.slice(1)}: ${levelNames[level]} `;

    // Update tooltip after upgrade
    updateUpgradeTooltip(tool);
}

function updateUpgradeTooltip(tool) {
    let cost = tool === 'pickaxe' ? pickaxeUpgradeCost : axeUpgradeCost;
    let upgradeContainer = document.querySelector(`#${tool} .upgradeContainer`);
    upgradeContainer.setAttribute('data-tooltip', `Upgrade Cost - Wood: ${cost.wood}, Stone: ${cost.stone}`);
}

function updateDisplay() {
    document.getElementById('wood').innerText = `Wood: ${wood}`;
    document.getElementById('stone').innerText = `Stone: ${stone}`;
    document.getElementById('craftedNumber').innerText = `Crafted Number: ${craftedNumber}`;
}

function craftDigit(digit) {
    let cost = digitCosts[digit];
    if (wood >= cost.wood && stone >= cost.stone) {
        wood -= cost.wood;
        stone -= cost.stone;
        craftedNumber += digit;

        // Increase the cost for the next crafting of this digit
        digitCosts[digit].wood++;
        digitCosts[digit].stone++;

        updateDisplay();
        updateDigitButtons(); // Update button texts
    } else {
        alert('Not enough resources!');
    }
}

function updateDigitButtons() {
    let digitButtons = document.getElementsByClassName('digitButton');
    for (let button of digitButtons) {
        let digit = button.getAttribute('data-digit');
        let cost = digitCosts[digit];
        button.innerText = `Craft ${digit}`;
        button.setAttribute('data-tooltip', `Costs - Wood: ${cost.wood}, Stone: ${cost.stone}`);
    }
}

function initializeDigits() {
    let digitsContainer = document.getElementById('digits');
    for (let digit in digitCosts) {
        let button = document.createElement('button');
        button.setAttribute('data-digit', digit); // Add a data attribute
        button.className = 'digitButton';
        button.onclick = function() { craftDigit(digit); };
        digitsContainer.appendChild(button);
    }
    updateDigitButtons(); // Set initial button texts
}

function submitCraftedNumber() {
    // Check if a number has been crafted
    if (craftedNumber.length === 0) {
        alert("You haven't crafted any number yet!");
        return;
    }

    // Display the congratulatory message
    alert(`Congratulations! You've crafted the number: ${craftedNumber}`);

    // Clear the crafted number
    craftedNumber = '';

    // Update the display
    updateDisplay();
}

