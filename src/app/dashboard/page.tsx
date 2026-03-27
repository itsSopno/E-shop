"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import { useSession } from "next-auth/react";
import gsap from "gsap";
import { ShoppingBag, TrendingUp, Package, ArrowUpRight, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentItem {
  name: string;
  price: number;
}

interface Payment {
  _id: string;
  userEmail: string;
  totalAmount: number;
  paymentStatus: string;
  transactionId: string;
  items: PaymentItem[];
}

interface PriceAnalysis {
  range: string;
  count: number;
  percentage: number;
}

interface DashboardData {
  totalRevenue: number;
  activeOrders: number;
  totalCustomers: number;
  recentOrders: Payment[];
  topProducts: any[];
  priceAnalysis: PriceAnalysis[];
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<DashboardData>({
    totalRevenue: 0,
    activeOrders: 0,
    totalCustomers: 0,
    recentOrders: [],
    topProducts: [],
    priceAnalysis: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = "https://t-mark-4.onrender.com";
        const [payRes, prodRes] = await Promise.all([
          fetch(`${baseUrl}/api/payment/paymentData`),
          fetch(`${baseUrl}/api/all-products/getall`),
        ]);

        const payJson = await payRes.json();
        const prodJson = await prodRes.json();

        const payments: Payment[] = payJson.data || [];
        const products = prodJson.data || [];

        // 1. Revenue Calculation
        const completed = payments.filter(p => p.paymentStatus === "completed" || p.paymentStatus === "paid" || p.paymentStatus === "pending");
        const totalRevenue = completed.reduce((sum, p) => sum + (Number(p.totalAmount) || 0), 0);

        // 2. Price Range Analysis
        const ranges = [
          { label: "Budget (<$100)", min: 0, max: 100, count: 0 },
          { label: "Mid-Range ($100-$300)", min: 101, max: 300, count: 0 },
          { label: "Pro ($300-$600)", min: 301, max: 600, count: 0 },
          { label: "Elite ($600+)", min: 601, max: Infinity, count: 0 },
        ];

        completed.forEach(p => {
          const amount = Number(p.totalAmount);
          ranges.forEach(r => {
            if (amount >= r.min && amount <= r.max) r.count++;
          });
        });

        const priceAnalysis = ranges.map(r => ({
          range: r.label,
          count: r.count,
          percentage: (r.count / (completed.length || 1)) * 100
        }));

        setData({
          totalRevenue,
          activeOrders: payments.filter(p => p.paymentStatus === "pending").length,
          totalCustomers: new Set(payments.map(p => p.userEmail)).size,
          recentOrders: payments.slice(-8).reverse(),
          topProducts: products.slice(0, 4),
          priceAnalysis,
        });
      } catch (error) {
        console.error("Dashboard Sync Error:", error);
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
        y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)"
      });
      gsap.from(".reveal-up", {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6 bg-[#050505] relative z-[200]">
        <div className="relative w-24 h-24">
           {/* Cyber Loading Ring */}
           <div className="absolute inset-0 border-2 border-white/5 rounded-full" />
           <div className="absolute inset-0 border-t-2 border-[#D9FF00] rounded-full animate-spin" />
           <div className="absolute inset-0 flex items-center justify-center font-bebas text-[#D9FF00] text-3xl animate-pulse">S</div>
        </div>
        <div className="text-center">
          <p className="font-bebas text-[#D9FF00] tracking-[8px] text-xs mb-2">SYNCHRONIZING_CORE_SYSTEM</p>
          <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Accessing Secure Data Stream...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div ref={containerRef} className="space-y-12 pb-24 bg-[#050505] min-h-screen p-4 md:p-10 selection:bg-[#D9FF00] selection:text-black scroll-smooth">

        {/* Header Section */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 reveal-up relative border-b border-white/5 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="px-3 py-1 bg-[#D9FF00]/10 border border-[#D9FF00]/20 rounded-full">
                 <span className="text-[10px] font-mono text-[#D9FF00] tracking-[2px] uppercase">Super_Admin_v4.2</span>
               </div>
               <div className="h-[1px] w-12 bg-white/10" />
               <span className="text-[10px] font-mono text-white/20 tracking-[2px] uppercase">Node: {session?.user?.email?.split('@')[0]}</span>
            </div>
            <h1 className="font-bebas text-8xl md:text-9xl tracking-tighter text-white leading-[0.85]">COMMAND_CENTER</h1>
            <div className="flex items-center gap-4 text-white/30 font-mono text-[10px] uppercase tracking-[5px]">
               <Activity size={12} className="text-[#D9FF00]" />
               <span>Real-time Operational Dashboard</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bebas tracking-[4px] text-sm hover:bg-white hover:text-black transition-all duration-500 rounded-xl group overflow-hidden relative">
              <span className="relative z-10 flex items-center gap-3">
                <Activity size={16} /> SYSTEM_LOGS
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
            <button className="px-10 py-5 bg-[#D9FF00] text-black font-bebas tracking-[4px] text-base hover:shadow-[0_0_50px_rgba(217,255,0,0.4)] transition-all duration-700 rounded-xl font-bold border-2 border-[#D9FF00]">
              GENERATE_INTEL_REPORT
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Gross Revenue Current Cycle", value: `$${data.totalRevenue.toLocaleString()}`, color: "text-[#D9FF00]", icon: <TrendingUp size={24} />, trend: "+14.2%" },
            { label: "High Precision Orders", value: data.recentOrders.length, color: "text-blue-400", icon: <ShoppingBag size={24} />, trend: "+5.1%" },
            { label: "Active Nodes / Clients", value: data.totalCustomers, color: "text-purple-400", icon: <Activity size={24} />, trend: "-2.3%" },
            { label: "System Operational Status", value: "OPTIMAL", color: "text-green-400", icon: <Package size={24} />, trend: "STABLE" },
          ].map((stat, i) => (
            <div key={i} className="stat-card bg-[#0D0D0D] p-10 border border-white/5 relative group cursor-pointer hover:border-[#D9FF00]/40 transition-all duration-500 rounded-[32px] overflow-hidden">
              {/* Animated Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D9FF00] opacity-0 blur-[80px] group-hover:opacity-10 transition-opacity duration-700" />
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-[#D9FF00] group-hover:text-black transition-all duration-500">
                  {stat.icon}
                </div>
                <div className="text-right">
                  <p className={`text-[10px] font-mono font-bold tracking-widest ${stat.trend.startsWith('+') ? 'text-green-500' : stat.trend === 'STABLE' ? 'text-blue-400' : 'text-red-500'}`}>
                    {stat.trend}
                  </p>
                </div>
              </div>
              
              <p className="text-white/30 text-[10px] font-mono uppercase tracking-[4px] mb-3 relative z-10">{stat.label}</p>
              <h3 className={`font-bebas text-6xl ${stat.color} leading-none relative z-10`}>{stat.value}</h3>
              
              <div className="mt-8 flex items-center gap-2 opacity-20 group-hover:opacity-100 transition-opacity duration-500 text-[10px] font-mono tracking-widest uppercase">
                <span>View Details</span>
                <ArrowUpRight size={12} />
              </div>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Purchase Distribution Chart */}
          <div className="lg:col-span-8 bg-[#0D0D0D] p-12 border border-white/5 reveal-up rounded-[40px] relative overflow-hidden group">
            <div className="flex justify-between items-center mb-16 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-2 h-10 bg-[#D9FF00]" />
                <h3 className="font-bebas text-4xl tracking-wide uppercase">PURCHASE_PRICE_DISTRIBUTION</h3>
              </div>
              <div className="hidden md:flex gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#D9FF00]" />
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Active_Market</span>
                 </div>
              </div>
            </div>
            
            <div className="space-y-12 relative z-10">
              {data.priceAnalysis.map((item, i) => (
                <div key={i} className="group/bar">
                  <div className="flex justify-between items-end mb-4">
                    <div className="flex items-center gap-3">
                       <span className="text-white/20 font-mono text-xs">0{i+1}</span>
                       <span className="font-bebas text-xl text-white/90 group-hover/bar:text-[#D9FF00] transition-colors uppercase tracking-widest">{item.range}</span>
                    </div>
                    <span className="font-mono text-sm text-[#D9FF00] shadow-[0_0_10px_rgba(217,255,0,0.2)]">{Math.round(item.percentage)}%</span>
                  </div>
                  <div className="h-4 bg-white/5 w-full relative overflow-hidden rounded-full border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-[#D9FF00] shadow-[0_0_30px_rgba(217,255,0,0.4)] relative"
                    >
                      <div className="absolute right-0 top-0 h-full w-8 bg-white/40 blur-md opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
            {/* Visual Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-6 pointer-events-none border-x border-white/5 opacity-20">
              {[...Array(5)].map((_, i) => <div key={i} className="border-r border-white/5" />)}
            </div>
          </div>

          {/* Live Feed */}
          <div className="lg:col-span-4 bg-black border border-white/5 p-10 reveal-up flex flex-col rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-8">
               <div className="flex flex-col">
                  <h3 className="font-bebas text-3xl text-[#D9FF00] tracking-[3px]">LIVE_FEED</h3>
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Global Acquisition Stream</span>
               </div>
               <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                  <Activity size={20} className="text-[#D9FF00] animate-pulse" />
               </div>
            </div>
            
            <div className="space-y-8 flex-1 overflow-y-auto no-scrollbar pr-2 min-h-[400px]">
              <AnimatePresence initial={false}>
                {data.recentOrders.length > 0 ? data.recentOrders.map((order, i) => (
                  <motion.div 
                    key={order._id || i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-5 border-l border-white/10 pl-8 hover:border-[#D9FF00] transition-all duration-500 group relative"
                  >
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#D9FF00] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_#D9FF00] -left-[4.5px]" />
                    
                    <div className="flex-1 min-w-0 py-1">
                      <div className="flex items-center justify-between mb-2">
                         <span className={`text-[9px] font-mono uppercase tracking-[2px] ${order.paymentStatus === 'completed' ? 'text-green-500' : 'text-[#D9FF00]'}`}>
                           {order.paymentStatus}
                         </span>
                         <span className="text-sm font-bebas text-white/80 tracking-widest">${order.totalAmount}</span>
                      </div>
                      <p className="text-base font-bebas text-white tracking-[2px] truncate leading-tight transition-colors group-hover:text-[#D9FF00] uppercase">
                        {order.items?.[0]?.name || "UNIT_HARDWARE_X"}
                      </p>
                      <p className="text-[9px] text-white/20 font-mono mt-2 uppercase tracking-tighter">NODE: {order.userEmail?.split('@')[0]}</p>
                    </div>
                  </motion.div>
                )) : (
                  <div className="flex flex-col items-center justify-center h-full opacity-10 py-20">
                     <Activity size={60} className="mb-6 animate-pulse" />
                     <p className="font-mono text-xs tracking-[8px] uppercase">LINK_IDLE</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
            
            <button className="mt-12 w-full py-5 bg-white/5 border border-white/10 text-white/40 font-bebas tracking-[5px] text-xs hover:bg-white hover:text-black transition-all duration-500 rounded-2xl group">
               ACCESS_FULL_LOGS
            </button>
          </div>
        </div>

        {/* Top Inventory */}
        <div className="reveal-up pt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-3">
              <h3 className="font-bebas text-7xl tracking-tighter uppercase text-white leading-none">INVENTORY_HOT_LIST</h3>
              <div className="h-[1.5px] w-24 bg-[#D9FF00]" />
              <p className="text-white/20 font-mono text-[10px] uppercase tracking-[4px] mt-2">Active Strategic Assets // High Value Targets</p>
            </div>
            <div className="flex gap-4">
               <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-white/40 font-mono text-[10px] tracking-widest">TOTAL_COUNT: {data.topProducts.length}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.topProducts.map((prod, i) => (
              <div key={i} className="bg-[#0D0D0D] border border-white/5 p-6 group hover:border-[#D9FF00]/30 transition-all duration-700 rounded-[35px] overflow-hidden relative shadow-2xl">
                {/* Product Image Section */}
                <div className="aspect-[4/5] bg-black/40 overflow-hidden mb-8 relative rounded-[25px] border border-white/10">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover grayscale transition-all duration-1000 opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110" 
                  />
                  
                  {/* Stock Floating Badge */}
                  <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-1 shadow-2xl">
                    <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">STOCK</span>
                    <span className="text-xl font-bebas text-[#D9FF00] leading-none">{prod.quantity}</span>
                  </div>
                  
                  {/* Price Banner */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <span className="font-bebas text-3xl text-white tracking-widest">${prod.price}</span>
                  </div>
                </div>

                <div className="px-2 relative z-10 flex flex-col gap-3">
                   <div className="flex justify-between items-start">
                     <p className="font-bebas text-3xl tracking-widest uppercase text-white/90 group-hover:text-[#D9FF00] transition-colors leading-tight truncate flex-1 pr-4">
                       {prod.name}
                     </p>
                     <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 text-white/20 group-hover:bg-[#D9FF00] group-hover:text-black transition-all duration-500 transform group-hover:rotate-45">
                        <ArrowUpRight size={22} />
                     </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500/40" />
                      <span className="text-[9px] font-mono text-white/20 uppercase tracking-[2px]">Asset_Secure // Operational</span>
                   </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -left-10 -bottom-10 w-20 h-20 bg-[#D9FF00] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-1000" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </AuthGuard>
  );
}