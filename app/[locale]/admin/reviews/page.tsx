"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Search, Filter, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const reviews = [
  { id: "R-001", customer: "Sarah Johnson", rating: 5, comment: "Absolutely magical experience! The sunrise over the Valley of the Kings was breathtaking.", operator: "Sindbad Balloons", date: "2024-06-15", status: "approved" },
  { id: "R-002", customer: "Ahmed Hassan", rating: 5, comment: "Best activity in Luxor! Professional team and amazing views.", operator: "Hod Hod Soliman", date: "2024-06-14", status: "approved" },
  { id: "R-003", customer: "Emma Wilson", rating: 4, comment: "Great experience overall. Would recommend the premium package.", operator: "Magic Horizon", date: "2024-06-13", status: "pending" },
  { id: "R-004", customer: "John Smith", rating: 3, comment: "Good but the wait was a bit long before takeoff.", operator: "Sky Cruise", date: "2024-06-12", status: "approved" },
  { id: "R-005", customer: "Lisa Chen", rating: 5, comment: "Perfect organization! From pickup to landing, everything was smooth.", operator: "Sindbad Balloons", date: "2024-06-11", status: "approved" },
]

export default function ReviewsPage() {
  const { toast } = useToast()
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredReviews = reviews.filter(r => statusFilter === "all" || r.status === statusFilter)
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  const handleApprove = (id: string) => {
    toast({ title: "Review Approved", description: "Review is now visible on the website", variant: "success" })
  }

  const handleReject = (id: string) => {
    toast({ title: "Review Rejected", description: "Review has been hidden", variant: "destructive" })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-playfair font-bold text-white">Reviews Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-dark-base border-white/10">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-playfair font-bold text-desert-gold">{avgRating}</p>
            <p className="text-sm text-white/60">Average Rating</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-base border-white/10">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-playfair font-bold text-white">{reviews.length}</p>
            <p className="text-sm text-white/60">Total Reviews</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-base border-white/10">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-playfair font-bold text-balloon-green">{reviews.filter(r => r.rating === 5).length}</p>
            <p className="text-sm text-white/60">5-Star Reviews</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-base border-white/10">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-playfair font-bold text-yellow-500">{reviews.filter(r => r.status === "pending").length}</p>
            <p className="text-sm text-white/60">Pending Approval</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-dark-base border-white/10">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                placeholder="Search reviews..."
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "approved", "pending"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? "bg-desert-gold text-white" : "border-white/20 text-white/60 hover:bg-white/5"}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-dark-base border-white/10">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12 bg-gradient-to-br from-desert-gold to-balloon-red">
                      <AvatarFallback className="text-white font-bold">
                        {review.customer.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-medium">{review.customer}</h4>
                        <Badge className={cn(review.status === "approved" ? "bg-balloon-green" : "bg-yellow-500", "text-white text-xs")}>
                          {review.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("w-4 h-4", i < review.rating ? "text-desert-gold fill-desert-gold" : "text-white/20")} />
                        ))}
                        <span className="text-xs text-white/40 ml-2">{review.operator}</span>
                      </div>
                      <p className="text-sm text-white/80 mt-2 max-w-xl">{review.comment}</p>
                      <p className="text-xs text-white/40 mt-2">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {review.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-balloon-green hover:text-balloon-green hover:bg-balloon-green/10"
                          onClick={() => handleApprove(review.id)}
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-balloon-red hover:text-balloon-red hover:bg-balloon-red/10"
                          onClick={() => handleReject(review.id)}
                        >
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
