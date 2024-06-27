function animatePageTransition(url) {
    const transitionOut = gsap.timeline({
        onComplete: () => {
            window.location.href = url;
        }
    });

    transitionOut.to("body", { opacity: 0, duration: 0.5 });
}

function animatePageEnter() {
    gsap.from("body", { opacity: 0, duration: 0.5 });
}

document.addEventListener('DOMContentLoaded', function() {
    animatePageEnter();

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetUrl = this.getAttribute('href');
            animatePageTransition(targetUrl);
        });
    });

    // Инициализация Telegram Web App
    const tg = window.Telegram.WebApp;
    tg.expand(); // Расширяем веб-приложение на весь экран

    // Получаем данные пользователя
    const user = tg.initDataUnsafe.user;

    // Обновляем имя пользователя в заголовке
    if (user) {
        const headerTitle = document.querySelector('.header-title');
        headerTitle.innerHTML = user.username || `${user.first_name} ${user.last_name}`;
    }

    // Инициализация TON Connect UI
    const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://smartanalyticsapp.github.io/SmartAnalytics/tonconnect-manifest.json',
        buttonRootId: 'ton-connect-btn'
    });

    tonConnectUI.connector.onStatusChange((status) => {
        if (status === 'connected') {
            document.querySelector('.offer-btn').classList.add('if-enable');
            document.querySelector('.offer-btn').classList.remove('if-disable');
            document.querySelector('.main-top_right p').textContent = 'Привязан'; // Clear any previous messages

        } else if (status === 'disconnected') {
            document.querySelector('.offer-btn').classList.add('if-disable');
            document.querySelector('.offer-btn').classList.remove('if-enable');
            document.querySelector('.main-top_right p').textContent = 'Не привязан'; // Clear any previous messages
        }
    });

    document.getElementById('disconnect-btn').addEventListener('click', async () => {
        try {
            // Disconnect the wallet using TON Connect UI
            await tonConnectUI.disconnect();

            // Update UI to reflect disconnected state
            

            // (Optional) Clear any displayed user information
            // ... (code to clear user info)

        } catch (error) {
            console.error('Error disconnecting wallet:', error);
            // Handle disconnection error (e.g., display an error message to the user)
        }
    });
});
