
        // =================================================================================
        // --- JAVASCRIPT LOGIC FOR HEYPHYSICS ---
        // This section contains all the client-side logic to make the game interactive.
        // =================================================================================

        // --- I. GLOBAL STATE AND DATA ---

        // The 'gameState' object is a central place to store all information about the
        // player's current session. This includes their name and choices.
        // Using a single object for state management is an efficient technique for organizing data.
        const gameState = {
            playerName: '',
            avatar: '',
            avatarSrc: '',
            topic: '',
            subTopic: '',
            level: '',
        };

        // The 'gameData' object acts as a temporary, front-end database.
        // It holds all the syllabus topics and the specific questions for each sub-topic.
        // In the final version, this data will be fetched from the Python back-end and SQLite database.
        const gameData = {
            'A. Mechanics': {
                'A.1 Kinematics': {
                    question: 'A car accelerates from rest to 20 m/s in 5 seconds. What is its acceleration?',
                    options: ['2 m/s²', '4 m/s²', '5 m/s²', '10 m/s²'],
                    answer: '4 m/s²',
                    hint: 'Acceleration is the change in velocity divided by the time taken (a = Δv / t).'
                },
                'A.2 Forces': { 
                    question: 'What is the net force on a box being pushed with 10N to the right and 4N to the left?',
                    options: ['14N left', '6N left', '6N right', '14N right'],
                    answer: '6N right',
                    hint: 'Net force is the vector sum of all forces. Consider the directions.'
                },
                'A.3 Work, energy and power': {
                    question: 'A 10kg block is pulled up a frictionless ramp of length 5m and height 3m. What is the work done on the block? (g = 10 N/kg)',
                    options: ['300 J', '500 J', '150 J', '200 J'],
                    answer: '300 J',
                    hint: 'Work done against gravity depends only on the vertical height change (Work = mgh), not the path taken.'
                },
                'A.4 Rigid body mechanics': {
                    question: 'A solid sphere and a hollow sphere of the same mass and radius roll down an incline. Which reaches the bottom first?',
                    options: ['Solid sphere', 'Hollow sphere', 'They tie', 'Depends on mass'],
                    answer: 'Solid sphere',
                    hint: 'The object with the smaller moment of inertia will have greater translational acceleration.'
                },
                'A.5 Galilean and special relativity': {
                    question: 'A spaceship travels at 0.8c relative to Earth. It fires a probe forward at 0.5c relative to the ship. What is the probe\'s speed relative to Earth?',
                    options: ['1.30c', '0.93c', '0.8c', '0.5c'],
                    answer: '0.93c',
                    hint: 'Use the relativistic velocity addition formula: (u + v) / (1 + uv/c^2).'
                }
            },
            'B. Thermal Physics': {
                'B.1 Temperature': { 
                    question: 'Convert 25° Celsius to Kelvin.',
                    options: ['298K', '248K', '-248K', '25K'],
                    answer: '298K',
                    hint: 'The formula is K = C + 273.15. We can approximate to K = C + 273.'
                },
                'B.2 Greenhouse effect': {
                    question: 'Which gas is considered the primary contributor to the enhanced greenhouse effect?',
                    options: ['Oxygen (O2)', 'Nitrogen (N2)', 'Carbon Dioxide (CO2)', 'Argon (Ar)'],
                    answer: 'Carbon Dioxide (CO2)',
                    hint: 'This gas is a major byproduct of burning fossil fuels and is very effective at trapping infrared radiation.'
                },
                'B.3 Gas Laws': {
                    question: 'The volume of a gas is halved at a constant temperature. What happens to its pressure?',
                    options: ['It is halved', 'It is doubled', 'It stays the same', 'It is quadrupled'],
                    answer: 'It is doubled',
                    hint: 'Boyle\'s Law states that pressure and volume are inversely proportional (P₁V₁ = P₂V₂).'
                },
                'B.4 Thermodynamics': {
                    question: 'In an isothermal expansion of an ideal gas, what is true about the change in internal energy (ΔU)?',
                    options: ['ΔU > 0', 'ΔU < 0', 'ΔU = 0', 'It depends on the gas'],
                    answer: 'ΔU = 0',
                    hint: 'For an ideal gas, internal energy depends only on temperature. Isothermal means constant temperature.'
                },
                'B.5 Current and circuits': {
                    question: 'Three 6Ω resistors are connected in parallel. What is the total equivalent resistance?',
                    options: ['18 Ω', '6 Ω', '3 Ω', '2 Ω'],
                    answer: '2 Ω',
                    hint: 'The formula for resistors in parallel is 1/R_total = 1/R₁ + 1/R₂ + ...'
                }
            },
            'C. Waves': {
                'C.1 Simple harmonic motion': {
                    question: 'For a mass on a spring undergoing SHM, where is its acceleration at a maximum?',
                    options: ['At the equilibrium position', 'At maximum displacement', 'It is always constant', 'Halfway to max displacement'],
                    answer: 'At maximum displacement',
                    hint: 'Acceleration is proportional to displacement (a ∝ -x) and is greatest when the restoring force is greatest.'
                },
                'C.2 Wave model': {
                    question: 'A wave has a frequency of 50 Hz and a wavelength of 2 m. What is its speed?',
                    options: ['25 m/s', '52 m/s', '100 m/s', '0.04 m/s'],
                    answer: '100 m/s',
                    hint: 'Wave speed is the product of frequency and wavelength (v = fλ).'
                },
                'C.3 Wave phenomena': {
                    question: 'When light passes from air into a glass block, which property remains unchanged?',
                    options: ['Speed', 'Wavelength', 'Frequency', 'Direction'],
                    answer: 'Frequency',
                    hint: 'The frequency of a wave is determined by its source and does not change as it moves through different media.'
                },
                'C.4 Standing waves and resonance': {
                    question: 'A string fixed at both ends is vibrating at its third harmonic. How many antinodes are present?',
                    options: ['2', '3', '4', '5'],
                    answer: '3',
                    hint: 'For a string fixed at both ends, the number of antinodes is equal to the harmonic number.'
                },
                'C.5 Doppler effect': {
                    question: 'An ambulance with its siren on is moving away from you. The frequency of the sound you hear is...',
                    options: ['higher than the source frequency.', 'lower than the source frequency.', 'the same as the source frequency.', 'zero.'],
                    answer: 'lower than the source frequency.',
                    hint: 'When a wave source moves away from an observer, the observed waves are "stretched out," leading to a lower frequency.'
                }
            },
            'D. Electricity & Magnetism': {
                'D.1 Gravitational fields': {
                    question: 'Planet X has twice the mass and twice the radius of Earth. What is the gravitational field strength on its surface compared to Earth\'s (g)?',
                    options: ['g/2', 'g', '2g', '4g'],
                    answer: 'g/2',
                    hint: 'g is proportional to M/r². If M doubles and r doubles, the new g is proportional to (2M)/(2r)² = 2M/4r².'
                },
                'D.2 Electric and magnetic fields': {
                    question: 'What is the direction of the magnetic field around a straight wire carrying current upwards?',
                    options: ['Radially outwards', 'Radially inwards', 'Anti-clockwise circles', 'Clockwise circles'],
                    answer: 'Anti-clockwise circles',
                    hint: 'Use the right-hand grip rule: point your thumb in the direction of the current, and your fingers will curl in the direction of the magnetic field.'
                },
                'D.3 Motion in electromagnetic fields': {
                    question: 'A proton enters a uniform magnetic field that is directed into the page. The proton\'s initial velocity is to the right. What is the direction of the magnetic force on the proton?',
                    options: ['Up', 'Down', 'Left', 'Right'],
                    answer: 'Up',
                    hint: 'Use Fleming\'s Left-Hand Rule for motors (or the right-hand rule for positive charges).'
                },
                'D.4 Induction': {
                    question: 'A bar magnet is pushed into a coil of wire. What factor does NOT affect the magnitude of the induced EMF?',
                    options: ['The speed of the magnet', 'The number of turns in the coil', 'The strength of the magnet', 'The resistance of the wire'],
                    answer: 'The resistance of the wire',
                    hint: 'Faraday\'s Law of Induction states that EMF is proportional to the rate of change of magnetic flux. Resistance affects the current, not the EMF itself.'
                }
            },
             'E. Nuclear and quantum physics': {
                'E.1 Structure of the atom': {
                    question: 'The Rutherford-Geiger-Marsden experiment provided evidence for...',
                    options: ['the existence of electrons.', 'the quantization of energy levels.', 'a small, dense, positively charged nucleus.', 'the existence of neutrons.'],
                    answer: 'a small, dense, positively charged nucleus.',
                    hint: 'The unexpected back-scattering of some alpha particles led to the conclusion that the atom\'s positive charge was concentrated in a tiny nucleus.'
                },
                'E.2 Quantum physics': {
                    question: 'Which phenomenon provides the best evidence for the particle nature of light?',
                    options: ['Diffraction', 'Interference', 'Polarization', 'The photoelectric effect'],
                    answer: 'The photoelectric effect',
                    hint: 'The photoelectric effect can only be explained by considering light as discrete packets of energy (photons).'
                },
                'E.3 Radioactive decay': {
                    question: 'A radioactive sample has a half-life of 10 days. What fraction of the original sample will remain after 30 days?',
                    options: ['1/3', '1/4', '1/8', '1/16'],
                    answer: '1/8',
                    hint: '30 days is equal to three half-lives. The sample halves three times: 1 -> 1/2 -> 1/4 -> 1/8.'
                },
                'E.4 Fission': {
                    question: 'In a nuclear fission reaction, what is the primary role of a moderator in a reactor?',
                    options: ['To absorb neutrons', 'To slow down neutrons', 'To speed up neutrons', 'To start the reaction'],
                    answer: 'To slow down neutrons',
                    hint: 'Fission is most efficient with slow-moving (thermal) neutrons. The moderator (e.g., water or graphite) slows them down.'
                },
                'E.5 Fusion and stars': {
                    question: 'Which process is the primary source of energy for main-sequence stars like the Sun?',
                    options: ['Nuclear fission', 'Nuclear fusion', 'Gravitational collapse', 'Chemical burning'],
                    answer: 'Nuclear fusion',
                    hint: 'Stars fuse light elements, like hydrogen, into heavier elements, like helium, releasing enormous amounts of energy.'
                }
            }
        };


        // --- II. CORE APPLICATION FUNCTIONS ---

        /**
         * Manages the visibility of screens in this single-page application.
         * It works by hiding all screens and then making only the target screen visible.
         * This technique avoids page reloads and creates a smooth, app-like experience.
         * @param {string} screenId - The ID of the HTML element for the screen to show.
         */
        function showScreen(screenId) {
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
            document.getElementById(screenId).classList.add('active');
        }
        
        /**
         * Manages the visibility of modal pop-ups.
         * @param {string} modalId - The ID of the modal element to show.
         */
        function showModal(modalId) {
            document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('active'));
            document.getElementById(modalId).classList.add('active');
        }

        /**
         * Hides all active modal pop-ups.
         */
        function hideModals() {
            document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('active'));
        }

        /**
         * This is the main entry point of the application. It's called once the HTML
         * document has fully loaded. Its purpose is to set up the initial state
         * and attach all the necessary event listeners to make the page interactive.
         */
        function initializeApp() {
            // localStorage is used to remember the player's name between sessions.
            // This provides a better user experience for returning players.
            const savedName = localStorage.getItem('playerName');
            if (savedName) {
                gameState.playerName = savedName;
                document.getElementById('player-name-input').value = savedName;
            }
            populateTopics();
            setupEventListeners();
        }

        /**
         * This function is crucial for interactivity. It finds all the clickable elements
         * (buttons, divs, etc.) and attaches a function to be executed when a user
         * clicks on them. This is known as event handling.
         */
        function setupEventListeners() {
            // Event listener for the main login button.
            document.getElementById('login-button').addEventListener('click', () => {
                const nameInput = document.getElementById('player-name-input');
                // Basic validation: ensure the user has entered a name.
                if (nameInput.value.trim() !== '') {
                    gameState.playerName = nameInput.value.trim();
                    localStorage.setItem('playerName', gameState.playerName);
                    showScreen('avatar-screen');
                }
            });

            // Event listeners for each avatar choice.
            document.querySelectorAll('.avatar-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    // First, remove the 'selected' style from any other option.
                    document.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
                    // Then, apply the 'selected' style to the one that was just clicked.
                    const selectedAvatarElement = e.currentTarget;
                    selectedAvatarElement.classList.add('selected');
                    gameState.avatar = selectedAvatarElement.dataset.avatar; // Store the choice.
                    gameState.avatarSrc = selectedAvatarElement.dataset.src;
                    // Enable the confirm button only after a choice is made.
                    document.getElementById('avatar-confirm-button').disabled = false;
                });
            });
            
            // Event listener for the avatar confirmation button.
            document.getElementById('avatar-confirm-button').addEventListener('click', () => {
                if (gameState.avatar) { // Proceed only if an avatar has been chosen.                       
                    showScreen('topics-screen');
                }
            });

            // Event listener for the sub-topic selection buttons.
            // This uses event delegation: one listener on the parent container
            // efficiently handles clicks on any button inside it.
            document.getElementById('subtopic-list').addEventListener('click', (e) => {
                if (e.target.matches('.subtopic-button')) {
                    gameState.subTopic = e.target.dataset.subtopic;
                    showScreen('levels-screen');
                }
            });

            // Event listeners for the level (difficulty) selection buttons.
            document.querySelectorAll('.level-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    gameState.level = e.currentTarget.dataset.level;
                    startGame(); // This is the trigger to enter the actual game room.
                });
            });

            // A single set of listeners for all 'back' buttons for efficiency.
            document.querySelectorAll('.back-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    showScreen(e.currentTarget.dataset.target);
                });
            });
            
            // Event listener for the clickable object within the game room.
            document.getElementById('clickable-desk').addEventListener('click', () => {
                displayQuestion();
            });
            
            // Event listeners for the buttons inside the question modal.
            document.getElementById('hint-button').addEventListener('click', () => {
                document.getElementById('hint-box').classList.remove('hidden');
            });
            
            document.getElementById('close-modal-button').addEventListener('click', () => {
                hideModals();
            });
        }


        // --- III. DYNAMIC CONTENT GENERATION ---

        /**
         * Dynamically creates the topic buttons on the topic selection screen.
         * This function reads the keys from the 'gameData' object and creates an HTML
         * button for each one. This is a flexible design; adding a new topic to
         * 'gameData' will automatically add a new button on the screen.
         */
        function populateTopics() {
            const topicList = document.getElementById('topic-list');
            topicList.innerHTML = ''; // Clear any old content first.
            for (const topic in gameData) {
                const button = document.createElement('button');
                button.className = "p-6 bg-gray-800 hover:bg-blue-600 rounded-lg text-xl font-semibold transition-colors";
                button.textContent = topic;
                // Assign an onclick event to each button to handle topic selection.
                button.onclick = () => selectTopic(topic);
                topicList.appendChild(button);
            }
        }

        /**
         * Handles the logic when a user clicks a topic button.
         * @param {string} topic - The name of the topic that was selected.
         */
        function selectTopic(topic) {
            gameState.topic = topic;
            populateSubTopics(topic); // Prepare the next screen.
            showScreen('subtopics-screen'); // Show the next screen.
        }

        /**
         * Similar to populateTopics, this function dynamically creates the sub-topic buttons
         * based on the topic the user previously selected.
         * @param {string} topic - The parent topic selected by the user.
         */
        function populateSubTopics(topic) {
            const subtopicList = document.getElementById('subtopic-list');
            const subtopicTitle = document.getElementById('subtopic-title');
            subtopicTitle.textContent = `Sub-Topics for ${topic}`;
            subtopicList.innerHTML = '';
            const subtopics = gameData[topic];
            for (const subtopic in subtopics) {
                 // Check if the sub-topic actually has a question before creating a button.
                if (subtopics[subtopic].question) {
                    const button = document.createElement('button');
                    button.className = "subtopic-button p-4 bg-gray-800 hover:bg-blue-600 rounded-lg font-semibold transition-colors";
                    button.textContent = subtopic;
                    button.dataset.subtopic = subtopic; // Use data-* attribute to store the value.
                    subtopicList.appendChild(button);
                }
            }
        }


        // --- IV. CORE GAMEPLAY LOGIC ---

        /**
         * This function is called when a difficulty level is selected. It prepares the
         * game room by populating it with the player's and topic's information,
         * then displays the game screen.
         */
        function startGame() {
            // Personalize the game room UI with the stored gameState.
            document.getElementById('game-avatar-img').src = gameState.avatarSrc;
            document.getElementById('game-player-name').textContent = `Player: ${gameState.playerName}`;
            document.getElementById('game-topic-info').textContent = `${gameState.topic} > ${gameState.subTopic}`;
            const levelInfo = document.getElementById('game-level-info');
            levelInfo.textContent = gameState.level;
            
            // Apply conditional styling to the level badge based on difficulty.
            levelInfo.className = 'px-3 py-1 rounded-full text-white font-semibold'; // Reset classes first.
            if (gameState.level === 'Easy') levelInfo.classList.add('bg-green-600');
            if (gameState.level === 'Medium') levelInfo.classList.add('bg-yellow-500');
            if (gameState.level === 'Hard') levelInfo.classList.add('bg-red-600');

            showScreen('game-room-screen');
        }
        
        /**
         * Fetches the relevant question data based on the user's choices,
         * then populates and displays the question modal.
         */
        function displayQuestion() {
            const questionData = gameData[gameState.topic][gameState.subTopic];
            
            // Reset the modal to its default state before showing it.
            document.getElementById('hint-box').classList.add('hidden');
            document.getElementById('feedback-box').classList.add('hidden');
            document.getElementById('close-modal-button').classList.add('hidden');
            document.getElementById('hint-button').classList.remove('hidden');

            // Populate the modal with the question, hint, and options.
            document.getElementById('question-level').textContent = `${gameState.subTopic} ${gameState.level}`;
            document.getElementById('question-text').textContent = questionData.question;
            document.getElementById('hint-text').textContent = questionData.hint;
            
            const optionsContainer = document.getElementById('question-options');
            optionsContainer.innerHTML = ''; // Clear previous options.
            questionData.options.forEach(optionText => {
                const button = document.createElement('button');
                button.className = "p-3 bg-gray-700 hover:bg-blue-600 rounded-lg font-medium transition-colors";
                button.textContent = optionText;
                button.onclick = () => checkAnswer(optionText, questionData.answer);
                optionsContainer.appendChild(button);
            });

            showModal('question-modal');
        }
        
        /**
         * Checks if the player's selected answer is correct and provides immediate visual feedback.
         * @param {string} selectedOption - The answer the user clicked on.
         * @param {string} correctAnswer - The correct answer from the gameData object.
         */
        function checkAnswer(selectedOption, correctAnswer) {
            const feedbackBox = document.getElementById('feedback-box');
            const feedbackText = document.getElementById('feedback-text');
            
            // Make the feedback box visible and reset its color.
            feedbackBox.classList.remove('hidden', 'bg-green-500', 'bg-red-500');
            
            if (selectedOption === correctAnswer) {
                feedbackText.textContent = 'Correct! +1 Point';
                feedbackBox.classList.add('bg-green-500'); // Green for correct.
                document.getElementById('game-message').textContent = "Excellent! You solved the puzzle on the desk.";
            } else {
                feedbackText.textContent = 'Wrong Answer. Try again or use a hint.';
                feedbackBox.classList.add('bg-red-500'); // Red for incorrect.
            }
            
            // Update the UI to show the result and allow the user to close the modal.
            document.getElementById('hint-button').classList.add('hidden');
            document.getElementById('close-modal-button').classList.remove('hidden');
        }


        // --- V. APPLICATION ENTRY POINT ---
        // The 'DOMContentLoaded' event ensures that our JavaScript code only runs
        // after the entire HTML page has been loaded and is ready to be manipulated.
        document.addEventListener('DOMContentLoaded', initializeApp);
    