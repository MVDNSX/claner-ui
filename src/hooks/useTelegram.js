
export const useTelegram = () => {
  const tg = window.Telegram?.WebApp;

  return {
    tg,
    userId: tg?.initDataUnsafe?.user?.id,
    isTelegramAgent: !!tg?.initData,
    avatar: tg?.initDataUnsafe?.user?.photo_url
  };
};