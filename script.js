const loadingContainer = document.getElementById('loading');
const loadingLogo = document.getElementById('loading-logo');
const loadingProgress = document.getElementById('loading-progress');

document.body.classList.add('loading');

if (loadingLogo) {
    loadingLogo.src = './assets/logo.png';
    loadingLogo.alt = '1170 East Logo';
}

let progress = 0;
const loadingInterval = setInterval(() => {
    progress += Math.random() * 8 + 2; 
    if (progress > 100) progress = 100;
    
    if (loadingProgress) {
        loadingProgress.style.width = progress + '%';
    }
    
    if (progress >= 100) {
        clearInterval(loadingInterval);
        setTimeout(() => {
            if (loadingContainer) {
                loadingContainer.style.opacity = '0';
                setTimeout(() => {
                    loadingContainer.style.display = 'none';
                    document.body.classList.remove('loading'); 
                    setTimeout(animateProgressBar, 500);
                }, 500);
            }
        }, 800);
    }
}, 200);


function animateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progressLabelLeft = document.querySelector('.progress-label-left');
    const container = document.querySelector('.container');
    
    let currentProgress = 0;
    const targetProgress = 90; 
    const animationDuration = 8000; 
    const incrementTime = 200; 
    const totalSteps = animationDuration / incrementTime;
    const progressPerStep = targetProgress / totalSteps;

    progressFill.style.width = '0%';
    progressLabelLeft.textContent = '0%';
    
    const progressInterval = setInterval(() => {
        currentProgress += progressPerStep;
        
        if (currentProgress >= targetProgress) {
            currentProgress = targetProgress;
            clearInterval(progressInterval);

            progressFill.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.6)';
            container.classList.add('pulse-effect');

            setTimeout(() => {
                progressFill.style.boxShadow = 'none';
                container.classList.remove('pulse-effect');
            }, 1000);
        }

        progressFill.style.width = currentProgress + '%';

        progressLabelLeft.textContent = Math.round(currentProgress) + '%';

        if (Math.round(currentProgress) % 10 === 0 && currentProgress > 0) {
            progressFill.style.transform = 'scale(1.02)';
            setTimeout(() => {
                progressFill.style.transform = 'scale(1)';
            }, 100);
        }
        
    }, incrementTime);
}

function restartAnimation() {
    const progressFill = document.querySelector('.progress-fill');
    const progressLabelLeft = document.querySelector('.progress-label-left');

    progressFill.style.width = '0%';
    progressFill.style.boxShadow = 'none';
    progressFill.style.transform = 'scale(1)';
    progressLabelLeft.textContent = '0%';

    setTimeout(animateProgressBar, 300);
}