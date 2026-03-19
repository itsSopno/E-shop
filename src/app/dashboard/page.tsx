"use client";

import React from "react";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import { useSession } from "next-auth/react";
import styles from "./dashboard.module.scss";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <AuthGuard>
      <div className={styles.dashboard}>
        <div className="container">
          <div className={styles.header}>
            <h1>Welcome back, {session?.user?.name || session?.user?.email}!</h1>
            <p>Here is an overview of your account activity.</p>
          </div>

          <div className={styles.stats}>
            <div className={styles.statCard}>
              <label>Total Orders</label>
              <div className={styles.value}>12</div>
            </div>
            <div className={styles.statCard}>
              <label>Wishlist Items</label>
              <div className={styles.value}>5</div>
            </div>
            <div className={styles.statCard}>
              <label>Loyalty Points</label>
              <div className={styles.value}>450</div>
            </div>
          </div>

          <div className={styles.recentActivity}>
            <h2>Recent Activity</h2>
            <p>No recent activity found.</p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
