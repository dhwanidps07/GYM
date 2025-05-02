document.addEventListener('DOMContentLoaded', function() {
  // Initialize Chart
  const ctx = document.createElement('canvas');
  document.querySelector('.stats-overview').appendChild(ctx);
  
  const workoutChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
              label: 'Workout Minutes',
              data: [30, 45, 40, 50, 35, 60, 45],
              borderColor: '#4a6bff',
              backgroundColor: 'rgba(74, 107, 255, 0.1)',
              tension: 0.4,
              fill: true
          }]
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  display: false
              }
          },
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });

  // Mobile Menu Toggle
  const mobileMenuToggle = document.createElement('button');
  mobileMenuToggle.className = 'mobile-menu-toggle';
  mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  document.querySelector('.side-nav').prepend(mobileMenuToggle);
  
  mobileMenuToggle.addEventListener('click', function() {
      document.querySelector('.nav-menu').classList.toggle('show');
  });

  // Simulate loading user data
  setTimeout(() => {
      // Update user stats
      document.querySelector('.stat-card:nth-child(1) p').textContent = '1,450 kcal';
      document.querySelector('.stat-card:nth-child(2) p').textContent = '7 hours';
      document.querySelector('.stat-card:nth-child(3) p').textContent = '38 completed';
      document.querySelector('.stat-card:nth-child(4) p').textContent = '8 days';
      
      // Update chart data
      workoutChart.data.datasets[0].data = [35, 50, 45, 55, 40, 65, 50];
      workoutChart.update();
  }, 1500);

  // Workout plan click handler
  document.querySelectorAll('.plan-card').forEach(card => {
      card.addEventListener('click', function(e) {
          if (!e.target.classList.contains('btn')) {
              alert(Starting ${this.querySelector('h3').textContent} workout plan);
          }
      });
  });

  // Start workout button
  document.querySelector('.workout-card .btn').addEventListener('click', function() {
      alert('Starting today\'s workout: Upper Body Strength');
  });

  // New workout button
  document.querySelector('.header-actions .btn').addEventListener('click', function() {
      alert('Creating new workout plan');
  });
});