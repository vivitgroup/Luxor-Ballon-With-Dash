"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  DollarSign, TrendingUp, CreditCard, Banknote, Download, Filter,
  ArrowUpRight, RefreshCw, FileText, Calendar, Building2, ChevronDown,
  CheckCircle, Clock, XCircle, Printer, FileSpreadsheet, FileDown
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// ─── Data ───────────────────────────────────────────────────────────────────
const transactions = [
  { id: "T-001", bookingId: "B-001", customer: "أحمد محمد علي", phone: "+20 100 123 4567", cardLast4: "4532", amount: 158, method: "visa", status: "collected", date: "2024-06-18", operator: "Sindbad Balloons", flight: "F-001", refundable: true },
  { id: "T-002", bookingId: "B-002", customer: "Emma Wilson", phone: "+44 7700 900123", cardLast4: null, amount: 258, method: "cash", status: "collected", date: "2024-06-19", operator: "Hod Hod Soliman", flight: "F-002", refundable: false },
  { id: "T-003", bookingId: "B-003", customer: "سارة إبراهيم", phone: "+20 111 987 6543", cardLast4: "8821", amount: 79, method: "visa", status: "collected", date: "2024-06-19", operator: "Magic Horizon", flight: "F-003", refundable: true },
  { id: "T-004", bookingId: "B-004", customer: "James Carter", phone: "+1 555 234 5678", cardLast4: "3317", amount: 516, method: "visa", status: "pending", date: "2024-06-20", operator: "Sky Cruise", flight: "F-004", refundable: true },
  { id: "T-005", bookingId: "B-005", customer: "كريم محمود", phone: "+20 122 456 7890", cardLast4: null, amount: 129, method: "cash", status: "refunded", date: "2024-06-20", operator: "Sindbad Balloons", flight: "F-005", refundable: false },
  { id: "T-006", bookingId: "B-006", customer: "Yuki Tanaka", phone: "+81 90 1234 5678", cardLast4: "9945", amount: 299, method: "visa", status: "collected", date: "2024-06-21", operator: "Nile Dream", flight: "F-006", refundable: true },
  { id: "T-007", bookingId: "B-007", customer: "محمد عبد الرحمن", phone: "+20 100 777 8888", cardLast4: null, amount: 79, method: "cash", status: "pending", date: "2024-06-21", operator: "Magic Horizon", flight: "F-007", refundable: false },
  { id: "T-008", bookingId: "B-008", customer: "Sofia Rodriguez", phone: "+34 612 345 678", cardLast4: "2290", amount: 399, method: "visa", status: "collected", date: "2024-06-22", operator: "Sky Cruise", flight: "F-008", refundable: true },
  { id: "T-009", bookingId: "B-009", customer: "فاطمة الزهراء", phone: "+20 115 321 0987", cardLast4: null, amount: 158, method: "cash", status: "collected", date: "2024-06-22", operator: "Hod Hod Soliman", flight: "F-009", refundable: false },
  { id: "T-010", bookingId: "B-010", customer: "David Kim", phone: "+82 10 9876 5432", cardLast4: "7761", amount: 129, method: "visa", status: "refunded", date: "2024-06-23", operator: "Sindbad Balloons", flight: "F-010", refundable: true },
]

const operatorStats = [
  { name: "Sindbad Balloons", totalRevenue: 12500, visaRevenue: 8200, cashRevenue: 4300, flights: 45, collected: 11800, pending: 700, refunded: 0, color: "#C8860A" },
  { name: "Hod Hod Soliman", totalRevenue: 9800, visaRevenue: 5400, cashRevenue: 4400, flights: 32, collected: 9200, pending: 600, refunded: 0, color: "#2E86C1" },
  { name: "Magic Horizon", totalRevenue: 7200, visaRevenue: 3800, cashRevenue: 3400, flights: 28, collected: 6500, pending: 700, refunded: 0, color: "#1E8449" },
  { name: "Sky Cruise", totalRevenue: 4800, visaRevenue: 4200, cashRevenue: 600, flights: 18, collected: 4300, pending: 500, refunded: 0, color: "#8E44AD" },
  { name: "Nile Dream", totalRevenue: 1800, visaRevenue: 1200, cashRevenue: 600, flights: 8, collected: 1800, pending: 0, refunded: 0, color: "#E74C3C" },
]

