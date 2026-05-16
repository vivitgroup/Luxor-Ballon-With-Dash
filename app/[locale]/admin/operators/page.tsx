"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2, Plus, Trash2, Star, Plane, DollarSign,
  Phone, Mail, X, CheckCircle, Calendar, BarChart3, FileDown
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const initialOperators = [
  { id:"1", name:"Sindbad Balloons", nameAr:"بالون السندباد", email:"info@sindbad.com", phone:"+20 100 123 4567", rating:4.9, totalFlights:1200, revenue:45000, isActive:true, visaRevenue:28000, cashRevenue:17000, pendingAmount:2400, passengers:4800, refunds:3, since:"2018", color:"#C8860A", initials:"SB", monthlyRevenue:[3200,3800,4100,3900,4500,4800,5200,4900,5100,4600,4700,4200] },
  { id:"2", name:"Hod Hod Soliman", nameAr:"هدهد سليمان", email:"fly@hodhod.com", phone:"+20 111 234 5678", rating:4.7, totalFlights:980, revenue:38500, isActive:true, visaRevenue:21000, cashRevenue:17500, pendingAmount:1800, passengers:3920, refunds:5, since:"2019", color:"#2E86C1", initials:"HH", monthlyRevenue:[2800,3100,3400,3200,3600,3900,4100,3800,3700,3500,3300,3100] },
  { id:"3", name:"Magic Horizon", nameAr:"الأفق السحري", email:"magic@horizon.eg", phone:"+20 122 345 6789", rating:4.5, totalFlights:720, revenue:28000, isActive:true, visaRevenue:14000, cashRevenue:14000, pendingAmount:900, passengers:2880, refunds:2, since:"2020", color:"#1E8449", initials:"MH", monthlyRevenue:[1900,2200,2400,2300,2600,2800,3000,2700,2500,2400,2300,2100] },
  { id:"4", name:"Sky Cruise", nameAr:"سكاي كروز", email:"sky@cruise.com", phone:"+20 100 456 7890", rating:4.8, totalFlights:560, revenue:22000, isActive:true, visaRevenue:18000, cashRevenue:4000, pendingAmount:1200, passengers:2240, refunds:1, since:"2021", color:"#8E44AD", initials:"SC", monthlyRevenue:[1500,1700,1900,1800,2000,2200,2400,2100,2000,1900,1800,1600] },
  { id:"5", name:"Nile Dream", nameAr:"حلم النيل", email:"info@niledream.eg", phone:"+20 115 567 8901", rating:4.3, totalFlights:310, revenue:12000, isActive:false, visaRevenue:7200, cashRevenue:4800, pendingAmount:0, passengers:1240, refunds:4, since:"2022", color:"#E74C3C", initials:"ND", monthlyRevenue:[800,900,1100,1000,1200,1300,1400,1200,1100,1000,900,800] },
]

type Op = typeof initialOperators[0]

