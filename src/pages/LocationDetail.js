import { useLocation } from "react-router-dom"; // برای دریافت اطلاعات ارسال‌شده از صفحه قبلی

export default function LocationDetail() {
  const { state } = useLocation(); // دریافت اطلاعات از state
  const place = state ? state.place : null;

  if (!place) {
    return <div>مکان مورد نظر یافت نشد</div>;
  }

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">جزئیات مکان</h2>
      <p>شناسه مکان: {place.id}</p>
      <p>نام: {place.name}</p>
      <p>نوع: {place.type}</p>
      <p>مختصات: {place.lat}, {place.lng}</p>
    </div>
  );
}
