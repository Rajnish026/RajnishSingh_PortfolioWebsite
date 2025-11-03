(function() {
	const navToggle = document.getElementById('navToggle');
	const navMenu = document.getElementById('navMenu');
	const themeToggle = document.getElementById('themeToggle');
	const yearEl = document.getElementById('year');

	if (yearEl) {
		yearEl.textContent = new Date().getFullYear();
	}

	if (navToggle && navMenu) {
		navToggle.addEventListener('click', function() {
			navMenu.classList.toggle('open');
		});
	}

	const THEME_KEY = 'prefers-dark';
	const root = document.documentElement;

	function applyTheme(dark) {
		if (dark) {
			root.style.setProperty('--bg', '#0b1220');
			root.style.setProperty('--panel', '#111a2e');
			root.style.setProperty('--text', '#dbe7ff');
			root.style.setProperty('--muted', '#a9b6d8');
			root.style.setProperty('--border', '#233152');
			root.style.setProperty('--hover-bg', '#0f1a31');
			root.style.setProperty('--header-bg', 'rgba(11, 18, 32, 0.8)');
			root.style.setProperty('--bio-text', '#c8d6ff');
			root.style.setProperty('--accent-light', '#79a6ff');
			root.style.setProperty('--hover-border', '#395697');
			root.style.setProperty('--card-hover-border', '#385796');
			if (themeToggle) themeToggle.textContent = '🌙';
		} else {
			root.style.setProperty('--bg', '#f7f9fe');
			root.style.setProperty('--panel', '#ffffff');
			root.style.setProperty('--text', '#0f1628');
			root.style.setProperty('--muted', '#4a587a');
			root.style.setProperty('--border', '#d7def0');
			root.style.setProperty('--hover-bg', '#e8edf8');
			root.style.setProperty('--header-bg', 'rgba(247, 249, 254, 0.8)');
			root.style.setProperty('--bio-text', '#2d3f66');
			root.style.setProperty('--accent-light', '#5b8ef5');
			root.style.setProperty('--hover-border', '#3d5b94');
			root.style.setProperty('--card-hover-border', '#b5c9f0');
			if (themeToggle) themeToggle.textContent = '☀️';
		}
	}

	try {
		const stored = localStorage.getItem(THEME_KEY);
		if (stored !== null) {
			applyTheme(stored === 'true');
		}
	} catch (e) { /* no-op */ }

	if (themeToggle) {
		themeToggle.addEventListener('click', function() {
			const currentDark = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() === '#0b1220';
			applyTheme(!currentDark);
			try { localStorage.setItem(THEME_KEY, String(!currentDark)); } catch (e) { /* no-op */ }
		});
	}

	// Contact form demo handler
	window.handleContactSubmit = function(event) {
		event.preventDefault();
		alert('Thanks for reaching out! This demo shows a success message locally.');
		return false;
	};

	// Resume buttons functionality
	const viewResumeBtn = document.getElementById('viewResumeBtn');
	const downloadResumeBtn = document.getElementById('downloadResumeBtn');
	const resumeError = document.getElementById('resumeError');
	const resumePath = 'assets/resume/single-page-resume.html';

	if (viewResumeBtn) {
		viewResumeBtn.addEventListener('click', function() {
			try {
				window.open(resumePath, '_blank');
			} catch (error) {
				showResumeError('Error viewing the resume: ' + error.message);
			}
		});
	}

	if (downloadResumeBtn) {
		downloadResumeBtn.addEventListener('click', function() {
			try {
				// For HTML resume, we'll use print functionality to save as PDF
				const printWindow = window.open(resumePath, '_blank');
				if (printWindow) {
					// Wait for the page to load before triggering print
					printWindow.addEventListener('load', function() {
						printWindow.print();
					});
				}
			} catch (error) {
				showResumeError('Error downloading the resume: ' + error.message);
			}
		});
	}


	function showResumeError(message) {
		if (resumeError) {
			resumeError.textContent = message || 'There was an error accessing the resume. Please try again later.';
			resumeError.style.display = 'block';
			
			// Hide the error message after 5 seconds
			setTimeout(() => {
				resumeError.style.display = 'none';
			}, 5000);
		}
	}
})();