function exportOpPDF(op: Op) {
  const win = window.open("","_blank"); if(!win) return
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  win.document.write(`<!DOCTYPE html><html><head><title>${op.name}</title><style>body{font-family:Arial;margin:30px;color:#1A1A2E}h1{color:${op.color};border-bottom:3px solid ${op.color};padding-bottom:10px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin:20px 0}.stat{background:#f8f8f8;border-radius:10px;padding:15px;border-left:4px solid ${op.color}}.sl{font-size:11px;color:#888}.sv{font-size:22px;font-weight:bold}table{width:100%;border-collapse:collapse;margin-top:20px}th{background:#1A1A2E;color:white;padding:8px;font-size:12px}td{padding:7px 8px;border-bottom:1px solid #eee;font-size:12px}.f{margin-top:30px;color:#aaa;font-size:10px;text-align:center}</style></head><body>
  <h1>🎈 ${op.name} (${op.nameAr})</h1>
  <p><b>Email:</b> ${op.email} | <b>Phone:</b> ${op.phone} | <b>Since:</b> ${op.since} | <b>Status:</b> ${op.isActive?"✅ Active":"❌ Inactive"}</p>
  <div class="grid">
    <div class="stat"><div class="sl">Total Revenue</div><div class="sv">$${op.revenue.toLocaleString()}</div></div>
    <div class="stat"><div class="sl">Visa</div><div class="sv" style="color:#2E86C1">$${op.visaRevenue.toLocaleString()}</div></div>
    <div class="stat"><div class="sl">Cash</div><div class="sv" style="color:#1E8449">$${op.cashRevenue.toLocaleString()}</div></div>
    <div class="stat"><div class="sl">Total Flights</div><div class="sv">${op.totalFlights}</div></div>
    <div class="stat"><div class="sl">Passengers</div><div class="sv">${op.passengers.toLocaleString()}</div></div>
    <div class="stat"><div class="sl">Rating</div><div class="sv">⭐ ${op.rating}</div></div>
  </div>
  <h3>Monthly Revenue 2024</h3>
  <table><thead><tr>${months.map(m=>`<th>${m}</th>`).join("")}</tr></thead><tbody><tr>${op.monthlyRevenue.map(v=>`<td>$${v.toLocaleString()}</td>`).join("")}</tr></tbody></table>
  <div class="f">Luxor Balloons — ${new Date().toLocaleDateString()} — Confidential</div></body></html>`)
  win.document.close(); win.print()
}

function AddModal({ onClose, onAdd }: { onClose:()=>void, onAdd:(op:Op)=>void }) {
  const [form, setForm] = useState({ name:"", nameAr:"", email:"", phone:"" })
  const [done, setDone] = useState(false)
  const submit = () => {
    if(!form.name) return
    const colors = ["#F39C12","#16A085","#8E44AD","#2980B9","#D35400"]
    onAdd({ id:Date.now().toString(), ...form, rating:0, totalFlights:0, revenue:0, isActive:true, visaRevenue:0, cashRevenue:0, pendingAmount:0, passengers:0, refunds:0, since:new Date().getFullYear().toString(), color:colors[Math.floor(Math.random()*5)], initials:form.name.split(" ").map((w:string)=>w[0]).join("").toUpperCase().slice(0,2), monthlyRevenue:Array(12).fill(0) })
    setDone(true); setTimeout(onClose, 1400)
  }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} className="bg-dark-base border border-white/10 rounded-2xl p-6 w-full max-w-md">
        {!done ? <>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-white">Add New Operator / إضافة شركة</h3>
            <button onClick={onClose} className="text-white/40 hover:text-white"><X className="w-5 h-5"/></button>
          </div>
          <div className="space-y-3">
            {[{k:"name",l:"Company Name (EN)",p:"e.g. Sunrise Balloons"},{k:"nameAr",l:"اسم الشركة بالعربي",p:"مثال: بالون الشروق"},{k:"email",l:"Email",p:"info@company.com"},{k:"phone",l:"Phone / الهاتف",p:"+20 100 000 0000"}].map(f=>(
              <div key={f.k}><label className="text-white/50 text-xs mb-1 block">{f.l}</label>
              <Input value={(form as any)[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} placeholder={f.p} className="bg-dark-base-lighter border-white/10 text-white placeholder:text-white/20 focus:border-desert-gold/50"/></div>
            ))}
          </div>
          <div className="flex gap-3 mt-5">
            <Button variant="ghost" onClick={onClose} className="flex-1 text-white/60 border border-white/10">Cancel</Button>
            <Button onClick={submit} className="flex-1 bg-desert-gold hover:bg-desert-gold-light text-dark-base font-bold">Add Operator</Button>
          </div>
        </> : <div className="text-center py-6"><CheckCircle className="w-12 h-12 text-balloon-green-light mx-auto mb-3"/><p className="text-white font-bold text-lg">Operator Added! ✅</p><p className="text-white/40 text-sm">تمت الإضافة بنجاح</p></div>}
      </motion.div>
    </div>
  )
}

