"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, Globe, CreditCard, Bell, Shield, Palette } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    siteName: "Luxor Balloons",
    minPrice: 79,
    whatsappNumber: "+201234567890",
    paymobApiKey: "",
    paymobIntegrationId: "",
    emailNotifications: true,
    smsNotifications: false,
    autoConfirm: false,
  })

  const handleSave = () => {
    if (settings.minPrice < 79) {
      toast({
        title: "Validation Error",
        description: "Minimum price cannot be less than $79",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Settings Saved",
      description: "Your changes have been saved successfully",
      variant: "success",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-playfair font-bold text-white">Settings</h2>
        <Button className="bg-gradient-to-r from-desert-gold to-desert-gold-light" onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-dark-base border-white/10">
            <CardHeader>
              <CardTitle className="text-white font-playair flex items-center gap-2">
                <Globe className="w-5 h-5 text-desert-gold" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-white/60 mb-1 block">Site Name</label>
                <Input
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1 block">Minimum Price per Seat ($)</label>
                <Input
                  type="number"
                  min={79}
                  value={settings.minPrice}
                  onChange={(e) => setSettings({ ...settings, minPrice: parseInt(e.target.value) })}
                  className={cn("bg-white/5 border-white/10 text-white", settings.minPrice < 79 && "border-balloon-red")}
                />
                {settings.minPrice < 79 && (
                  <p className="text-balloon-red text-xs mt-1">Minimum price must be at least $79</p>
                )}
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1 block">WhatsApp Number</label>
                <Input
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-dark-base border-white/10">
            <CardHeader>
              <CardTitle className="text-white font-playair flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-desert-gold" />
                Payment Gateway (Paymob)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-white/60 mb-1 block">API Key</label>
                <Input
                  type="password"
                  value={settings.paymobApiKey}
                  onChange={(e) => setSettings({ ...settings, paymobApiKey: e.target.value })}
                  placeholder="Enter Paymob API Key"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1 block">Integration ID</label>
                <Input
                  value={settings.paymobIntegrationId}
                  onChange={(e) => setSettings({ ...settings, paymobIntegrationId: e.target.value })}
                  placeholder="Enter Integration ID"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-sm text-yellow-500">
                  Paymob integration is in test mode. Configure live credentials to accept real payments.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-dark-base border-white/10">
            <CardHeader>
              <CardTitle className="text-white font-playair flex items-center gap-2">
                <Bell className="w-5 h-5 text-desert-gold" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "emailNotifications", label: "Email Notifications", desc: "Send email confirmations for bookings" },
                { key: "smsNotifications", label: "SMS Notifications", desc: "Send SMS updates to customers" },
                { key: "autoConfirm", label: "Auto-Confirm Bookings", desc: "Automatically confirm paid bookings" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-white/40 text-xs">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      settings[item.key as keyof typeof settings] ? "bg-desert-gold" : "bg-white/20"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform",
                      settings[item.key as keyof typeof settings] ? "left-6" : "left-0.5"
                    )} />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-dark-base border-white/10">
            <CardHeader>
              <CardTitle className="text-white font-playair flex items-center gap-2">
                <Shield className="w-5 h-5 text-desert-gold" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-white/60 mb-1 block">Current Password</label>
                <Input type="password" className="bg-white/5 border-white/10 text-white" placeholder="Enter current password" />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1 block">New Password</label>
                <Input type="password" className="bg-white/5 border-white/10 text-white" placeholder="Enter new password" />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1 block">Confirm New Password</label>
                <Input type="password" className="bg-white/5 border-white/10 text-white" placeholder="Confirm new password" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
