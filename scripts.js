document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const ageForm = document.getElementById('age-form');
    const birthdateInput = document.getElementById('birthdate');
    const resultsContainer = document.getElementById('results');
    const todayAgeElement = document.getElementById('today-age');
    const daysLivedElement = document.getElementById('days-lived');
    const hoursLivedElement = document.getElementById('hours-lived');
    const remainingLifetime80Element = document.getElementById('remaining-lifetime-80');
    const remainingDays80Element = document.getElementById('remaining-days-80');
    const remainingLifetime100Element = document.getElementById('remaining-lifetime-100');
    const remainingDays100Element = document.getElementById('remaining-days-100');
    const celebritiesList = document.getElementById('celebrities-list');
    const generationInfo = document.getElementById('generation-info');   
    // Constants
    const LIFESPAN_80 = 80; // 80 years lifespan
    const LIFESPAN_100 = 100; // 100 years lifespan
    
    // Event Listeners
    ageForm.addEventListener('submit', handleFormSubmit);
    
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
        
        // Calculate age metrics
        calculateAgeMetrics(birthdate);
        
        // Fetch additional data
        fetchAgeData(birthdate);
        
        // Show results
        resultsContainer.style.display = 'block';
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    /**
     * Calculate and display age metrics
     * @param {Date} birthdate - The user's date of birth
     */
    function calculateAgeMetrics(birthdate) {
        const now = new Date();
        
        // Format today's date
        const todayYear = now.getFullYear();
        const todayMonth = now.getMonth() + 1;
        const todayDay = now.getDate();
        
        // Calculate days lived
        const millisecondsLived = now - birthdate;
        const daysLived = Math.floor(millisecondsLived / (1000 * 60 * 60 * 24));
        
        // Calculate hours lived
        const hoursLived = Math.floor(millisecondsLived / (1000 * 60 * 60));
        
        // Calculate years lived
        const yearsLived = daysLived / 365.25;
        const yearsLivedInt = Math.floor(yearsLived);
        
        // Calculate remaining lifetime for 80 years
        const remaining80Years = Math.max(0, LIFESPAN_80 - yearsLived);
        const remaining80Days = Math.floor(remaining80Years * 365.25);
        
        // Calculate remaining lifetime for 100 years
        const remaining100Years = Math.max(0, LIFESPAN_100 - yearsLived);
        const remaining100Days = Math.floor(remaining100Years * 365.25);
        
        // Display today's date and current age
        todayAgeElement.textContent = `Today's date is ${todayYear}/${todayMonth}/${todayDay}. You are now ${yearsLivedInt} years old.`;
        
        // Display days and hours lived
        daysLivedElement.textContent = daysLived.toLocaleString();
        hoursLivedElement.textContent = hoursLived.toLocaleString();
        
        // Display remaining lifetime for 80 years
        remainingLifetime80Element.textContent = Math.floor(remaining80Years);
        remainingDays80Element.textContent = remaining80Days.toLocaleString();
        
        // Display remaining lifetime for 100 years
        remainingLifetime100Element.textContent = Math.floor(remaining100Years);
        remainingDays100Element.textContent = remaining100Days.toLocaleString();
    }
    
    /**
     * Fetch age-related data from JSON file
     * @param {Date} birthdate - The user's date of birth
     */
    function fetchAgeData(birthdate) {
        const birthYear = birthdate.getFullYear();
        const jsonFilePath = `json/Age Calculator/${birthYear}.json`;
        
        fetch(jsonFilePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Data not found');
                }
                return response.json();
            })
            .then(data => {
                // Process and display the data
                displayCelebrities(data, birthdate);
                displayGenerationInfo(data, birthdate);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                handleDataError();
            });
    }
    
    /**
     * Display celebrities born in the same year
     * @param {Object} data - The JSON data
     * @param {Date} birthdate - The user's date of birth
     */
    function displayCelebrities(data, birthdate) {
        // Clear previous results
        celebritiesList.innerHTML = '';
        
        if (data.celebrities && data.celebrities.length > 0) {
            data.celebrities.forEach(celebrity => {
                const celebrityElement = document.createElement('div');
                celebrityElement.className = 'celebrity-item';
                
                celebrityElement.innerHTML = `
                    <h4>${"🪷"} ${celebrity.name}</h4>
                    <p><strong>Country:</strong> ${celebrity.country}</p>
                    <p><strong>Profession:</strong> ${celebrity.profession}</p>
                    <p><strong>Known for:</strong> ${celebrity.knownFor}</p>
                    <p><strong>Born:</strong> ${formatDate(new Date(celebrity.birthdate))}</p>
                `;
                
                celebritiesList.appendChild(celebrityElement);
            });
        } else {
            celebritiesList.innerHTML = '<p>No celebrity data available for your birth year.</p>';
        }
    }
    
    /**
     * Display generation information
     * @param {Object} data - The JSON data
     * @param {Date} birthdate - The user's date of birth
     */
    function displayGenerationInfo(data, birthdate) {
        // Clear previous results
        generationInfo.innerHTML = '';
        
        if (data.generation) {
            const generation = data.generation;
            const generationElement = document.createElement('div');
            generationElement.className = 'generation-item';
            
            // Basic generation info
            let generationHTML = `
                <h4>${generation.name}</h4>
                <p>${generation.description}</p>
                <p>Years: ${generation.startYear} - ${generation.endYear}</p>
            `;
            
            // Get the defining events (handle both property names)
            const events = generation.definingEvents || generation.defining_events;
            
            // Check if events exist and is an array
            if (events && events.length > 0) {
                if (typeof events[0] === 'object') {
                    // New format: array of objects with event details
                    generationHTML += `<h5>Defining Events:</h5>`;
                    generationHTML += `<div class="defining-events">`;
                    
                    events.forEach(event => {
                        generationHTML += `
                            <div class="event-item">
                                <div class="event-header">
                                    <span class="event-icon">${event.icon || ''}</span>
                                    <h6>${event.event}</h6>
                                    <span class="event-year">${event.year}</span>
                                </div>
                                <p class="event-details">${event.details}</p>
                            </div>
                        `;
                    });
                    
                    generationHTML += `</div>`;
                } else {
                    // Old format: array of strings
                    generationHTML += `<p>Defining events: ${events.join(', ')}</p>`;
                }
            }
            
            generationElement.innerHTML = generationHTML;
            generationInfo.appendChild(generationElement);
        } else {
            generationInfo.innerHTML = '<p>No generation data available for your birth year.</p>';
        }
    }
    
    /**
     * Handle data fetch errors
     */
    function handleDataError() {
        celebritiesList.innerHTML = '<p>Data not found</p>';
        generationInfo.innerHTML = '<p>Data not found</p>';
    }
    
    /**
     * Format date for display
     * @param {Date} date - The date to format
     * @returns {string} Formatted date string
     */
    function formatDate(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
});
