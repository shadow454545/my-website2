document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const zodiacForm = document.getElementById('zodiac-form');
    const birthYearInput = document.getElementById('birth-year');
    const resultsContainer = document.getElementById('zodiac-results');
    const zodiacIconElement = document.getElementById('zodiac-icon');
    const zodiacSignElement = document.getElementById('zodiac-sign');
    const zodiacElementElement = document.getElementById('zodiac-element');
    const mostCompatibleElement = document.getElementById('most-compatible');
    const leastCompatibleElement = document.getElementById('least-compatible');
    const luckyNumbersElement = document.getElementById('lucky-numbers');
    const luckyColorsElement = document.getElementById('lucky-colors');
    const zodiacFortuneElement = document.getElementById('zodiac-fortune');
    const zodiacHistoryElement = document.getElementById('zodiac-history');
    
    // Chinese Zodiac Data
    const zodiacSigns = [
        { name: "Rat", icon: "🐀", years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020] },
        { name: "Ox", icon: "🐂", years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021] },
        { name: "Tiger", icon: "🐅", years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022] },
        { name: "Rabbit", icon: "🐇", years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023] },
        { name: "Dragon", icon: "🐉", years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024] },
        { name: "Snake", icon: "🐍", years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025] },
        { name: "Horse", icon: "🐎", years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026] },
        { name: "Goat", icon: "🐐", years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027] },
        { name: "Monkey", icon: "🐒", years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028] },
        { name: "Rooster", icon: "🐓", years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029] },
        { name: "Dog", icon: "🐕", years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030] },
        { name: "Pig", icon: "🐖", years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031] }
    ];
    
    // Five Elements Data (based on the last digit of the year)
    const fiveElements = [
        { name: "Metal", years: [0, 1], description: "People born in Metal years are strong, determined, and self-reliant." },
        { name: "Water", years: [2, 3], description: "People born in Water years are adaptable, flexible, and good communicators." },
        { name: "Wood", years: [4, 5], description: "People born in Wood years are creative, idealistic, and cooperative." },
        { name: "Fire", years: [6, 7], description: "People born in Fire years are passionate, dynamic, and adventurous." },
        { name: "Earth", years: [8, 9], description: "People born in Earth years are practical, reliable, and hardworking." }
    ];
    
    // Compatibility Data
    const compatibilityData = {
        "Rat": {
            mostCompatible: ["Dragon", "Monkey", "Ox"],
            leastCompatible: ["Horse", "Goat", "Rabbit"]
        },
        "Ox": {
            mostCompatible: ["Snake", "Rooster", "Rat"],
            leastCompatible: ["Goat", "Horse", "Dog"]
        },
        "Tiger": {
            mostCompatible: ["Horse", "Dog", "Pig"],
            leastCompatible: ["Monkey", "Snake", "Tiger"]
        },
        "Rabbit": {
            mostCompatible: ["Goat", "Pig", "Dog"],
            leastCompatible: ["Rooster", "Dragon", "Rat"]
        },
        "Dragon": {
            mostCompatible: ["Rat", "Monkey", "Rooster"],
            leastCompatible: ["Dog", "Rabbit", "Dragon"]
        },
        "Snake": {
            mostCompatible: ["Ox", "Rooster", "Monkey"],
            leastCompatible: ["Pig", "Tiger", "Snake"]
        },
        "Horse": {
            mostCompatible: ["Tiger", "Dog", "Goat"],
            leastCompatible: ["Rat", "Ox", "Horse"]
        },
        "Goat": {
            mostCompatible: ["Rabbit", "Horse", "Pig"],
            leastCompatible: ["Ox", "Dog", "Rat"]
        },
        "Monkey": {
            mostCompatible: ["Rat", "Dragon", "Snake"],
            leastCompatible: ["Tiger", "Pig", "Monkey"]
        },
        "Rooster": {
            mostCompatible: ["Ox", "Snake", "Dragon"],
            leastCompatible: ["Rabbit", "Dog", "Rooster"]
        },
        "Dog": {
            mostCompatible: ["Tiger", "Rabbit", "Horse"],
            leastCompatible: ["Dragon", "Ox", "Goat"]
        },
        "Pig": {
            mostCompatible: ["Tiger", "Rabbit", "Goat"],
            leastCompatible: ["Snake", "Monkey", "Pig"]
        }
    };
    
    // Lucky Elements Data
    const luckyElementsData = {
        "Rat": {
            numbers: [2, 3],
            colors: ["Blue", "Gold", "Green"]
        },
        "Ox": {
            numbers: [1, 9],
            colors: ["White", "Yellow", "Green"]
        },
        "Tiger": {
            numbers: [1, 3, 4],
            colors: ["Blue", "Gray", "Orange"]
        },
        "Rabbit": {
            numbers: [3, 4, 6],
            colors: ["Red", "Pink", "Purple", "Blue"]
        },
        "Dragon": {
            numbers: [1, 6, 7],
            colors: ["Gold", "Silver", "Gray"]
        },
        "Snake": {
            numbers: [2, 8, 9],
            colors: ["Red", "Yellow", "Black"]
        },
        "Horse": {
            numbers: [2, 3, 7],
            colors: ["Yellow", "Green", "Brown"]
        },
        "Goat": {
            numbers: [2, 7],
            colors: ["Brown", "Red", "Purple"]
        },
        "Monkey": {
            numbers: [4, 9],
            colors: ["White", "Blue", "Gold"]
        },
        "Rooster": {
            numbers: [5, 7, 8],
            colors: ["Gold", "Brown", "Yellow"]
        },
        "Dog": {
            numbers: [3, 4, 9],
            colors: ["Green", "Red", "Purple"]
        },
        "Pig": {
            numbers: [2, 5, 8],
            colors: ["Yellow", "Gray", "Brown", "Gold"]
        }
    };
    
    // Historical Insights Data
    const historicalInsightsData = {
        "Rat": "The Rat is the first animal in the Chinese zodiac and symbolizes wealth, adaptability, and charm. In Chinese culture, people born in the Year of the Rat are considered quick-witted and resourceful. According to legend, the Rat won the race to determine the zodiac order by riding on the Ox's back and jumping ahead at the last moment.",
        "Ox": "The Ox is the second animal in the Chinese zodiac and symbolizes diligence, persistence, and honesty. In Chinese culture, the Ox represents hard work and reliability. According to legend, the Ox would have been first in the zodiac race, but the Rat tricked it by riding on its back and jumping ahead at the finish line.",
        "Tiger": "The Tiger is the third animal in the Chinese zodiac and symbolizes courage, leadership, and ambition. In Chinese culture, the Tiger is considered the king of all beasts and represents power and fearlessness. People born in Tiger years are thought to be brave, competitive, and confident.",
        "Rabbit": "The Rabbit is the fourth animal in the Chinese zodiac and symbolizes elegance, mercy, and good luck. In Chinese culture, the Rabbit represents the moon and is associated with longevity, peace, and prosperity. According to legend, the Jade Emperor was impressed by the Rabbit's kindness and graceful jumping ability.",
        "Dragon": "The Dragon is the fifth animal in the Chinese zodiac and the only mythical creature among the twelve signs. It symbolizes power, nobility, and good fortune. In Chinese culture, the Dragon is highly revered and represents imperial authority. People born in Dragon years are considered to be natural leaders with strength and good luck.",
        "Snake": "The Snake is the sixth animal in the Chinese zodiac and symbolizes wisdom, mystery, and divination. In Chinese culture, the Snake is associated with the philosophical concept of yin and represents healing and medicine. According to legend, the Snake helped a village during a famine, earning its place in the zodiac.",
        "Horse": "The Horse is the seventh animal in the Chinese zodiac and symbolizes speed, freedom, and passion. In Chinese culture, the Horse represents travel, competition, and victory. People born in Horse years are thought to be energetic, independent, and always on the move.",
        "Goat": "The Goat (also called Sheep or Ram) is the eighth animal in the Chinese zodiac and symbolizes gentleness, harmony, and creativity. In Chinese culture, the Goat represents art, peace, and compassion. According to legend, the Goat worked together with the Deer and Pig to help people during difficult times.",
        "Monkey": "The Monkey is the ninth animal in the Chinese zodiac and symbolizes intelligence, wit, and innovation. In Chinese culture, the Monkey is associated with cleverness and problem-solving. People born in Monkey years are thought to be smart, curious, and mischievous.",
        "Rooster": "The Rooster is the tenth animal in the Chinese zodiac and symbolizes punctuality, courage, and fidelity. In Chinese culture, the Rooster is associated with honesty, hard work, and confidence. According to legend, the Rooster was chosen for its timekeeping abilities, as it crows at dawn.",
        "Dog": "The Dog is the eleventh animal in the Chinese zodiac and symbolizes loyalty, honesty, and justice. In Chinese culture, the Dog represents protection and service to others. People born in Dog years are thought to be faithful, reliable, and always ready to help those in need.",
        "Pig": "The Pig (also called Boar) is the twelfth and last animal in the Chinese zodiac and symbolizes wealth, generosity, and honesty. In Chinese culture, the Pig represents abundance and satisfaction. According to legend, the Pig was late to the zodiac race because it stopped to eat and take a nap, showing its relaxed nature."
    };
    
    // Event Listeners
    zodiacForm.addEventListener('submit', handleFormSubmit);
    
    // Set default year to 2000 (Dragon year)
    birthYearInput.value = 2000;
    
    /**
     * Handle form submission
     * @param {Event} event - The form submit event
     */
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const birthYear = parseInt(birthYearInput.value);
        
        // Validate year
        if (isNaN(birthYear) || birthYear < 1900 || birthYear > 2100) {
            alert('Please enter a valid year between 1900 and 2100');
            return;
        }
        
        // Calculate zodiac sign
        const zodiacSign = getZodiacSign(birthYear);
        
        // Calculate element
        const element = getElement(birthYear);
        
        // Display results
        displayZodiacResults(zodiacSign, element, birthYear);
        
        // Show results
        resultsContainer.style.display = 'block';
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    /**
     * Get the Chinese zodiac sign based on birth year
     * @param {number} year - The birth year
     * @returns {object} The zodiac sign object
     */
    function getZodiacSign(year) {
        // Chinese zodiac repeats every 12 years
        const remainder = year % 12;
        
        // Map the remainder to the zodiac sign index
        const zodiacIndex = (remainder + 8) % 12;
        
        return zodiacSigns[zodiacIndex];
    }
    
    /**
     * Get the element based on birth year
     * @param {number} year - The birth year
     * @returns {object} The element object
     */
    function getElement(year) {
        // Get the last digit of the year
        const lastDigit = year % 10;
        
        // Find the element that matches the last digit
        return fiveElements.find(element => element.years.includes(lastDigit));
    }
    
    /**
     * Display zodiac results
     * @param {object} zodiacSign - The zodiac sign object
     * @param {object} element - The element object
     * @param {number} birthYear - The birth year
     */
    function displayZodiacResults(zodiacSign, element, birthYear) {
        // Display zodiac sign
        zodiacIconElement.textContent = zodiacSign.icon;
        zodiacSignElement.textContent = `${zodiacSign.name} (${birthYear})`;
        
        // Display element
        zodiacElementElement.textContent = `${element.name} - ${element.description}`;
        
        // Display compatibility
        displayCompatibility(zodiacSign.name);
        
        // Display lucky elements
        displayLuckyElements(zodiacSign.name);
        
        // Display zodiac fortune
        displayZodiacFortune(zodiacSign.name);
        
        // Display historical insights
        displayHistoricalInsights(zodiacSign.name);
    }
    
    /**
     * Display compatibility information
     * @param {string} zodiacName - The name of the zodiac sign
     */
    function displayCompatibility(zodiacName) {
        const compatibility = compatibilityData[zodiacName];
        
        // Display most compatible signs
        mostCompatibleElement.innerHTML = '';
        compatibility.mostCompatible.forEach(sign => {
            const signObject = zodiacSigns.find(s => s.name === sign);
            const compatibleElement = document.createElement('div');
            compatibleElement.className = 'zodiac-sign-item';
            compatibleElement.innerHTML = `
                <span class="zodiac-sign-icon">${signObject.icon}</span>
                <div>
                    <h5>${sign}</h5>
                    <p>Great harmony and understanding</p>
                </div>
            `;
            mostCompatibleElement.appendChild(compatibleElement);
        });
        
        // Display least compatible signs
        leastCompatibleElement.innerHTML = '';
        compatibility.leastCompatible.forEach(sign => {
            const signObject = zodiacSigns.find(s => s.name === sign);
            const incompatibleElement = document.createElement('div');
            incompatibleElement.className = 'zodiac-sign-item';
            incompatibleElement.innerHTML = `
                <span class="zodiac-sign-icon">${signObject.icon}</span>
                <div>
                    <h5>${sign}</h5>
                    <p>Potential challenges and conflicts</p>
                </div>
            `;
            leastCompatibleElement.appendChild(incompatibleElement);
        });
    }
    
    /**
     * Display lucky elements
     * @param {string} zodiacName - The name of the zodiac sign
     */
    function displayLuckyElements(zodiacName) {
        const luckyElements = luckyElementsData[zodiacName];
        
        // Display lucky numbers
        luckyNumbersElement.textContent = luckyElements.numbers.join(', ');
        
        // Display lucky colors
        luckyColorsElement.textContent = luckyElements.colors.join(', ');
    }
    
    /**
     * Display zodiac fortune
     * @param {string} zodiacName - The name of the zodiac sign
     */
    function displayZodiacFortune(zodiacName) {
        const currentYear = new Date().getFullYear();
        
        // Fetch fortune data from JSON file
        fetch('json/Zodiac/fortune.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Fortune data not found');
                }
                return response.json();
            })
            .then(data => {
                if (data[currentYear] && data[currentYear][zodiacName]) {
                    const fortune = data[currentYear][zodiacName];
                    
                    zodiacFortuneElement.innerHTML = `
                        <div class="fortune-item">
                            <h4>Overall Fortune</h4>
                            <p>${fortune.overall}</p>
                        </div>
                        <div class="fortune-item">
                            <h4>Career</h4>
                            <p>${fortune.career}</p>
                        </div>
                        <div class="fortune-item">
                            <h4>Relationships</h4>
                            <p>${fortune.relationships}</p>
                        </div>
                        <div class="fortune-item">
                            <h4>Health</h4>
                            <p>${fortune.health}</p>
                        </div>
                    `;
                } else {
                    // Use generic fortune if specific data is not available
                    zodiacFortuneElement.innerHTML = `
                        <div class="fortune-item">
                            <p>Fortune data for ${zodiacName} in ${currentYear} is not available.</p>
                            <p>Generally, ${zodiacName} people are known for their ${getZodiacTraits(zodiacName)}.</p>
                        </div>
                    `;
                }
            })
            .catch(error => {
                console.error('Error fetching fortune data:', error);
                // Use generic fortune if data fetch fails
                zodiacFortuneElement.innerHTML = `
                    <div class="fortune-item">
                        <p>Fortune data is currently unavailable.</p>
                        <p>Generally, ${zodiacName} people are known for their ${getZodiacTraits(zodiacName)}.</p>
                    </div>
                `;
            });
    }
    
    /**
     * Display historical insights
     * @param {string} zodiacName - The name of the zodiac sign
     */
    function displayHistoricalInsights(zodiacName) {
        const historicalInsight = historicalInsightsData[zodiacName];
        
        zodiacHistoryElement.innerHTML = `
            <div class="history-item">
                <p>${historicalInsight}</p>
            </div>
        `;
    }
    
    /**
     * Get zodiac traits for generic fortune
     * @param {string} zodiacName - The name of the zodiac sign
     * @returns {string} Traits associated with the zodiac sign
     */
    function getZodiacTraits(zodiacName) {
        const traits = {
            "Rat": "quick-wittedness, adaptability, and charm",
            "Ox": "diligence, dependability, and strength",
            "Tiger": "courage, confidence, and leadership",
            "Rabbit": "gentleness, elegance, and kindness",
            "Dragon": "strength, good fortune, and charisma",
            "Snake": "wisdom, intuition, and mystery",
            "Horse": "energy, independence, and passion",
            "Goat": "creativity, compassion, and thoughtfulness",
            "Monkey": "intelligence, wit, and versatility",
            "Rooster": "confidence, punctuality, and honesty",
            "Dog": "loyalty, honesty, and helpfulness",
            "Pig": "generosity, compassion, and sincerity"
        };
        
        return traits[zodiacName] || "unique qualities";
    }
});
