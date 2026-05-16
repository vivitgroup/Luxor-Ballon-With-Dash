"use client"

import { motion } from "framer-motion"
import { Search, Users, Shield, User, Building2, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const users = [
  { id: "1", name: "John Smith", email: "john@example.com", role: "tourist", status: "active", bookings: 3, joined: "2024-01-15" },
  { id: "2", name: "Emma Wilson", email: "emma@example.com", role: "tourist", status: "active", bookings: 5, joined: "2024-02-20" },
  { id: "3", name: "Omar Hassan", email: "omar@sindbad.com", role: "operator", status: "active", bookings: 0, joined: "2023-06-10" },
  { id: "4", name: "Admin User", email: "admin@loxurballoons.com", role: "admin", status: "active", bookings: 0, joined: "2023-01-01" },
  { id: "5", name: "Fatima Ali", email: "fatima@example.com", role: "tourist", status: "inactive", bookings: 1, joined: "2024-03-05" },
  { id: "6", name: "Karim Mahmoud", email: "karim@hodhod.com", role: "operator", status: "active", bookings: 0, joined: "2023-08-15" },
]

const roleColors = {
  admin: "bg-balloon-red",
  operator: "bg-desert-gold",
  tourist: "bg-sky-blue",
}

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-playfair font-bold text-white">Users Management</h2>
      </div>

      <Card className="bg-dark-base border-white/10">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Search users..."
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-dark-base border-white/10">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-desert-gold to-desert-gold-light flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-playfair font-bold text-white">{users.length}</p>
              <p className="text-sm text-white/60">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-base border-white/10">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-balloon-green to-balloon-green-light flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-playfair font-bold text-white">{users.filter(u => u.role === "admin").length}</p>
              <p className="text-sm text-white/60">Admins</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-base border-white/10">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-blue to-sky-blue-light flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-playfair font-bold text-white">{users.filter(u => u.role === "tourist").length}</p>
              <p className="text-sm text-white/60">Tourists</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-dark-base border-white/10">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">User</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Role</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Bookings</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 bg-gradient-to-br from-desert-gold to-balloon-red">
                          <AvatarFallback className="text-white text-sm font-bold">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm text-white font-medium">{user.name}</p>
                          <p className="text-xs text-white/40">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={cn(roleColors[user.role as keyof typeof roleColors], "text-white")}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={cn(user.status === "active" ? "bg-balloon-green" : "bg-balloon-red", "text-white")}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-white/80">{user.bookings}</td>
                    <td className="py-4 px-6 text-sm text-white/60">{user.joined}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