function Drawer({ op, onClose }: { op:Op, onClose:()=>void }) {
  const maxR = Math.max(...op.monthlyRevenue)
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  return (
    <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",damping:25}}
      className="fixed right-0 top-0 h-screen w-full max-w-lg bg-dark-base border-l border-white/10 z-50 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl" style={{background:op.color+"30",border:`2px solid ${op.color}55`}}>{op.initials}</div>
            <div><h2 className="text-white font-bold text-lg">{op.name}</h2><p className="text-white/40 text-sm">{op.nameAr}</p></div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white p-2 hover:bg-white/5 rounded-lg"><X className="w-5 h-5"/></button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[{l:"Total Revenue",v:`$${op.revenue.toLocaleString()}`,c:"text-desert-gold"},{l:"💳 Visa",v:`$${op.visaRevenue.toLocaleString()}`,c:"text-sky-blue-light"},{l:"💵 Cash",v:`$${op.cashRevenue.toLocaleString()}`,c:"text-balloon-green-light"},{l:"⏳ Pending",v:`$${op.pendingAmount.toLocaleString()}`,c:"text-yellow-400"},{l:"✈️ Flights",v:op.totalFlights,c:"text-white"},{l:"👥 Passengers",v:op.passengers.toLocaleString(),c:"text-white"},{l:"⭐ Rating",v:`${op.rating}/5`,c:"text-desert-gold"},{l:"↩️ Refunds",v:op.refunds,c:"text-balloon-red-light"}].map(s=>(
            <div key={s.l} className="bg-dark-base-lighter rounded-xl p-3"><div className="text-white/40 text-xs mb-1">{s.l}</div><div className={cn("font-bold",s.c)}>{s.v}</div></div>
          ))}
        </div>
        <div className="bg-dark-base-lighter rounded-xl p-4 mb-4">
          <div className="flex justify-between text-xs text-white/40 mb-2"><span>💳 Visa {Math.round(op.visaRevenue/op.revenue*100)}%</span><span>💵 Cash {Math.round(op.cashRevenue/op.revenue*100)}%</span></div>
          <div className="h-3 bg-white/5 rounded-full flex overflow-hidden">
            <div className="h-full bg-sky-blue/70" style={{width:`${op.visaRevenue/op.revenue*100}%`}}/>
            <div className="h-full bg-balloon-green/70 flex-1"/>
          </div>
        </div>
        <div className="bg-dark-base-lighter rounded-xl p-4 mb-5">
          <div className="flex items-center gap-2 mb-4"><BarChart3 className="w-4 h-4 text-desert-gold"/><span className="text-white/70 text-sm font-medium">Monthly Revenue 2024</span></div>
          <div className="flex items-end gap-1 h-24">
            {op.monthlyRevenue.map((rev,i)=>(
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-sm" style={{height:`${(rev/maxR)*80}px`,background:op.color+"99"}}/>
                <span className="text-white/20 text-[9px]">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-dark-base-lighter rounded-xl p-4 mb-5 space-y-2">
          <div className="flex items-center gap-2 text-white/60 text-sm"><Mail className="w-4 h-4"/>{op.email}</div>
          <div className="flex items-center gap-2 text-white/60 text-sm"><Phone className="w-4 h-4"/>{op.phone}</div>
          <div className="flex items-center gap-2 text-white/60 text-sm"><Calendar className="w-4 h-4"/>Since {op.since}</div>
        </div>
        <Button onClick={()=>exportOpPDF(op)} className="w-full bg-desert-gold/20 border border-desert-gold/30 text-desert-gold hover:bg-desert-gold/30 gap-2">
          <FileDown className="w-4 h-4"/> Export PDF Report / تصدير التقرير
        </Button>
      </div>
    </motion.div>
  )
}

export default function OperatorsPage() {
  const [operators, setOperators] = useState(initialOperators)
  const [showAdd, setShowAdd] = useState(false)
  const [selected, setSelected] = useState<Op|null>(null)
  const [search, setSearch] = useState("")

  const filtered = operators.filter(op => op.name.toLowerCase().includes(search.toLowerCase()) || op.nameAr.includes(search))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-white">Operators Management</h1><p className="text-white/40 text-sm">إدارة شركات البالون — تقارير فردية</p></div>
        <Button onClick={()=>setShowAdd(true)} className="bg-desert-gold hover:bg-desert-gold-light text-dark-base font-bold gap-2 w-fit"><Plus className="w-4 h-4"/>Add Operator / إضافة شركة</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[{l:"Operators",la:"الشركات",v:operators.length,I:Building2,c:"bg-desert-gold/20"},{l:"Active",la:"نشطة",v:operators.filter(o=>o.isActive).length,I:CheckCircle,c:"bg-balloon-green/20"},{l:"Total Revenue",la:"الإيرادات",v:`$${operators.reduce((s,o)=>s+o.revenue,0).toLocaleString()}`,I:DollarSign,c:"bg-sky-blue/20"},{l:"Total Flights",la:"الرحلات",v:operators.reduce((s,o)=>s+o.totalFlights,0).toLocaleString(),I:Plane,c:"bg-balloon-red/20"}].map((s,i)=>(
          <motion.div key={s.l} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}>
            <Card className="bg-dark-base-lighter border-white/10"><CardContent className="p-4 flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0",s.c)}><s.I className="w-5 h-5 text-white"/></div>
              <div><p className="text-white/40 text-xs">{s.l} / {s.la}</p><p className="text-white font-bold text-lg">{s.v}</p></div>
            </CardContent></Card>
          </motion.div>
        ))}
      </div>

      <Input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search / ابحث..." className="bg-dark-base-lighter border-white/10 text-white placeholder:text-white/20 focus:border-desert-gold/50 max-w-sm"/>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((op,i)=>(
          <motion.div key={op.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}>
            <Card className="bg-dark-base-lighter border-white/10 hover:border-white/20 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0" style={{background:op.color+"25",border:`2px solid ${op.color}55`}}>{op.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-white font-bold truncate">{op.name}</h3>
                      <Badge className={cn("text-xs border shrink-0",op.isActive?"bg-balloon-green/20 text-balloon-green-light border-balloon-green/30":"bg-white/5 text-white/30 border-white/10")}>{op.isActive?"Active":"Inactive"}</Badge>
                    </div>
                    <p className="text-white/40 text-sm mb-3">{op.nameAr}</p>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[{l:"Total",v:`$${(op.revenue/1000).toFixed(1)}k`,c:"text-desert-gold"},{l:"💳 Visa",v:`$${(op.visaRevenue/1000).toFixed(1)}k`,c:"text-sky-blue-light"},{l:"💵 Cash",v:`$${(op.cashRevenue/1000).toFixed(1)}k`,c:"text-balloon-green-light"}].map(s=>(
                        <div key={s.l} className="bg-dark-base rounded-lg p-2"><div className="text-white/30 text-[10px]">{s.l}</div><div className={cn("font-bold text-sm",s.c)}>{s.v}</div></div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3 text-xs text-white/40"><span>✈️ {op.totalFlights}</span><span>⭐ {op.rating}</span><span>👥 {op.passengers.toLocaleString()}</span></div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={()=>setSelected(op)} className="text-desert-gold hover:bg-desert-gold/10 h-7 px-2 gap-1 text-xs"><BarChart3 className="w-3 h-3"/>Report</Button>
                        <Button size="sm" variant="ghost" onClick={()=>setOperators(p=>p.map(o=>o.id===op.id?{...o,isActive:!o.isActive}:o))} className="text-white/40 hover:text-white hover:bg-white/5 h-7 px-2 text-xs">{op.isActive?"Pause":"Activate"}</Button>
                        <Button size="sm" variant="ghost" onClick={()=>setOperators(p=>p.filter(o=>o.id!==op.id))} className="text-balloon-red/50 hover:text-balloon-red-light hover:bg-balloon-red/10 h-7 w-7 p-0"><Trash2 className="w-3 h-3"/></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {showAdd && <AddModal onClose={()=>setShowAdd(false)} onAdd={op=>setOperators(p=>[op,...p])}/>}
      <AnimatePresence>
        {selected && <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/50 z-40" onClick={()=>setSelected(null)}/>
          <Drawer op={selected} onClose={()=>setSelected(null)}/>
        </>}
      </AnimatePresence>
    </div>
  )
}
