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
    const userImage = session?.user?.image;

    useEffect(() => {
        const fetchPaymentData = async () => {
            if (status === "loading") return;
            if (!userEmail) {
                SetLoading(false);
                return;
            }

            SetLoading(true);
            try {
                const response = await fetch("https://t-mark-4.vercel.app/api/payment/paymentData");
                if (!response.ok) throw new Error("Network response was not ok");

                const result = await response.json();
                const data = result.data || result;

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
                    <p className="font-bebas text-white/50 tracking-widest uppercase">Syncing Arsenal...</p>
                </div>
            </section>
        );
    }

    if (status === "unauthenticated") {
        return (
            <section className="bg-black min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center p-10 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl">
                    <h2 className="text-3xl font-bebas tracking-widest text-white mb-6">Access Restricted</h2>
                    <p className="text-white/40 mb-8 font-inter text-sm uppercase tracking-widest">Identify Yourself to Access History</p>
                    <Link href="/login" className="px-10 py-4 bg-[#d9ff00] text-black font-black uppercase tracking-tighter rounded-full hover:scale-110 transition-transform duration-300">
                        Login Now
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="bg-black text-white min-h-screen font-inter overflow-x-hidden flex items-center justify-center">
                <div className="max-w-4xl w-full py-20 px-6 flex flex-col items-center">

                    {/* User Profile Section */}
                    <div className="flex flex-col items-center mb-16 space-y-4">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#d9ff00] shadow-[0_0_30px_rgba(217,255,0,0.2)]">
                            {userImage ? (
                                <Image src={userImage} alt="User" fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-3xl font-bebas text-[#d9ff00]">
                                    {session?.user?.name?.charAt(0) || "S"}
                                </div>
                            )}
                        </div>
                        <div className="text-center">
                            <h1 className="text-xl font-bold tracking-tight text-white mb-1">{session?.user?.name}</h1>
                            <p className="text-[#d9ff00] text-xs font-mono uppercase tracking-[0.3em]">{userEmail}</p>
                        </div>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bebas italic mb-12 tracking-tighter text-center uppercase">
                        Transaction <span className="text-[#d9ff00]">Log</span>
                    </h2>

                    {paymentData.length > 0 ? (
                        <div className="w-full space-y-8">
                            {paymentData.map((item: Payment) => (
                                <div
                                    key={item._id}
                                    className="relative group w-full bg-white/5 border border-white/10 p-10 md:p-12 flex flex-col items-center text-center rounded-[40px] hover:border-[#d9ff00]/30 transition-all duration-500 overflow-hidden"
                                >
                                    {/* Background Accent */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#d9ff00]/5 blur-3xl -mr-10 -mt-10 group-hover:bg-[#d9ff00]/10 transition-colors"></div>

                                    <div className="mb-6">
                                        <h3 className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-3 font-bold">Ref ID</h3>
                                        <p className="font-mono text-xs md:text-sm text-white/60 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                            {item.transactionId}
                                        </p>
                                    </div>

                                    <div className="mb-8">
                                        <p className="text-5xl md:text-7xl font-bebas font-black tracking-tighter mb-2">
                                            ${item.totalAmount.toFixed(2)}
                                        </p>
                                        <span className={`inline-block text-[10px] uppercase font-black tracking-[0.3em] px-6 py-2 rounded-full border-2 ${item.paymentStatus === 'pending'
                                            ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/5'
                                            : 'border-[#d9ff00]/50 text-[#d9ff00] bg-[#d9ff00]/5 shadow-[0_0_20px_rgba(217,255,0,0.1)]'
                                            }`}>
                                            {item.paymentStatus}
                                        </span>
                                    </div>

                                    {/* Items Preview */}
                                    <div className="flex flex-wrap justify-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                                        {item.items.map((orderItem, i) => (
                                            <div key={i} className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/10 rounded-md bg-white/5">
                                                {orderItem.name} x {orderItem.quantity}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full border-2 border-dashed border-white/10 p-24 flex flex-col items-center justify-center rounded-[50px] bg-white/[0.02]">
                            <p className="text-white/20 font-bebas text-4xl tracking-widest uppercase italic mb-4">No Records Found</p>
                            <p className="text-white/10 text-xs uppercase tracking-[0.4em] text-center">Your arsenal history is currently empty for {userEmail}</p>
                            <Link href="/Store" className="mt-10 text-[#d9ff00] text-xs font-bold uppercase tracking-widest border-b border-[#d9ff00]/30 pb-1 hover:border-[#d9ff00] transition-all">
                                Go to Store
                            </Link>
                        </div>
                    )}
                </div>

                {/* Visual Watermark */}
                <div className="fixed bottom-10 right-10 opacity-10 font-bebas text-8xl italic pointer-events-none select-none text-white overflow-hidden">
                    SINNERS
                </div>
            </section>
        </>
    );
}

export default PaymentPage;
