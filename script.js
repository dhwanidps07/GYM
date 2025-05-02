document.addEventListener('DOMContentLoaded', function() {
  // Tab Navigation
  const navItems = document.querySelectorAll('.main-nav li');
  const tabContents = document.querySelectorAll('.tab-content');
  
  navItems.forEach(item => {
      item.addEventListener('click', function() {
          // Remove active class from all nav items and tab contents
          navItems.forEach(navItem => navItem.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          
          // Add active class to clicked nav item
          this.classList.add('active');
          
          // Show corresponding tab content
          const tabId = this.getAttribute('data-tab');
          document.getElementById(tabId).classList.add('active');
      });
  });
  
  // Sample Data
  const recentWorkouts = [
      { name: 'Full Body Workout', date: 'Today', duration: '45 min', exercises: 12 },
      { name: 'Morning Yoga', date: 'Yesterday', duration: '30 min', exercises: 8 },
      { name: 'Upper Body Strength', date: 'May 28', duration: '35 min', exercises: 10 }
  ];
  
  const exercises = [
      { name: 'Push Ups', category: 'strength', sets: '3', reps: '12', gif: 'https://via.placeholder.com/200' },
      { name: 'Squats', category: 'strength', sets: '3', reps: '15', gif: 'https://via.placeholder.com/200' },
      { name: 'Plank', category: 'core', sets: '3', duration: '30 sec', gif: 'https://via.placeholder.com/200' },
      { name: 'Running', category: 'cardio', duration: '20 min', gif: 'https://via.placeholder.com/200' },
      { name: 'Bicep Curls', category: 'strength', sets: '3', reps: '12', gif: 'https://via.placeholder.com/200' },
      { name: 'Jumping Jacks', category: 'cardio', sets: '3', reps: '30', gif: 'https://via.placeholder.com/200' }
  ];
  
  // Populate Recent Workouts
  const recentWorkoutsList = document.getElementById('recentWorkoutsList');
  recentWorkouts.forEach(workout => {
      const workoutItem = document.createElement('div');
      workoutItem.className = 'workout-item';
      workoutItem.innerHTML = `
          <div class="workout-item-info">
              <h4>${workout.name}</h4>
              <p>${workout.date} • ${workout.exercises} exercises</p>
          </div>
          <div class="workout-item-duration">${workout.duration}</div>
      `;
      recentWorkoutsList.appendChild(workoutItem);
  });
  
  // Populate Exercise Library
  const exerciseList = document.getElementById('exerciseList');
  exercises.forEach(exercise => {
      const exerciseCard = document.createElement('div');
      exerciseCard.className = 'exercise-card';
      
      const details = exercise.reps 
          ? ${exercise.sets} sets • ${exercise.reps} reps 
          : ${exercise.duration};
      
      exerciseCard.innerHTML = `
          <img src="${exercise.gif}" alt="${exercise.name}">
          <div class="exercise-card-info">
              <h3>${exercise.name}</h3>
              <p>${details}</p>
              <div class="exercise-card-meta">
                  <span><i class="fas fa-tag"></i> ${exercise.category}</span>
              </div>
          </div>
      `;
      exerciseList.appendChild(exerciseCard);
  });
  
  // Exercise Search Functionality
  const exerciseSearch = document.getElementById('exerciseSearch');
  exerciseSearch.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const exerciseCards = document.querySelectorAll('.exercise-card');
      
      exerciseCards.forEach(card => {
          const exerciseName = card.querySelector('h3').textContent.toLowerCase();
          if (exerciseName.includes(searchTerm)) {
              card.style.display = 'block';
          } else {
              card.style.display = 'none';
          }
      });
  });
  
  // Exercise Category Filter
  const exerciseCategory = document.getElementById('exerciseCategory');
  exerciseCategory.addEventListener('change', function() {
      const category = this.value;
      const exerciseCards = document.querySelectorAll('.exercise-card');
      
      exerciseCards.forEach(card => {
          const exerciseCat = card.querySelector('.exercise-card-meta span').textContent.toLowerCase();
          if (category === 'all' || exerciseCat.includes(category)) {
              card.style.display = 'block';
          } else {
              card.style.display = 'none';
          }
      });
  });
  
  // Workout Modal
  const workoutModal = document.getElementById('workoutModal');
  const startWorkoutBtn = document.getElementById('startWorkoutBtn');
  const closeModal = document.querySelector('.close-modal');
  const nextExerciseBtn = document.getElementById('nextExerciseBtn');
  const prevExerciseBtn = document.getElementById('prevExerciseBtn');
  
  startWorkoutBtn.addEventListener('click', function() {
      document.getElementById('currentWorkoutName').textContent = 'Full Body Blast';
      document.getElementById('currentExerciseName').textContent = 'Push Ups';
      document.getElementById('currentExerciseDetails').textContent = '3 sets • 12 reps';
      document.getElementById('exerciseGif').src = 'https://via.placeholder.com/200';
      
      workoutModal.style.display = 'flex';
      startTimer();
  });
  
  closeModal.addEventListener('click', function() {
      workoutModal.style.display = 'none';
      resetTimer();
  });
  
  // Sample workout exercises
  const workoutExercises = [
      { name: 'Push Ups', details: '3 sets • 12 reps', gif: 'https://via.placeholder.com/200' },
      { name: 'Squats', details: '3 sets • 15 reps', gif: 'https://via.placeholder.com/200' },
      { name: 'Plank', details: '3 sets • 30 sec', gif: 'https://via.placeholder.com/200' },
      { name: 'Bicep Curls', details: '3 sets • 12 reps', gif: 'https://via.placeholder.com/200' }
  ];
  
  let currentExerciseIndex = 0;
  
  nextExerciseBtn.addEventListener('click', function() {
      if (currentExerciseIndex < workoutExercises.length - 1) {
          currentExerciseIndex++;
          updateExerciseDisplay();
      } else {
          // End of workout
          alert('Workout completed! Great job!');
          workoutModal.style.display = 'none';
          resetTimer();
          currentExerciseIndex = 0;
      }
  });
  
  prevExerciseBtn.addEventListener('click', function() {
      if (currentExerciseIndex > 0) {
          currentExerciseIndex--;
          updateExerciseDisplay();
      }
  });
  
  function updateExerciseDisplay() {
      const currentExercise = workoutExercises[currentExerciseIndex];
      document.getElementById('currentExerciseName').textContent = currentExercise.name;
      document.getElementById('currentExerciseDetails').textContent = currentExercise.details;
      document.getElementById('exerciseGif').src = currentExercise.gif;
  }
  
  // Timer Functionality
  let timerInterval;
  let seconds = 0;
  
  function startTimer() {
      timerInterval = setInterval(function() {
          seconds++;
          updateTimerDisplay();
      }, 1000);
  }
  
  function resetTimer() {
      clearInterval(timerInterval);
      seconds = 0;
      updateTimerDisplay();
  }
  
  function updateTimerDisplay() {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      document.getElementById('workoutTime').textContent = 
          ${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')};
  }
  
  // Settings Form
  const saveSettingsBtn = document.getElementById('saveSettingsBtn');
  saveSettingsBtn.addEventListener('click', function() {
      const userName = document.getElementById('userName').value;
      const userEmail = document.getElementById('userEmail').value;
      const userWeight = document.getElementById('userWeight').value;
      const userHeight = document.getElementById('userHeight').value;
      
      if (userName) {
          document.getElementById('username').textContent = userName;
      }
      
      alert('Settings saved successfully!');
  });
  
  // Initialize Chart
  const ctx = document.getElementById('workoutsChart').getContext('2d');
  const workoutsChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
              label: 'Workouts per Month',
              data: [3, 5, 6, 8, 7, 9],
              backgroundColor: 'rgba(74, 107, 255, 0.2)',
              borderColor: 'rgba(74, 107, 255, 1)',
              borderWidth: 2,
              tension: 0.4,
              fill: true
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
});