// ─── Export helpers ──────────────────────────────────────────────────────────
function exportToCSV(data: typeof transactions, filename: string) {
  const headers = ["ID", "Booking", "Customer", "Phone", "Card Last 4", "Amount ($)", "Method", "Status", "Date", "Operator", "Flight"]
  const rows = data.map(t => [
    t.id, t.bookingId, t.customer, t.phone, t.cardLast4 || "N/A",
    t.amount, t.method, t.status, t.date, t.operator, t.flight
  ])
  const csv = [headers, ...rows].map(r => r.join(",")).join("\n")
  const blob = new Blob([csv], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

function exportToPDF(data: typeof transactions, title: string) {
  const printWindow = window.open("", "_blank")
  if (!printWindow) return
  const total = data.reduce((s, t) => s + (t.status !== "refunded" ? t.amount : 0), 0)
  const visaTotal = data.filter(t => t.method === "visa" && t.status !== "refunded").reduce((s, t) => s + t.amount, 0)
  const cashTotal = data.filter(t => t.method === "cash" && t.status !== "refunded").reduce((s, t) => s + t.amount, 0)
  const html = `<!DOCTYPE html><html dir="ltr"><head><title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; color: #1A1A2E; }
    h1 { color: #C8860A; border-bottom: 2px solid #C8860A; pb: 10px; }
    .summary { display: flex; gap: 20px; margin: 20px 0; }
    .stat { background: #f5f5f5; border-radius: 8px; padding: 12px 20px; flex: 1; }
    .stat-label { font-size: 12px; color: #666; }
    .stat-value { font-size: 22px; font-weight: bold; color: #1A1A2E; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
    th { background: #1A1A2E; color: white; padding: 10px; text-align: left; }
    td { padding: 8px 10px; border-bottom: 1px solid #eee; }
    tr:nth-child(even) { background: #fafafa; }
    .visa { color: #2E86C1; font-weight: bold; }
    .cash { color: #1E8449; font-weight: bold; }
    .collected { color: #27AE60; } .pending { color: #E67E22; } .refunded { color: #E74C3C; }
    .footer { margin-top: 30px; font-size: 11px; color: #888; text-align: center; }
    @media print { body { margin: 0; } }
  </style></head><body>
  <h1>🎈 Luxor Balloons — ${title}</h1>
  <p style="color:#888">Generated: ${new Date().toLocaleString()}</p>
  <div class="summary">
    <div class="stat"><div class="stat-label">Total Revenue</div><div class="stat-value">$${total.toLocaleString()}</div></div>
    <div class="stat"><div class="stat-label">Visa Payments</div><div class="stat-value" style="color:#2E86C1">$${visaTotal.toLocaleString()}</div></div>
    <div class="stat"><div class="stat-label">Cash Payments</div><div class="stat-value" style="color:#1E8449">$${cashTotal.toLocaleString()}</div></div>
    <div class="stat"><div class="stat-label">Transactions</div><div class="stat-value">${data.length}</div></div>
  </div>
  <table><thead><tr><th>ID</th><th>Customer</th><th>Phone</th><th>Amount</th><th>Method</th><th>Card</th><th>Status</th><th>Date</th><th>Operator</th></tr></thead>
  <tbody>${data.map(t => `<tr>
    <td>${t.id}</td><td>${t.customer}</td><td>${t.phone}</td>
    <td><b>$${t.amount}</b></td>
    <td class="${t.method}">${t.method === "visa" ? "💳 Visa" : "💵 Cash"}</td>
    <td>${t.cardLast4 ? `****${t.cardLast4}` : "—"}</td>
    <td class="${t.status}">${t.status}</td>
    <td>${t.date}</td><td>${t.operator}</td>
  </tr>`).join("")}</tbody></table>
  <div class="footer">Luxor Balloons Admin System — Confidential</div>
  </body></html>`
  printWindow.document.write(html)
  printWindow.document.close()
  printWindow.print()
}

// ─── Components ─────────────────────────────────────────────────────────────
function StatCard({ label, labelAr, value, sub, icon: Icon, color, trend }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="bg-dark-base-lighter border-white/10 overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/50 text-xs mb-1">{label} / {labelAr}</p>
              <p className="text-2xl font-bold text-white">{value}</p>
              {sub && <p className="text-xs text-white/40 mt-1">{sub}</p>}
            </div>
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", color)}>
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>
          {trend && (
            <div className="flex items-center gap-1 mt-3">
              <ArrowUpRight className="w-3 h-3 text-balloon-green-light" />
              <span className="text-xs text-balloon-green-light">{trend}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ─── Refund Modal ────────────────────────────────────────────────────────────
function RefundModal({ tx, onClose }: { tx: typeof transactions[0], onClose: () => void }) {
  const [step, setStep] = useState<"confirm" | "done">("confirm")
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-dark-base border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        {step === "confirm" ? (
          <>
            <h3 className="text-lg font-bold text-white mb-1">Process Refund / استرداد المبلغ</h3>
            <p className="text-white/50 text-sm mb-4">Transaction {tx.id}</p>
            <div className="bg-dark-base-lighter rounded-xl p-4 mb-4 space-y-2">
              <div className="flex justify-between"><span className="text-white/50 text-sm">Customer / العميل</span><span className="text-white text-sm font-medium">{tx.customer}</span></div>
              <div className="flex justify-between"><span className="text-white/50 text-sm">Phone / الهاتف</span><span className="text-white text-sm">{tx.phone}</span></div>
              <div className="flex justify-between"><span className="text-white/50 text-sm">Card / البطاقة</span><span className="text-sky-blue-light text-sm font-mono">****{tx.cardLast4}</span></div>
              <div className="flex justify-between"><span className="text-white/50 text-sm">Amount / المبلغ</span><span className="text-desert-gold font-bold">${tx.amount}</span></div>
            </div>
            <div className="bg-balloon-red/10 border border-balloon-red/30 rounded-xl p-3 mb-5">
              <p className="text-balloon-red-light text-sm">⚠️ The refund will be returned to card ****{tx.cardLast4}. This action cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={onClose} className="flex-1 text-white/60 border border-white/10">Cancel / إلغاء</Button>
              <Button onClick={() => setStep("done")} className="flex-1 bg-balloon-red hover:bg-balloon-red-light text-white">Confirm Refund / تأكيد</Button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-balloon-green/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-balloon-green-light" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Refund Initiated!</h3>
            <p className="text-white/50 text-sm mb-1">Refund of <span className="text-desert-gold font-bold">${tx.amount}</span> sent to card ****{tx.cardLast4}</p>
            <p className="text-white/30 text-xs mb-6">Processing time: 3–5 business days</p>
            <Button onClick={onClose} className="bg-desert-gold hover:bg-desert-gold-light text-dark-base font-bold w-full">Done / تم</Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function AccountingPage() {
  const [methodFilter, setMethodFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [operatorFilter, setOperatorFilter] = useState("all")
  const [activeTab, setActiveTab] = useState<"transactions" | "operators">("transactions")
  const [refundTx, setRefundTx] = useState<typeof transactions[0] | null>(null)

  const filtered = transactions.filter(t =>
    (methodFilter === "all" || t.method === methodFilter) &&
    (statusFilter === "all" || t.status === statusFilter) &&
    (operatorFilter === "all" || t.operator === operatorFilter)
  )

  const totalCollected = filtered.filter(t => t.status === "collected").reduce((s, t) => s + t.amount, 0)
  const totalPending = filtered.filter(t => t.status === "pending").reduce((s, t) => s + t.amount, 0)
  const totalRefunded = filtered.filter(t => t.status === "refunded").reduce((s, t) => s + t.amount, 0)
  const visaTotal = filtered.filter(t => t.method === "visa" && t.status === "collected").reduce((s, t) => s + t.amount, 0)
  const cashTotal = filtered.filter(t => t.method === "cash" && t.status === "collected").reduce((s, t) => s + t.amount, 0)

  const operators = Array.from(new Set(transactions.map(t => t.operator)))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Accounting Reports</h1>
          <p className="text-white/40 text-sm mt-0.5">التقارير المحاسبية — Cash vs Visa — Refunds</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => exportToCSV(filtered, "luxor-accounting.csv")}
            variant="ghost" size="sm" className="text-white/60 border border-white/10 hover:border-desert-gold/50 hover:text-desert-gold gap-2">
            <FileSpreadsheet className="w-4 h-4" /> Export Excel
          </Button>
          <Button onClick={() => exportToPDF(filtered, "Accounting Report")}
            variant="ghost" size="sm" className="text-white/60 border border-white/10 hover:border-balloon-red/50 hover:text-balloon-red-light gap-2">
            <FileDown className="w-4 h-4" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard label="Total Collected" labelAr="المحصّل" value={`$${totalCollected.toLocaleString()}`} icon={DollarSign} color="bg-desert-gold/20" trend="+12% this month" />
        <StatCard label="Visa Payments" labelAr="فيزا" value={`$${visaTotal.toLocaleString()}`} icon={CreditCard} color="bg-sky-blue/20" />
        <StatCard label="Cash Payments" labelAr="كاش" value={`$${cashTotal.toLocaleString()}`} icon={Banknote} color="bg-balloon-green/20" />
        <StatCard label="Pending" labelAr="معلّق" value={`$${totalPending.toLocaleString()}`} icon={Clock} color="bg-yellow-500/20" />
        <StatCard label="Refunded" labelAr="مُسترَد" value={`$${totalRefunded.toLocaleString()}`} icon={RefreshCw} color="bg-balloon-red/20" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-dark-base rounded-xl w-fit">
        {[["transactions", "Transactions / المعاملات"], ["operators", "By Operator / حسب الشركة"]].map(([val, label]) => (
          <button key={val} onClick={() => setActiveTab(val as any)}
            className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === val ? "bg-desert-gold text-dark-base font-bold" : "text-white/50 hover:text-white")}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === "transactions" && (
        <Card className="bg-dark-base-lighter border-white/10">
          <CardContent className="p-0">
            {/* Filters */}
            <div className="p-4 border-b border-white/10 flex flex-wrap gap-3 items-center">
              <Filter className="w-4 h-4 text-white/40" />
              {/* Method */}
              <div className="flex gap-1">
                {["all", "visa", "cash"].map(m => (
                  <button key={m} onClick={() => setMethodFilter(m)}
                    className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                      methodFilter === m ? "bg-desert-gold text-dark-base" : "bg-white/5 text-white/50 hover:text-white")}>
                    {m === "all" ? "All / الكل" : m === "visa" ? "💳 Visa" : "💵 Cash"}
                  </button>
                ))}
              </div>
              {/* Status */}
              <div className="flex gap-1">
                {["all", "collected", "pending", "refunded"].map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)}
                    className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                      statusFilter === s ? "bg-desert-gold text-dark-base" : "bg-white/5 text-white/50 hover:text-white")}>
                    {s === "all" ? "All" : s === "collected" ? "✅ Collected" : s === "pending" ? "⏳ Pending" : "↩️ Refunded"}
                  </button>
                ))}
              </div>
              {/* Operator */}
              <select value={operatorFilter} onChange={e => setOperatorFilter(e.target.value)}
                className="bg-white/5 border border-white/10 text-white/70 text-xs rounded-lg px-3 py-1.5 outline-none">
                <option value="all">All Operators / كل الشركات</option>
                {operators.map(op => <option key={op} value={op}>{op}</option>)}
              </select>
              <span className="text-white/30 text-xs ml-auto">{filtered.length} transactions</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    {["ID", "Customer / العميل", "Phone / الهاتف", "Amount", "Method", "Card / بطاقة", "Status", "Date", "Operator", "Actions"].map(h => (
                      <th key={h} className="text-left text-xs text-white/40 font-medium px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((tx, i) => (
                    <motion.tr key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 text-desert-gold text-xs font-mono">{tx.id}</td>
                      <td className="px-4 py-3">
                        <div className="text-white text-sm font-medium">{tx.customer}</div>
                        <div className="text-white/40 text-xs">{tx.bookingId}</div>
                      </td>
                      <td className="px-4 py-3 text-white/60 text-sm font-mono">{tx.phone}</td>
                      <td className="px-4 py-3 text-desert-gold font-bold">${tx.amount}</td>
                      <td className="px-4 py-3">
                        <Badge className={cn("text-xs", tx.method === "visa" ? "bg-sky-blue/20 text-sky-blue-light border-sky-blue/30" : "bg-balloon-green/20 text-balloon-green-light border-balloon-green/30")}>
                          {tx.method === "visa" ? "💳 Visa" : "💵 Cash"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-white/50 text-sm font-mono">
                        {tx.cardLast4 ? <span className="text-sky-blue-light">****{tx.cardLast4}</span> : <span className="text-white/20">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={cn("text-xs border",
                          tx.status === "collected" ? "bg-balloon-green/20 text-balloon-green-light border-balloon-green/30" :
                          tx.status === "pending" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                          "bg-balloon-red/20 text-balloon-red-light border-balloon-red/30")}>
                          {tx.status === "collected" ? "✅ Collected" : tx.status === "pending" ? "⏳ Pending" : "↩️ Refunded"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-white/50 text-sm">{tx.date}</td>
                      <td className="px-4 py-3 text-white/60 text-xs">{tx.operator}</td>
                      <td className="px-4 py-3">
                        {tx.method === "visa" && tx.status === "collected" && tx.refundable && (
                          <Button onClick={() => setRefundTx(tx)} size="sm" variant="ghost"
                            className="text-balloon-red-light hover:bg-balloon-red/10 text-xs h-7 px-2 gap-1">
                            <RefreshCw className="w-3 h-3" /> Refund
                          </Button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "operators" && (
        <div className="space-y-4">
          {operatorStats.map((op, i) => (
            <motion.div key={op.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="bg-dark-base-lighter border-white/10">
                <CardContent className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Name & color */}
                    <div className="flex items-center gap-3 lg:w-48 shrink-0">
                      <div className="w-3 h-3 rounded-full" style={{ background: op.color }} />
                      <span className="text-white font-semibold text-sm">{op.name}</span>
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 flex-1">
                      {[
                        { label: "Total / الإجمالي", value: `$${op.totalRevenue.toLocaleString()}`, color: "text-desert-gold" },
                        { label: "💳 Visa", value: `$${op.visaRevenue.toLocaleString()}`, color: "text-sky-blue-light" },
                        { label: "💵 Cash", value: `$${op.cashRevenue.toLocaleString()}`, color: "text-balloon-green-light" },
                        { label: "✅ Collected", value: `$${op.collected.toLocaleString()}`, color: "text-white" },
                        { label: "⏳ Pending", value: `$${op.pending.toLocaleString()}`, color: "text-yellow-400" },
                        { label: "✈️ Flights", value: op.flights, color: "text-white/60" },
                      ].map(s => (
                        <div key={s.label} className="bg-dark-base rounded-xl p-3">
                          <div className="text-white/40 text-xs mb-1">{s.label}</div>
                          <div className={cn("font-bold text-sm", s.color)}>{s.value}</div>
                        </div>
                      ))}
                    </div>
                    {/* Export */}
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" variant="ghost" onClick={() => exportToCSV(transactions.filter(t => t.operator === op.name), `${op.name}.csv`)}
                        className="text-white/50 border border-white/10 hover:text-desert-gold hover:border-desert-gold/30 text-xs gap-1">
                        <FileSpreadsheet className="w-3 h-3" /> CSV
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => exportToPDF(transactions.filter(t => t.operator === op.name), `${op.name} — Report`)}
                        className="text-white/50 border border-white/10 hover:text-balloon-red-light hover:border-balloon-red/30 text-xs gap-1">
                        <FileDown className="w-3 h-3" /> PDF
                      </Button>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-white/30 mb-1">
                      <span>Visa vs Cash</span>
                      <span>{Math.round(op.visaRevenue / op.totalRevenue * 100)}% Visa</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden flex">
                      <div className="h-full bg-sky-blue/60 rounded-l-full transition-all" style={{ width: `${op.visaRevenue / op.totalRevenue * 100}%` }} />
                      <div className="h-full bg-balloon-green/60 rounded-r-full flex-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Grand Total */}
          <Card className="bg-desert-gold/10 border-desert-gold/30">
            <CardContent className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="text-desert-gold font-bold text-lg">Grand Total / الإجمالي الكلي</span>
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-white/40 text-xs">Total Revenue</div>
                    <div className="text-desert-gold font-bold text-xl">${operatorStats.reduce((s, o) => s + o.totalRevenue, 0).toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/40 text-xs">Visa</div>
                    <div className="text-sky-blue-light font-bold text-xl">${operatorStats.reduce((s, o) => s + o.visaRevenue, 0).toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/40 text-xs">Cash</div>
                    <div className="text-balloon-green-light font-bold text-xl">${operatorStats.reduce((s, o) => s + o.cashRevenue, 0).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => exportToCSV(transactions, "all-operators.csv")} className="bg-desert-gold/20 border border-desert-gold/30 text-desert-gold hover:bg-desert-gold/30 gap-2">
                    <FileSpreadsheet className="w-4 h-4" /> Export All CSV
                  </Button>
                  <Button onClick={() => exportToPDF(transactions, "Full Accounting Report")} className="bg-balloon-red/20 border border-balloon-red/30 text-balloon-red-light hover:bg-balloon-red/30 gap-2">
                    <FileDown className="w-4 h-4" /> Export All PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Refund Modal */}
      {refundTx && <RefundModal tx={refundTx} onClose={() => setRefundTx(null)} />}
    </div>
  )
}
