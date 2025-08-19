"use client";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import type { Language, Currency } from "@/components/providers/PreferencesProvider";

export default function ProfilePage() {
  const { language, setLanguage, currency, setCurrency } = usePreferences();

  const onLangChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setLanguage(e.target.value as Language);

  const onCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCurrency(e.target.value as Currency);

  return (
    <div className="panel-light p-6 space-y-4">
      <label className="block text-sm font-medium">Language</label>
      <select value={language} onChange={onLangChange} className="field w-full">
        <option value="en">English</option>
        <option value="th">ไทย</option>
      </select>

      <label className="block text-sm font-medium mt-4">Currency</label>
      <select value={currency} onChange={onCurrencyChange} className="field w-full">
        <option value="THB">THB – Thai Baht</option>
        <option value="USD">USD – US Dollar</option>
        <option value="EUR">EUR – Euro</option>
      </select>
    </div>
  );
}
