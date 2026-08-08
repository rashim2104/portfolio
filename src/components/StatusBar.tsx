"use client";

import { useEffect, useState } from "react";
import styles from "@/components/StatusBar.module.css";

const chennaiTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export const StatusBar = () => {
  // The clock is client-only on purpose: rendering a server timestamp would
  // hydrate to a different minute and flash.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(chennaiTime.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <span className={`${styles.group} ${styles.truncate}`}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.truncate}>Software Developer</span>
          <span className={`${styles.sep} ${styles.hideSmall}`} aria-hidden="true">
            /
          </span>
          <span className={styles.hideSmall}>Skcript</span>
        </span>

        <span className={styles.group}>
          <span>Chennai</span>
          <span className={styles.sep} aria-hidden="true">
            /
          </span>
          <span className={styles.clock}>{time ? `${time} IST` : "      IST"}</span>
        </span>
      </div>
    </div>
  );
};
