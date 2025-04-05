document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const togglePassword = document.getElementById('togglePassword');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update icon based on password visibility
        const svg = this.querySelector('svg');
        if (type === 'password') {
            svg.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            `;
        } else {
            svg.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            `;
        }
    });

    // Real-time email validation
    emailInput.addEventListener('input', function() {
        validateEmail();
    });

    // Real-time password validation
    passwordInput.addEventListener('input', function() {
        validatePassword();
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            // Here you would typically send the form data to your server
            console.log('فرم معتبر است، در حال ارسال...');
            // loginForm.submit(); // Uncomment this line when ready to submit
        }
    });

    function validateEmail() {
        const email = emailInput.value.trim();
        
        if (email === '') {
            showError(emailError, 'وارد کردن ایمیل الزامی است');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            showError(emailError, 'لطفاً یک ایمیل معتبر وارد کنید');
            return false;
        }
        
        hideError(emailError);
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value.trim();
        
        if (password === '') {
            showError(passwordError, 'وارد کردن رمز عبور الزامی است');
            return false;
        }
        
        if (password.length < 6) {
            showError(passwordError, 'رمز عبور باید حداقل ۶ کاراکتر باشد');
            return false;
        }
        
        hideError(passwordError);
        return true;
    }

    function showError(element, message) {
        element.textContent = message;
        element.classList.remove('hidden');
    }

    function hideError(element) {
        element.textContent = '';
        element.classList.add('hidden');
    }
}); 