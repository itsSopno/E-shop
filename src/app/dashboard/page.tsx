"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import { useSession } from "next-auth/react";
import gsap from "gsap";

interface PaymentItem {
  name: string;
  price: number;
}

interface Payment {
  transactionId: string;
  userEmail: string;
  totalAmount: number;
  paymentStatus: string;
  items: PaymentItem[];
}

interface DashboardData {
  totalRevenue: number;
  activeOrders: number;
  totalCustomers: number;
  avgSession: string;
  recentOrders: {
    id: string;
    customer: string;
    product: string;
    amount: string;
    status: string;
  }[];
  topProducts: { name: string; image: string; price: number }[];
  chartData: number[];
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<DashboardData>({
    totalRevenue: 0,
    activeOrders: 0,
    totalCustomers: 0,
    avgSession: "4m 32s",
    recentOrders: [],
    topProducts: [],
    chartData: [0, 0, 0, 0, 0, 0, 0],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = "https://t-mark-4.vercel.app";
        const [payRes, prodRes, topRes] = await Promise.all([
          fetch(`${baseUrl}/api/payment/paymentData`),
          fetch(`${baseUrl}/api/all-products/getall`),
          fetch(`${baseUrl}/api/top-products`)
        ]);

        const payData = await payRes.json();
        const prodData = await prodRes.json();
        const topData = await topRes.json();

        // Calculate Revenue & Orders
        const payments: Payment[] = payData.data || [];
        const completedPayments = payments.filter((p: Payment) => p.paymentStatus === "completed");
        const totalRevenue = completedPayments.reduce((sum: number, p: Payment) => sum + (p.totalAmount || 0), 0);
        
        // Count unique customers
        const uniqueEmails = new Set(payments.map((p: Payment) => p.userEmail));
        
        // Mocking chart data based on recent payments per day (last 7 days)
        const recentRevenue = [45, 60, 30, 80, 50, 95, 70]; // Default fallbacks
        
        setData({
          totalRevenue,
          activeOrders: payments.filter((p: Payment) => p.paymentStatus === "pending").length,
          totalCustomers: uniqueEmails.size || prodData.count || 0,
          avgSession: "5m 12s",
          recentOrders: payments.slice(-5).reverse().map((p: Payment) => ({
            id: p.transactionId?.substring(0, 8) || "N/A",
            customer: p.userEmail?.split("@")[0] || "Unknown",
            product: p.items?.[0]?.name || "Tech Item",
            amount: `$${p.totalAmount}`,
            status: p.paymentStatus.charAt(0).toUpperCase() + p.paymentStatus.slice(1)
          })),
          topProducts: (topData.topProducts || topData.data || []).slice(0, 4),
          chartData: recentRevenue
        });
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useLayoutEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "expo.out",
      });
      gsap.from(".content-section", {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        stagger: 0.2,
        ease: "expo.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  const stats = [
    { label: "Total Revenue", value: `$${data.totalRevenue.toLocaleString()}`, change: "+12.5%", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )},
    { label: "Active Orders", value: data.activeOrders.toString(), change: "+4.3%", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
        <path d="M6 2L3 6V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      </svg>
    )},
    { label: "Total Customers", value: data.totalCustomers.toString(), change: "+18.2%", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )},
    { label: "Avg. Session", value: data.avgSession, change: "-2.1%", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )},
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#D9FF00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div ref={containerRef} className="space-y-8 pb-12">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 content-section">
          <div>
            <h1 className="font-bebas text-4xl tracking-tight text-[#1A1A1A]">
              Analytics Overview
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Welcome back, {session?.user?.name || "Admin"}! Here&apos;s what&apos;s happening today.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold font-bebas tracking-wide hover:bg-gray-50 transition-colors">
              Download Report
            </button>
            <button className="px-4 py-2 bg-[#D9FF00] text-[#1A1A1A] rounded-xl text-sm font-bold font-bebas tracking-wide hover:shadow-[0_0_20px_rgba(217,255,0,0.4)] transition-all">
              Create New
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card bg-white p-6 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-50 rounded-2xl">
                  {stat.icon}
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.change.startsWith("+") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="font-bebas text-3xl font-bold text-[#1A1A1A]">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Middle Section: Chart and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 content-section">
          {/* Main Chart Card */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="font-bebas text-2xl tracking-wide">Revenue Performance</h3>
               <select className="bg-gray-50 border-none text-xs font-bold rounded-lg p-2 outline-none">
                 <option>Last 7 Days</option>
                 <option>Last 30 Days</option>
               </select>
            </div>
            <div className="flex-1 flex items-end gap-3 px-4">
              {data.chartData.map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <div 
                    className="w-full bg-gray-100 rounded-2xl relative overflow-hidden transition-all duration-500 group-hover:bg-[#D9FF00]/20"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute bottom-0 left-0 w-full bg-black group-hover:bg-[#D9FF00] transition-all duration-500" style={{ height: '30%' }}></div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Day {i+1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity/Orders Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col">
            <h3 className="font-bebas text-2xl tracking-wide mb-6">Recent Activity</h3>
            <div className="space-y-6 flex-1">
               {data.recentOrders.length > 0 ? data.recentOrders.slice(0, 4).map((order, i) => (
                 <div key={i} className="flex gap-4">
                   <div className="w-2 h-2 rounded-full bg-[#D9FF00] mt-2 ring-4 ring-[#D9FF00]/10"></div>
                   <div>
                     <p className="text-sm font-bold text-gray-800">{order.status} Order</p>
                     <p className="text-xs text-gray-400">#{order.id} • {order.customer}</p>
                   </div>
                 </div>
               )) : <p className="text-sm text-gray-400">No recent activity</p>}
               <div className="pt-4 mt-auto">
                 <button className="w-full py-4 bg-gray-50 rounded-2xl text-xs font-bold hover:bg-gray-100 transition-colors uppercase tracking-widest">
                   View All Notifications
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* Top Products Section */}
        <div className="content-section">
          <h3 className="font-bebas text-2xl tracking-wide mb-6">Top Selling Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.topProducts.length > 0 ? data.topProducts.map((product, i) => (
              <div key={i} className="bg-white p-4 rounded-3xl border border-gray-100 flex items-center gap-4 hover:shadow-lg transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex-shrink-0 overflow-hidden">
                  <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">{product.name}</p>
                  <p className="text-xs text-[#D9FF00] font-bold">${product.price}</p>
                </div>
              </div>
            )) : <p className="text-sm text-gray-400 col-span-full">No top products found.</p>}
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden content-section">
           <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-bebas text-2xl tracking-wide">Latest Orders</h3>
              <button className="text-xs font-bold text-[#D9FF00] bg-black px-4 py-2 rounded-xl hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all">
                View All
              </button>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-5 text-sm font-bold font-mono">{order.id}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold uppercase">
                            {order.customer.charAt(0)}
                          </div>
                          <span className="text-sm font-medium">{order.customer}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-medium text-gray-600">{order.product}</td>
                      <td className="px-8 py-5 text-sm font-bold text-black">{order.amount}</td>
                      <td className="px-8 py-5">
                        <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full ${
                          order.status === "Completed" || order.status === "Delivered" ? "bg-green-50 text-green-600" : 
                          order.status === "Pending" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      </div>
    </AuthGuard>
  );
}
