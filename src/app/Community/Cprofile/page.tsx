"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    MapPin,
    Phone,
    Mail,
    MessageCircle,
    Settings,
    Edit3,
    Calendar
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useGlobalContext, IUserData } from "@/context/globalContext";

export default function ProfilePage() {
    const { data: session } = useSession();
    const { allUsers, loading, setActiveChat } = useGlobalContext();

    const currentUserData = allUsers?.find(
        (user: IUserData) => user.email === session?.user?.email
    );

    if (loading) return (
        <div className="h-screen flex items-center justify-center">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!currentUserData) return (
        <div className="h-screen flex flex-col items-center justify-center p-6 bg-[#050505]">
           <div className="max-w-md w-full bg-white/[0.02] border border-white/[0.05] rounded-[40px] p-10 text-center backdrop-blur-3xl shadow-2xl">
              <div className="w-20 h-20 bg-[#D9FF00]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#D9FF00]/20">
                 <Mail className="w-8 h-8 text-[#D9FF00] animate-pulse" />
              </div>
              <h2 className="font-bebas text-3xl tracking-widest text-white mb-2">Protocol_Error</h2>
              <p className="font-jetbrains-mono text-[10px] text-white/40 uppercase tracking-[4px] mb-8">Access_Denied: Identity_Not_Linked</p>
              <div className="space-y-4">
                 <Link href="/login" className="block w-full py-4 bg-[#D9FF00] text-black font-bebas text-xl tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(217,255,0,0.2)]">
                    Invoke_Login
                 </Link>
                 <Link href="/Community" className="block w-full py-4 bg-white/5 text-white/40 font-bebas text-xl tracking-widest rounded-2xl hover:bg-white/10 transition-all">
                    Return_To_Base
                 </Link>
              </div>
           </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            <div className="relative h-48 md:h-64 w-full overflow-hidden">
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                            "linear-gradient(45deg, #f093fb 0%, #f5576c 100%)",
                            "linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)",
                            "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                        ],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="container max-w-4xl mx-auto px-4">
                <div className="relative -mt-12 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-4 text-center md:text-left">
                        <div className="relative">
                            <div className="h-32 w-32 rounded-full border-4 border-background bg-background shadow-xl overflow-hidden">
                                <Avatar className="h-full w-full">
                                    <AvatarImage src={currentUserData.image} className="object-cover" />
                                    <AvatarFallback className="text-2xl">
                                        {currentUserData.name?.[0]}{currentUserData.lastName?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-4 border-background bg-emerald-500" />
                        </div>

                        <div className="pb-2">
                            <h1 className="text-2xl md:text-4xl font-bold">
                                {currentUserData.name} {currentUserData.lastName}
                            </h1>
                            <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2">
                                <Mail className="h-4 w-4" /> {currentUserData.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <Button className="flex-1 md:flex-none gap-2">
                            <Edit3 className="h-4 w-4" /> Edit Profile
                        </Button>
                        <Button 
                            variant="secondary" 
                            className="flex-1 md:flex-none gap-2"
                            onClick={() => setActiveChat(currentUserData.email)}
                        >
                            <MessageCircle className="h-4 w-4" /> Message
                        </Button>
                        <Button variant="outline" size="icon">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2 space-y-4">
                        <h2 className="text-lg font-semibold border-b pb-2">Bio</h2>
                        <p className="text-foreground/80 leading-relaxed">
                            {currentUserData.Bio || "No bio added yet."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold border-b pb-2">Details</h2>
                        <div className="space-y-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>{currentUserData.address || "Not specified"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>{currentUserData.phoneNumber}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span>Joined {new Date(currentUserData.createdAt || "").toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}