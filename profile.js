import TonConnect from "@tonconnect/sdk";
import { TonConnectUI, init } from "@tonconnect/ui";

document.addEventListener("DOMContentLoaded", () => {
    // Инициализация Telegram Web App
    const tg = window.Telegram.WebApp;
    tg.expand(); // Расширяем веб-приложение на весь экран

    // Получаем данные пользователя
    const user = tg.initDataUnsafe.user;

    // Обновляем имя пользователя в заголовке
    if (user) {
        document.querySelector('.header-title').innerHTML = user.first_name + ' ' + (user.last_name || '');
    }

    // Инициализация TON Connect UI
    const tonConnectUI = new TonConnectUI({
        manifestUrl: 'https://your-domain.com/tonconnect-manifest.json',
        buttonRootId: 'ton-connect-btn'
    });

    tonConnectUI.onStatusChange((status) => {
        console.log('Status changed:', status);
        if (status === 'connected') {
            const offerBtn = document.querySelector('.offer-btn');
            offerBtn.classList.remove('if-disable');
            offerBtn.classList.add('if-enable');
            alert('Wallet connected!');
        }
    });

    document.getElementById('ton-connect-btn').addEventListener('click', async () => {
        try {
            await tonConnectUI.connectWallet();
        } catch (error) {
            console.error('Error connecting to wallet:', error);
            if (error.message.includes('declined')) {
                alert('Connection declined by user');
            } else {
                alert('Error connecting to wallet: ' + error.message);
            }
        }
    });
});
