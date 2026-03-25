"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./payment.module.scss";
import { useSession } from "next-auth/react";

interface OrderItem {
    name: string;
    price: number;
    _id: string;
    image: string;
    quantity: number;
}

interface Payment {
    _id: string;
    userEmail: string;
    userImage: string;
    items: OrderItem[];
    totalAmount: number;
    paymentStatus: string;
    transactionId: string;
}

const PaymentPage = () => {
    const { data: session, status } = useSession();
    const [paymentData, SetPaymentData] = useState<Payment[]>([]);
    const [loading, SetLoading] = useState<boolean>(true);

    const userEmail = session?.user?.email;

    useEffect(() => {
        const fetchPaymentData = async () => {
            if (status === "loading") return;
            if (!userEmail) {
                SetLoading(false);
                return;
            }

            SetLoading(true);
            try {
                // Note: Fetching all and filtering on client is okay for small data, 
                // but usually better to filter on backend.
                const response = await fetch("https://t-mark-4.vercel.app/api/payment/paymentData");
                if (!response.ok) throw new Error("Network response was not ok");

                const result = await response.json();
                const data = result.data || result; // Handle both {data: [...]} and [...] formats

                if (Array.isArray(data)) {
                    const myPaymentData = data.filter((item: Payment) => item.userEmail === userEmail);
                    SetPaymentData(myPaymentData);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                SetLoading(false);
            }
        };

        fetchPaymentData();
    }, [userEmail, status]);

    if (status === "loading" || loading) {
        return (
            <section className={styles.section}>
                <div className={styles.loadingWrapper}>
                    <div className={styles.spinner}></div>
                    <p className="font-bebas text-white/50 tracking-widest">Loading Arsenal...</p>
                </div>
            </section>
        );
    }

    if (status === "unauthenticated") {
        return (
            <section className={styles.section}>
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <h2 className="text-2xl font-bold mb-4">Please log in to view your history</h2>
                    <Link href="/login" className="px-6 py-2 bg-white text-black font-bold rounded-full">Login</Link>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="bg-black text-white min-h-screen">
                <div className="payment-container py-10 px-5 max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bebas mb-10 tracking-widest text-[#FDFDFD]">Your Transaction History</h2>

                    {paymentData.length > 0 ? (
                        <div className="grid gap-6">
                            {paymentData.map((item: Payment) => (
                                <div
                                    key={item._id}
                                    className="payment-card border border-white/10 p-8 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-white/5 transition-all duration-300 rounded-lg backdrop-blur-sm"
                                >
                                    <div className="mb-4 md:mb-0">
                                        <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2 font-inter">Transaction ID</h3>
                                        <p className="font-mono text-lg text-white/90">{item.transactionId}</p>
                                    </div>

                                    <div className="flex flex-col items-start md:items-end">
                                        <p className="text-2xl font-bebas tracking-wider mb-2">${item.totalAmount.toFixed(2)}</p>
                                        <span className={`text-[10px] uppercase font-inter tracking-[0.2em] px-4 py-1.5 rounded-full border ${item.paymentStatus === 'pending' 
                                            ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5' 
                                            : 'border-green-500/30 text-green-500 bg-green-500/5'
                                            }`}>
                                            {item.paymentStatus}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="border border-dashed border-white/20 p-20 flex flex-col items-center justify-center rounded-xl bg-white/5">
                            <p className="text-white/40 font-inter tracking-widest uppercase text-sm">No records found for {userEmail}</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default PaymentPage;