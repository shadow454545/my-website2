document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const westernZodiacForm = document.getElementById('western-zodiac-form');
    const birthMonthSelect = document.getElementById('birth-month');
    const birthDaySelect = document.getElementById('birth-day');
    const resultsContainer = document.getElementById('western-zodiac-results');
    const westernZodiacIconElement = document.getElementById('western-zodiac-icon');
    const westernZodiacSignElement = document.getElementById('western-zodiac-sign');
    const westernZodiacElementElement = document.getElementById('western-zodiac-element');
    const westernMostCompatibleElement = document.getElementById('western-most-compatible');
    const westernLeastCompatibleElement = document.getElementById('western-least-compatible');
    const careerInsightsElement = document.getElementById('career-insights');
    const westernLuckyNumbersElement = document.getElementById('western-lucky-numbers');
    const westernLuckyColorsElement = document.getElementById('western-lucky-colors');
    const shareButton = document.getElementById('share-results');
    
    // Western Zodiac Signs Data
    const westernZodiacSigns = [
        { 
            name: "Aries", 
            symbol: "♈", 
            startDate: { month: 3, day: 21 }, 
            endDate: { month: 4, day: 19 },
            element: "Fire",
            description: "Aries is the first sign of the zodiac, symbolizing new beginnings, courage, and determination.",
            mostCompatible: ["Leo", "Sagittarius", "Gemini"],
            leastCompatible: ["Cancer", "Capricorn", "Taurus"],
            careerPaths: [
                "Entrepreneurship",
                "Sports and athletics",
                "Military or police work",
                "Management positions",
                "Emergency services"
            ],
            luckyNumbers: [1, 9, 10, 27, 36],
            luckyColors: ["Red", "Orange", "White"]
        },
        { 
            name: "Taurus", 
            symbol: "♉", 
            startDate: { month: 4, day: 20 }, 
            endDate: { month: 5, day: 20 },
            element: "Earth",
            description: "Taurus is known for reliability, practicality, and a love of comfort and luxury.",
            mostCompatible: ["Virgo", "Capricorn", "Cancer"],
            leastCompatible: ["Leo", "Aquarius", "Aries"],
            careerPaths: [
                "Finance and banking",
                "Real estate",
                "Agriculture",
                "Culinary arts",
                "Interior design"
            ],
            luckyNumbers: [2, 6, 15, 24, 33],
            luckyColors: ["Green", "Pink", "Blue"]
        },
        { 
            name: "Gemini", 
            symbol: "♊", 
            startDate: { month: 5, day: 21 }, 
            endDate: { month: 6, day: 20 },
            element: "Air",
            description: "Gemini is characterized by duality, adaptability, and excellent communication skills.",
            mostCompatible: ["Libra", "Aquarius", "Aries"],
            leastCompatible: ["Virgo", "Pisces", "Scorpio"],
            careerPaths: [
                "Journalism",
                "Public relations",
                "Sales",
                "Teaching",
                "Social media management"
            ],
            luckyNumbers: [3, 5, 12, 23, 31],
            luckyColors: ["Yellow", "Light Blue", "Green"]
        },
        { 
            name: "Cancer", 
            symbol: "♋", 
            startDate: { month: 6, day: 21 }, 
            endDate: { month: 7, day: 22 },
            element: "Water",
            description: "Cancer is deeply intuitive, emotional, and protective, with strong ties to home and family.",
            mostCompatible: ["Scorpio", "Pisces", "Taurus"],
            leastCompatible: ["Libra", "Aries", "Sagittarius"],
            careerPaths: [
                "Healthcare and nursing",
                "Social work",
                "Childcare",
                "Food industry",
                "Real estate"
            ],
            luckyNumbers: [2, 7, 11, 16, 20],
            luckyColors: ["Silver", "White", "Blue"]
        },
        { 
            name: "Leo", 
            symbol: "♌", 
            startDate: { month: 7, day: 23 }, 
            endDate: { month: 8, day: 22 },
            element: "Fire",
            description: "Leo is confident, dramatic, and passionate, with natural leadership abilities.",
            mostCompatible: ["Aries", "Sagittarius", "Libra"],
            leastCompatible: ["Taurus", "Scorpio", "Capricorn"],
            careerPaths: [
                "Entertainment",
                "Politics",
                "Executive leadership",
                "Marketing",
                "Creative arts"
            ],
            luckyNumbers: [1, 4, 10, 19, 22],
            luckyColors: ["Gold", "Orange", "Red"]
        },
        { 
            name: "Virgo", 
            symbol: "♍", 
            startDate: { month: 8, day: 23 }, 
            endDate: { month: 9, day: 22 },
            element: "Earth",
            description: "Virgo is analytical, practical, and detail-oriented, with a strong sense of service.",
            mostCompatible: ["Taurus", "Capricorn", "Cancer"],
            leastCompatible: ["Gemini", "Sagittarius", "Pisces"],
            careerPaths: [
                "Healthcare",
                "Research",
                "Editing",
                "Accounting",
                "Data analysis"
            ],
            luckyNumbers: [5, 14, 15, 23, 32],
            luckyColors: ["Green", "Brown", "Navy"]
        },
        { 
            name: "Libra", 
            symbol: "♎", 
            startDate: { month: 9, day: 23 }, 
            endDate: { month: 10, day: 22 },
            element: "Air",
            description: "Libra values harmony, balance, and fairness, with a strong aesthetic sense.",
            mostCompatible: ["Gemini", "Aquarius", "Leo"],
            leastCompatible: ["Cancer", "Capricorn", "Aries"],
            careerPaths: [
                "Law",
                "Diplomacy",
                "Design",
                "Human resources",
                "Counseling"
            ],
            luckyNumbers: [4, 6, 13, 15, 24],
            luckyColors: ["Pink", "Blue", "White"]
        },
        { 
            name: "Scorpio", 
            symbol: "♏", 
            startDate: { month: 10, day: 23 }, 
            endDate: { month: 11, day: 21 },
            element: "Water",
            description: "Scorpio is intense, passionate, and resourceful, with profound emotional depth.",
            mostCompatible: ["Cancer", "Pisces", "Capricorn"],
            leastCompatible: ["Leo", "Aquarius", "Gemini"],
            careerPaths: [
                "Psychology",
                "Investigation",
                "Research",
                "Surgery",
                "Crisis management"
            ],
            luckyNumbers: [8, 11, 18, 22, 29],
            luckyColors: ["Deep Red", "Black", "Purple"]
        },
        { 
            name: "Sagittarius", 
            symbol: "♐", 
            startDate: { month: 11, day: 22 }, 
            endDate: { month: 12, day: 21 },
            element: "Fire",
            description: "Sagittarius is optimistic, freedom-loving, and philosophical, with a love for adventure.",
            mostCompatible: ["Aries", "Leo", "Aquarius"],
            leastCompatible: ["Virgo", "Pisces", "Taurus"],
            careerPaths: [
                "Travel industry",
                "Higher education",
                "Publishing",
                "Sports",
                "International relations"
            ],
            luckyNumbers: [3, 7, 9, 12, 21],
            luckyColors: ["Blue", "Purple", "Dark Green"]
        },
        { 
            name: "Capricorn", 
            symbol: "♑", 
            startDate: { month: 12, day: 22 }, 
            endDate: { month: 1, day: 19 },
            element: "Earth",
            description: "Capricorn is disciplined, responsible, and ambitious, with a strong work ethic.",
            mostCompatible: ["Taurus", "Virgo", "Scorpio"],
            leastCompatible: ["Aries", "Libra", "Leo"],
            careerPaths: [
                "Business management",
                "Finance",
                "Government",
                "Engineering",
                "Architecture"
            ],
            luckyNumbers: [4, 8, 13, 22, 26],
            luckyColors: ["Brown", "Black", "Dark Blue"]
        },
        { 
            name: "Aquarius", 
            symbol: "♒", 
            startDate: { month: 1, day: 20 }, 
            endDate: { month: 2, day: 18 },
            element: "Air",
            description: "Aquarius is innovative, humanitarian, and independent, with progressive ideas.",
            mostCompatible: ["Gemini", "Libra", "Sagittarius"],
            leastCompatible: ["Taurus", "Scorpio", "Cancer"],
            careerPaths: [
                "Science",
                "Technology",
                "Social activism",
                "Humanitarian work",
                "Innovation"
            ],
            luckyNumbers: [4, 7, 11, 22, 29],
            luckyColors: ["Electric Blue", "Turquoise", "Silver"]
        },
        { 
            name: "Pisces", 
            symbol: "♓", 
            startDate: { month: 2, day: 19 }, 
            endDate: { month: 3, day: 20 },
            element: "Water",
            description: "Pisces is compassionate, artistic, and intuitive, with a deep connection to the spiritual realm.",
            mostCompatible: ["Cancer", "Scorpio", "Capricorn"],
            leastCompatible: ["Gemini", "Sagittarius", "Virgo"],
            careerPaths: [
                "Arts",
                "Music",
                "Healthcare",
                "Spiritual counseling",
                "Social services"
            ],
            luckyNumbers: [3, 9, 12, 15, 18],
            luckyColors: ["Sea Green", "Lavender", "Light Blue"]
        }
    ];
    
    // Event Listeners
    birthMonthSelect.addEventListener('change', updateDaysDropdown);
    westernZodiacForm.addEventListener('submit', handleFormSubmit);
    shareButton.addEventListener('click', shareResults);
    
    // Initialize days dropdown
    updateDaysDropdown();
    
    /**
     * Update the days dropdown based on the selected month
     */
    function updateDaysDropdown() {
        const selectedMonth = parseInt(birthMonthSelect.value) || 1;
        const daysInMonth = getDaysInMonth(selectedMonth);
        
        // Clear current options
        birthDaySelect.innerHTML = '<option value="" disabled selected>Day</option>';
        
        // Add new options
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            birthDaySelect.appendChild(option);
        }
    }
    
    /**
     * Get the number of days in a month
     * @param {number} month - The month (1-12)
     * @returns {number} The number of days in the month
     */
    function getDaysInMonth(month) {
        // February (special case)
        if (month === 2) {
            return 29; // Including leap year possibility
        }
        
        // Months with 30 days
        if ([4, 6, 9, 11].includes(month)) {
            return 30;
        }
        
        // Months with 31 days
        return 31;
    }
    
    /**
     * Handle form submission
     * @param {Event} event - The form submit event
     */
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const birthMonth = parseInt(birthMonthSelect.value);
        const birthDay = parseInt(birthDaySelect.value);
        
        // Validate inputs
        if (isNaN(birthMonth) || isNaN(birthDay)) {
            alert('Please select both month and day');
            return;
        }
        
        // Calculate Western zodiac sign
        const zodiacSign = getWesternZodiacSign(birthMonth, birthDay);
        
        // Display results
        displayWesternZodiacResults(zodiacSign);
        
        // Show results
        resultsContainer.style.display = 'block';
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    /**
     * Get the Western zodiac sign based on birth month and day
     * @param {number} month - The birth month (1-12)
     * @param {number} day - The birth day
     * @returns {object} The zodiac sign object
     */
    function getWesternZodiacSign(month, day) {
        return westernZodiacSigns.find(sign => {
            // Handle zodiac signs that span across two months
            if (sign.startDate.month === month && day >= sign.startDate.day) {
                return true;
            }
            if (sign.endDate.month === month && day <= sign.endDate.day) {
                return true;
            }
            return false;
        });
    }
    
    /**
     * Display Western zodiac results
     * @param {object} zodiacSign - The zodiac sign object
     */
    function displayWesternZodiacResults(zodiacSign) {
        // Display zodiac sign
        westernZodiacIconElement.textContent = zodiacSign.symbol;
        westernZodiacSignElement.textContent = `${zodiacSign.name} (${zodiacSign.startDate.month}/${zodiacSign.startDate.day} - ${zodiacSign.endDate.month}/${zodiacSign.endDate.day})`;
        
        // Display element
        westernZodiacElementElement.textContent = `${zodiacSign.element} - ${zodiacSign.description}`;
        
        // Display compatibility
        displayCompatibility(zodiacSign);
        
        // Display career insights
        displayCareerInsights(zodiacSign);
        
        // Display lucky elements
        displayLuckyElements(zodiacSign);
    }
    
    /**
     * Display compatibility information
     * @param {object} zodiacSign - The zodiac sign object
     */
    function displayCompatibility(zodiacSign) {
        // Display most compatible signs
        westernMostCompatibleElement.innerHTML = '';
        zodiacSign.mostCompatible.forEach(sign => {
            const compatibleSign = westernZodiacSigns.find(s => s.name === sign);
            const compatibleElement = document.createElement('div');
            compatibleElement.className = 'zodiac-sign-item';
            compatibleElement.innerHTML = `
                <span class="zodiac-sign-icon">${compatibleSign.symbol}</span>
                <div>
                    <h5>${sign}</h5>
                    <p>Great harmony and understanding</p>
                </div>
            `;
            westernMostCompatibleElement.appendChild(compatibleElement);
        });
        
        // Display least compatible signs
        westernLeastCompatibleElement.innerHTML = '';
        zodiacSign.leastCompatible.forEach(sign => {
            const incompatibleSign = westernZodiacSigns.find(s => s.name === sign);
            const incompatibleElement = document.createElement('div');
            incompatibleElement.className = 'zodiac-sign-item';
            incompatibleElement.innerHTML = `
                <span class="zodiac-sign-icon">${incompatibleSign.symbol}</span>
                <div>
                    <h5>${sign}</h5>
                    <p>Potential challenges and conflicts</p>
                </div>
            `;
            westernLeastCompatibleElement.appendChild(incompatibleElement);
        });
    }
    
    /**
     * Display career insights
     * @param {object} zodiacSign - The zodiac sign object
     */
    function displayCareerInsights(zodiacSign) {
        careerInsightsElement.innerHTML = '';
        
        const careerElement = document.createElement('div');
        careerElement.className = 'career-item';
        
        let careerHTML = `<h4>Best Career Paths for ${zodiacSign.name}</h4>`;
        careerHTML += '<ul class="career-list">';
        
        zodiacSign.careerPaths.forEach(career => {
            careerHTML += `<li>${career}</li>`;
        });
        
        careerHTML += '</ul>';
        careerHTML += `<p>As a ${zodiacSign.name}, you excel in careers that utilize your ${zodiacSign.element} element qualities.</p>`;
        
        careerElement.innerHTML = careerHTML;
        careerInsightsElement.appendChild(careerElement);
    }
    
    /**
     * Display lucky elements
     * @param {object} zodiacSign - The zodiac sign object
     */
    function displayLuckyElements(zodiacSign) {
        // Display lucky numbers
        westernLuckyNumbersElement.textContent = zodiacSign.luckyNumbers.join(', ');
        
        // Display lucky colors
        westernLuckyColorsElement.textContent = zodiacSign.luckyColors.join(', ');
    }
    
    /**
     * Share results on social media
     */
    function shareResults() {
        // Check if results are available
        if (resultsContainer.style.display !== 'block') {
            alert('Please calculate your Western zodiac sign first');
            return;
        }
        
        const zodiacSign = westernZodiacSignElement.textContent;
        const shareText = `I just discovered I'm a ${zodiacSign} using the Western Zodiac Calculator!`;
        
        // Check if Web Share API is available
        if (navigator.share) {
            navigator.share({
                title: 'My Western Zodiac Sign',
                text: shareText,
                url: window.location.href
            })
            .catch(error => {
                console.error('Error sharing:', error);
                fallbackShare(shareText);
            });
        } else {
            fallbackShare(shareText);
        }
    }
    
    /**
     * Fallback sharing method
     * @param {string} text - The text to share
     */
    function fallbackShare(text) {
        // Create a temporary input element
        const input = document.createElement('textarea');
        input.value = text;
        document.body.appendChild(input);
        
        // Select and copy the text
        input.select();
        document.execCommand('copy');
        
        // Remove the temporary element
        document.body.removeChild(input);
        
        // Notify the user
        alert('Share text copied to clipboard: ' + text);
    }
});
