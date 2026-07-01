"use client";

import CookieConsent from "react-cookie-consent";
import { useTranslations } from "next-intl";

export default function CookieBanner() {
  const t = useTranslations('CookieBanner');

  return (
    <CookieConsent
      location="bottom"
      buttonText={t('accept')}
      declineButtonText={t('decline')}
      enableDeclineButton
      style={{
        background: "rgba(31, 41, 55, 0.95)",
        color: "#f9fafb",
        fontSize: "14px",
        padding: "15px",
        backdropFilter: "blur(8px)",
        borderTop: "1px solid #374151",
      }}
      buttonStyle={{
        background: "#10b981",
        color: "#f9fafb",
        fontSize: "14px",
        borderRadius: "5px",
        padding: "10px 20px",
        marginRight: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}
      declineButtonStyle={{
        background: "#ef4444",
        color: "#f9fafb",
        fontSize: "14px",
        borderRadius: "5px",
        padding: "10px 20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      {t('message')}
    </CookieConsent>
  );
}
