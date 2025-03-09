document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const birthdayForm = document.getElementById('birthday-form');
    const birthdateInput = document.getElementById('birthdate');
    const resultsContainer = document.getElementById('birthday-results');
    const westernZodiacIconElement = document.getElementById('western-zodiac-icon');
    const westernZodiacSignElement = document.getElementById('western-zodiac-sign');
    const chineseZodiacIconElement = document.getElementById('chinese-zodiac-icon');
    const chineseZodiacSignElement = document.getElementById('chinese-zodiac-sign');
    const daysToBirthdayElement = document.getElementById('days-to-birthday');
    const nextAgeElement = document.getElementById('next-age');
    const daysToNextAgeElement = document.getElementById('days-to-next-age');
    const shareButton = document.getElementById('share-results');
    
    // Western Zodiac Signs Data
    const westernZodiacSigns = [
        { name: "Capricorn", symbol: "♑", startDate: { month: 12, day: 22 }, endDate: { month: 1, day: 19 } },
        { name: "Aquarius", symbol: "♒", startDate: { month: 1, day: 20 }, endDate: { month: 2, day: 18 } },
        { name: "Pisces", symbol: "♓", startDate: { month: 2, day: 19 }, endDate: { month: 3, day: 20 } },
        { name: "Aries", symbol: "♈", startDate: { month: 3, day: 21 }, endDate: { month: 4, day: 19 } },
        { name: "Taurus", symbol: "♉", startDate: { month: 4, day: 20 }, endDate: { month: 5, day: 20 } },
        { name: "Gemini", symbol: "♊", startDate: { month: 5, day: 21 }, endDate: { month: 6, day: 20 } },
        { name: "Cancer", symbol: "♋", startDate: { month: 6, day: 21 }, endDate: { month: 7, day: 22 } },
        { name: "Leo", symbol: "♌", startDate: { month: 7, day: 23 }, endDate: { month: 8, day: 22 } },
        { name: "Virgo", symbol: "♍", startDate: { month: 8, day: 23 }, endDate: { month: 9, day: 22 } },
        { name: "Libra", symbol: "♎", startDate: { month: 9, day: 23 }, endDate: { month: 10, day: 22 } },
        { name: "Scorpio", symbol: "♏", startDate: { month: 10, day: 23 }, endDate: { month: 11, day: 21 } },
        { name: "Sagittarius", symbol: "♐", startDate: { month: 11, day: 22 }, endDate: { month: 12, day: 21 } }
    ];
    
    // Chinese Zodiac Signs Data
    const chineseZodiacSigns = [
        { name: "Rat", icon: "🐀", years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020, 2032] },
        { name: "Ox", icon: "🐂", years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021, 2033] },
        { name: "Tiger", icon: "🐅", years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022, 2034] },
        { name: "Rabbit", icon: "🐇", years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023, 2035] },
        { name: "Dragon", icon: "🐉", years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024, 2036] },
        { name: "Snake", icon: "🐍", years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025, 2037] },
        { name: "Horse", icon: "🐎", years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026, 2038] },
        { name: "Goat", icon: "🐐", years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027, 2039] },
        { name: "Monkey", icon: "🐒", years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028, 2040] },
        { name: "Rooster", icon: "🐓", years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029, 2041] },
        { name: "Dog", icon: "🐕", years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030, 2042] },
        { name: "Pig", icon: "🐖", years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031, 2043] }
    ];
    
    // Event Listeners
    birthdayForm.addEventListener('submit', handleFormSubmit);
    shareButton.addEventListener('click', shareResults);
    
    // Set max date to today
    const today = new Date();
    const formattedDate = formatDateForInput(today);
    birthdateInput.setAttribute('max', formattedDate);
    
    /**
     * Handle form submission
     * @param {Event} event - The form submit event
     */
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const birthdate = new Date(birthdateInput.value);
        
        // Validate date
        if (isNaN(birthdate.getTime())) {
            alert('Please enter a valid date of birth');
            return;
        }
        
        if (birthdate > today) {
            alert('Date of birth cannot be in the future');
            return;
        }
        
        // Calculate birthday countdown
        const birthdayCountdown = calculateBirthdayCountdown(birthdate);
        
        // Calculate age countdown
        const ageCountdown = calculateAgeCountdown(birthdate);
        
        // Get Western zodiac sign
        const westernZodiac = getWesternZodiacSign(birthdate.getMonth() + 1, birthdate.getDate());
        
        // Get Chinese zodiac sign
        const chineseZodiac = getChineseZodiacSign(birthdate.getFullYear());
        
        // Display results
        displayResults(birthdayCountdown, ageCountdown, westernZodiac, chineseZodiac);
        
        // Show results
        resultsContainer.style.display = 'block';
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    /**
     * Calculate days until next birthday
     * @param {Date} birthdate - The date of birth
     * @returns {number} Days until next birthday
     */
    function calculateBirthdayCountdown(birthdate) {
        const now = new Date();
        const currentYear = now.getFullYear();
        
        // Create date for this year's birthday
        const thisYearBirthday = new Date(currentYear, birthdate.getMonth(), birthdate.getDate());
        
        // If birthday has already occurred this year, calculate for next year
        if (thisYearBirthday < now) {
            thisYearBirthday.setFullYear(currentYear + 1);
        }
        
        // Calculate difference in days
        const diffTime = thisYearBirthday - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    }
    
    /**
     * Calculate days until next age
     * @param {Date} birthdate - The date of birth
     * @returns {object} Next age and days until next age
     */
    function calculateAgeCountdown(birthdate) {
        const now = new Date();
        const currentYear = now.getFullYear();
        const birthYear = birthdate.getFullYear();
        
        // Calculate current age
        let currentAge = currentYear - birthYear;
        
        // Adjust if birthday hasn't occurred yet this year
        const thisYearBirthday = new Date(currentYear, birthdate.getMonth(), birthdate.getDate());
        if (thisYearBirthday > now) {
            currentAge--;
        }
        
        // Calculate next age
        const nextAge = currentAge + 1;
        
        // Calculate days until next age
        const nextBirthday = new Date(currentYear, birthdate.getMonth(), birthdate.getDate());
        if (nextBirthday <= now) {
            nextBirthday.setFullYear(currentYear + 1);
        }
        
        const diffTime = nextBirthday - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return {
            nextAge,
            daysToNextAge: diffDays
        };
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
     * Get the Chinese zodiac sign based on birth year
     * @param {number} year - The birth year
     * @returns {object} The zodiac sign object
     */
    function getChineseZodiacSign(year) {
        return chineseZodiacSigns.find(sign => sign.years.includes(year) || year % 12 === sign.years[0] % 12);
    }
    
    /**
     * Display birthday countdown results
     * @param {number} birthdayCountdown - Days until next birthday
     * @param {object} ageCountdown - Next age and days until next age
     * @param {object} westernZodiac - Western zodiac sign
     * @param {object} chineseZodiac - Chinese zodiac sign
     */
    function displayResults(birthdayCountdown, ageCountdown, westernZodiac, chineseZodiac) {
        // Display Western zodiac sign
        westernZodiacIconElement.textContent = westernZodiac.symbol;
        westernZodiacSignElement.textContent = westernZodiac.name;
        
        // Display Chinese zodiac sign
        chineseZodiacIconElement.textContent = chineseZodiac.icon;
        chineseZodiacSignElement.textContent = chineseZodiac.name;
        
        // Display birthday countdown
        daysToBirthdayElement.textContent = birthdayCountdown;
        
        // Display age countdown
        nextAgeElement.textContent = ageCountdown.nextAge;
        daysToNextAgeElement.textContent = ageCountdown.daysToNextAge;
    }
    
    /**
     * Format date for input field
     * @param {Date} date - The date to format
     * @returns {string} Formatted date string (YYYY-MM-DD)
     */
    function formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    /**
     * Share results on social media
     */
    function shareResults() {
        // Check if results are available
        if (resultsContainer.style.display !== 'block') {
            alert('Please calculate your birthday countdown first');
            return;
        }
        
        const daysToNextBirthday = daysToBirthdayElement.textContent;
        const nextAge = nextAgeElement.textContent;
        const daysToNextAge = daysToNextAgeElement.textContent;
        const westernZodiac = westernZodiacSignElement.textContent;
        const chineseZodiac = chineseZodiacSignElement.textContent;
        
        const shareText = `My birthday is in ${daysToNextBirthday} days! I'll be ${nextAge} years old. My Western zodiac sign is ${westernZodiac} and my Chinese zodiac sign is ${chineseZodiac}.`;
        
        // Check if Web Share API is available
        if (navigator.share) {
            navigator.share({
                title: 'My Birthday Countdown',
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
