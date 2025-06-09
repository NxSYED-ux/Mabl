// Login Page Logic
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('error-message');

    if (email === "user@test.com" && password === "mabl123") {
        window.location.href = "dashboard.html?user=Test+User";
    } else {
        errorElement.classList.remove('hidden');
        setTimeout(() => errorElement.classList.add('hidden'), 3000);
    }
});

// Dashboard Logic
if (document.getElementById('user-activity-table')) {
    // Mock Data
    const mockUsers = [
        { id: 1, name: "Alice Johnson", lastActive: "2023-10-15", status: "active", email: "alice@test.com" },
        { id: 2, name: "Bob Smith", lastActive: "2023-10-14", status: "inactive", email: "bob@test.com" },
        { id: 3, name: "Charlie Brown", lastActive: "2023-10-16", status: "active", email: "charlie@test.com" }
    ];

    // Initialize Chart
    const ctx = document.getElementById('traffic-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Sessions',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: '#4361ee',
                tension: 0.1
            }]
        }
    });

    // Render Table
    function renderTable(users) {
        const tbody = document.querySelector('#user-activity-table tbody');
        tbody.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.lastActive}</td>
                <td><span class="status-badge ${user.status}">${user.status}</span></td>
                <td><button class="text-btn view-user" data-id="${user.id}">View</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    // Filter/Search
    document.getElementById('status-filter').addEventListener('change', function() {
        const filtered = this.value === 'all' 
            ? mockUsers 
            : mockUsers.filter(user => user.status === this.value);
        renderTable(filtered);
    });

    document.getElementById('search-users').addEventListener('input', function() {
        const term = this.value.toLowerCase();
        const filtered = mockUsers.filter(user => 
            user.name.toLowerCase().includes(term) || 
            user.email.toLowerCase().includes(term)
        );
        renderTable(filtered);
    });

    // Modal
    document.querySelectorAll('.view-user').forEach(btn => {
        btn.addEventListener('click', function() {
            const user = mockUsers.find(u => u.id === parseInt(this.dataset.id));
            document.getElementById('modal-username').value = user.name;
            document.getElementById('modal-email').value = user.email;
            document.getElementById('user-modal').classList.remove('hidden');
        });
    });

    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('user-modal').classList.add('hidden');
    });

    // Initial Render
    renderTable(mockUsers);
}