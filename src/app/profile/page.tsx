"use client";

import { usePreferences } from "@/components/providers/PreferencesProvider";

export default function ProfilePage() {
  const { language, currency, setLanguage, setCurrency } = usePreferences();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="panel p-6 space-y-6">
        <h2 className="font-semibold text-white">Preferences</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm subtle">Language</label>
            <select
              className="field w-full mt-1"
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
            >
              <option value="en">English</option>
              <option value="th">ไทย (Thai)</option>
            </select>
            <p className="text-white/70 text-xs mt-1">UI language (mock i18n).</p>
          </div>

          <div>
            <label className="text-sm subtle">Currency</label>
            <select
              className="field w-full mt-1"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
            >
              <option value="THB">THB – Thai Baht</option>
              <option value="USD">USD – US Dollar</option>
              <option value="EUR">EUR – Euro</option>
            </select>
            <p className="text-white/70 text-xs mt-1">Affects prices across the app.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
