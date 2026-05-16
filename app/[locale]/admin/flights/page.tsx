"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Calendar, Clock, Users, AlertCircle, Edit, Trash2, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { cn, validateMinPrice, getMinPriceError } from "@/lib/utils"

const flights = [
  { id: "F-001", balloon: "Sindbad-1", operator: "Sindbad Balloons", date: "2024-06-20", time: "05:00", price: 79, seatsTotal: 12, seatsAvailable: 8, status: "scheduled", package: "standard" },
  { id: "F-002", balloon: "HodHod-1", operator: "Hod Hod Soliman", date: "2024-06-20", time: "05:30", price: 129, seatsTotal: 6, seatsAvailable: 4, status: "scheduled", package: "premium" },
  { id: "F-003", balloon: "Magic-1", operator: "Magic Horizon", date: "2024-06-20", time: "06:00", price: 79, seatsTotal: 12, seatsAvailable: 10, status: "scheduled", package: "standard" },
  { id: "F-004", balloon: "Sky-1", operator: "Sky Cruise", date: "2024-06-21", time: "05:00", price: 299, seatsTotal: 6, seatsAvailable: 6, status: "scheduled", package: "private" },
  { id: "F-005", balloon: "Sindbad-2", operator: "Sindbad Balloons", date: "2024-06-21", time: "05:30", price: 85, seatsTotal: 12, seatsAvailable: 6, status: "scheduled", package: "standard" },
  { id: "F-006", balloon: "Nile-1", operator: "Nile Dream", date: "2024-06-21", time: "06:00", price: 79, seatsTotal: 16, seatsAvailable: 12, status: "cancelled", package: "standard" },
]

const packageColors = {
  standard: "bg-desert-gold",
  premium: "bg-balloon-red",
  private: "bg-balloon-green",
}

export default function FlightsPage() {
  const { toast } = useToast()
  const [showAddModal, setShowAddModal] = useState(false)
  const [newFlightPrice, setNewFlightPrice] = useState("")
  const [priceError, setPriceError] = useState("")

  const handlePriceValidation = (price: string) => {
    const numPrice = parseFloat(price)
    if (!validateMinPrice(numPrice)) {
      setPriceError(getMinPriceError())
      toast({
        title: "Validation Error",
        description: getMinPriceError(),
        variant: "destructive",
      })
      return false
    }
    setPriceError("")
    return true
  }

  const handleAddFlight = () => {
    if (handlePriceValidation(newFlightPrice)) {
      toast({
        title: "Flight Added",
        description: "New flight has been scheduled successfully",
        variant: "success",
      })
      setShowAddModal(false)
      setNewFlightPrice("")
    }
  }

  const handleCancelFlight = (id: string) => {
    toast({
      title: "Flight Cancelled",
      description: `Flight ${id} has been cancelled. Passengers will be notified.`,
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-playfair font-bold text-white">Flights Management</h2>
        <Button 
          className="bg-gradient-to-r from-desert-gold to-desert-gold-light"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Flight
        </Button>
      </div>

      {/* Calendar View Placeholder */}
      <Card className="bg-dark-base border-white/10">
        <CardContent className="p-6">
          <h3 className="text-lg font-playfair font-semibold text-white mb-4">Flight Calendar</h3>
          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="text-center text-sm text-white/40 py-2">{day}</div>
            ))}
            {Array.from({ length: 30 }).map((_, i) => {
              const hasFlight = [0, 1, 2, 7, 8, 9, 14, 15, 16].includes(i)
              return (
                <div
                  key={i}
                  className={cn(
                    "aspect-square rounded-lg flex items-center justify-center text-sm cursor-pointer transition-colors",
                    hasFlight 
                      ? "bg-desert-gold/20 text-desert-gold border border-desert-gold/30 hover:bg-desert-gold/30" 
                      : "bg-white/5 text-white/40 hover:bg-white/10"
                  )}
                >
                  {i + 1}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Flights Table */}
      <Card className="bg-dark-base border-white/10">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">ID</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Balloon</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Operator</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Date/Time</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Price</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Capacity</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Package</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight, index) => (
                  <motion.tr
                    key={flight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm text-white font-mono">{flight.id}</td>
                    <td className="py-4 px-6 text-sm text-white">{flight.balloon}</td>
                    <td className="py-4 px-6 text-sm text-white/80">{flight.operator}</td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-white/80">{flight.date}</div>
                      <div className="text-xs text-white/40">{flight.time}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-desert-gold font-medium">${flight.price}</td>
                    <td className="py-4 px-6 text-sm text-white/80">{flight.seatsAvailable}/{flight.seatsTotal}</td>
                    <td className="py-4 px-6">
                      <Badge className={cn(packageColors[flight.package as keyof typeof packageColors], "text-white text-xs")}>
                        {flight.package}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={cn(
                        flight.status === "scheduled" && "bg-balloon-green",
                        flight.status === "cancelled" && "bg-balloon-red",
                        flight.status === "completed" && "bg-sky-blue",
                        "text-white"
                      )}>
                        {flight.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-white/60 hover:text-white h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {flight.status === "scheduled" && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-balloon-red hover:text-balloon-red h-8 w-8 p-0"
                            onClick={() => handleCancelFlight(flight.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Flight Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-dark-base border border-white/10 rounded-2xl p-6 w-full max-w-lg"
          >
            <h3 className="text-xl font-playfair font-semibold text-white mb-6">Add New Flight</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/60 mb-1 block">Balloon</label>
                <select className="w-full h-11 rounded-xl bg-white/5 border border-white/10 text-white px-4">
                  <option>Sindbad-1</option>
                  <option>HodHod-1</option>
                  <option>Magic-1</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/60 mb-1 block">Date</label>
                  <Input type="date" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1 block">Time</label>
                  <select className="w-full h-11 rounded-xl bg-white/5 border border-white/10 text-white px-4">
                    <option>05:00</option>
                    <option>05:30</option>
                    <option>06:00</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1 block">Price per Seat ($)</label>
                <Input
                  type="number"
                  min="79"
                  value={newFlightPrice}
                  onChange={(e) => {
                    setNewFlightPrice(e.target.value)
                    setPriceError("")
                  }}
                  className={cn("bg-white/5 border-white/10 text-white", priceError && "border-balloon-red")}
                  placeholder="Minimum $79"
                />
                {priceError && (
                  <p className="text-balloon-red text-xs mt-1">{priceError}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1 block">Total Seats</label>
                <Input type="number" className="bg-white/5 border-white/10 text-white" defaultValue={12} />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1 block">Package</label>
                <select className="w-full h-11 rounded-xl bg-white/5 border border-white/10 text-white px-4">
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/5" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-desert-gold to-desert-gold-light" onClick={handleAddFlight}>
                Add Flight
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
