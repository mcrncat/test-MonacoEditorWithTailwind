"use client";
import TopBar from "@/components/forge/ui/TopBar";
import MainLayout from "@/components/forge/layout/MainLayout";
import StatusBar from "@/components/forge/ui/StatusBar";

export default function ForgePage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <TopBar />
      <MainLayout />
      <StatusBar />
    </div>
  );
}
