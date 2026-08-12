'use client'

import * as React from 'react'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  Store,
  Package,
  TrendingUp,
  Users,
  Receipt,
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

const BRAND_COLOR = '#6A0DAD'
const CHART_COLORS = ['#6A0DAD', '#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE']

/* ─── Zod validation ───────────────────────────────────────────── */
const productSchema = z.object({
  name: z.string().min(1, 'Nama produk diperlukan'),
  category: z.string().min(1, 'Sila pilih kategori'),
  price: z.preprocess((v) => Number(v), z.number().min(0.01, 'Harga perlu lebih daripada 0')),
  stock: z.preprocess((v) => Number(v), z.number().min(0, 'Stok tidak boleh negatif')),
  entrepreneur: z.string().min(1, 'Nama usahawan diperlukan'),
})

const saleSchema = z.object({
  productId: z.string().min(1, 'Sila pilih produk'),
  buyerName: z.string().min(1, 'Nama pembeli diperlukan'),
  quantity: z.preprocess((v) => Number(v), z.number().min(1, 'Kuantiti minimum 1')),
  channel: z.string().min(1, 'Sila pilih saluran jualan'),
})

type ProductFormValues = z.infer<typeof productSchema>
type SaleFormValues = z.infer<typeof saleSchema>

/* ─── Mock data (fallback bila API tiada / serverless) ──────────── */
const MOCK_PRODUCTS = [
  { id: 'p1', name: 'Biskut Badam PUSPA', category: 'makanan', price: 18, stock: 120, entrepreneur: 'Ahmad bin Zulkifli', status: 'active' },
  { id: 'p2', name: 'Kerepek Ubi Keledek', category: 'makanan', price: 10, stock: 85, entrepreneur: 'Siti Rahayu', status: 'active' },
  { id: 'p3', name: 'Telekung Kayangan', category: 'tekstil', price: 89, stock: 40, entrepreneur: 'Norizan binti Ali', status: 'active' },
  { id: 'p4', name: 'Madu Kelulut Asli', category: 'pertanian', price: 55, stock: 60, entrepreneur: 'Muhammad Zain', status: 'active' },
  { id: 'p5', name: 'Batik Tulis Pahang', category: 'tekstil', price: 150, stock: 15, entrepreneur: 'Rosmah bt Ismail', status: 'inactive' },
  { id: 'p6', name: 'Kraftangan Rotan', category: 'kraftangan', price: 75, stock: 0, entrepreneur: 'Khairul Anwar', status: 'out_of_stock' },
]

const MOCK_SALES = [
  { id: 's1', productId: 'p1', productName: 'Biskut Badam PUSPA', buyerName: 'Pusat Zakat Pahang', quantity: 50, total: 900, channel: 'pesanan_korporat', date: '2026-08-08' },
  { id: 's2', productId: 'p2', productName: 'Kerepek Ubi Keledek', buyerName: 'Pasar Ramadan Kuantan', quantity: 30, total: 300, channel: 'bazar', date: '2026-08-07' },
  { id: 's3', productId: 'p4', productName: 'Madu Kelulut Asli', buyerName: 'Aiman (Online)', quantity: 5, total: 275, channel: 'online', date: '2026-08-05' },
  { id: 's4', productId: 'p1', productName: 'Biskut Badam PUSPA', buyerName: 'Koperasi Masjid Indera Mahkota', quantity: 100, total: 1800, channel: 'pesanan_korporat', date: '2026-08-01' },
  { id: 's5', productId: 'p3', productName: 'Telekung Kayangan', buyerName: 'Aisyah (Walk-in)', quantity: 3, total: 267, channel: 'kedai', date: '2026-07-28' },
]

const MOCK_ENTREPRENEURS = [
  { id: 'e1', name: 'Ahmad bin Zulkifli', business: 'Biskut & Kuih Raya', products: 3, sales: 12000, status: 'active' },
  { id: 'e2', name: 'Siti Rahayu', business: 'Kerepek & Snek', products: 2, sales: 6500, status: 'active' },
  { id: 'e3', name: 'Norizan binti Ali', business: 'Jahitan & Telekung', products: 4, sales: 9800, status: 'active' },
  { id: 'e4', name: 'Muhammad Zain', business: 'Madu & Pertanian', products: 2, sales: 4300, status: 'active' },
  { id: 'e5', name: 'Rosmah bt Ismail', business: 'Batik & Tekstil', products: 1, sales: 2100, status: 'pending' },
]

/* ─── Helper ────────────────────────────────────────────────────── */
const CATEGORY_LABELS: Record<string, string> = {
  makanan: 'Makanan & Minuman',
  tekstil: 'Jahitan & Tekstil',
  pertanian: 'Pertanian',
  kraftangan: 'Kraftangan',
  perkhidmatan: 'Perkhidmatan Am',
}

const CHANNEL_LABELS: Record<string, string> = {
  online: 'Online',
  kedai: 'Walk-in / Kedai',
  bazar: 'Bazar / Pameran',
  pesanan_korporat: 'Pesanan Korporat',
  export: 'Eksport',
}

const STATUS_BADGE: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  active: 'default',
  inactive: 'secondary',
  out_of_stock: 'destructive',
  pending: 'outline',
}

function formatMYR(value: number): string {
  return new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: 'MYR',
  }).format(value)
}

export default function PuspaNiagaPage() {
  const [tab, setTab] = useState('produk')
  const [products, setProducts] = useState<any[]>(MOCK_PRODUCTS)
  const [sales, setSales] = useState<any[]>(MOCK_SALES)
  const [entrepreneurs] = useState<any[]>(MOCK_ENTREPRENEURS)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('semua')
  const [productDialogOpen, setProductDialogOpen] = useState(false)
  const [saleDialogOpen, setSaleDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  /* ── Data fetch dengan graceful fallback ke mock ── */
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [pRes, sRes] = await Promise.all([
        fetch('/api/v1/puspa-niaga/products'),
        fetch('/api/v1/puspa-niaga/sales'),
      ])
      const pResult = await pRes.json()
      const sResult = await sRes.json()
      if (pResult.success) setProducts(pResult.data)
      if (sResult.success) setSales(sResult.data)
    } catch (error) {
      console.error('Error fetching PUSPA Niaga data:', error)
      setProducts(MOCK_PRODUCTS)
      setSales(MOCK_SALES)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  /* ── KPI & chart computation ── */
  const stats = useMemo(() => {
    const activeProducts = products.filter((p) => p.status === 'active').length
    const totalRevenue = sales.reduce((acc, s) => acc + (Number(s.total) || 0), 0)
    const monthlySales = sales.filter((s) => (s.date || '').startsWith('2026-08')).length
    return { activeProducts, totalRevenue, monthlySales, entrepreneurs: entrepreneurs.length }
  }, [products, sales, entrepreneurs])

  const revenueByChannel = useMemo(() => {
    const map: Record<string, number> = {}
    sales.forEach((s) => {
      const ch = s.channel || 'unknown'
      map[ch] = (map[ch] || 0) + (Number(s.total) || 0)
    })
    return Object.entries(map)
      .map(([key, value]) => ({ name: CHANNEL_LABELS[key] || key, value }))
      .sort((a, b) => b.value - a.value)
  }, [sales])

  const topProducts = useMemo(() => {
    const source = products.length > 0 ? products : MOCK_PRODUCTS
    const filter = categoryFilter !== 'semua' ? categoryFilter : ''
    const q = searchQuery.trim().toLowerCase()
    return source.filter((p: any) => {
      if (filter && p.category !== filter) return false
      if (q && !String(p.name || '').toLowerCase().includes(q)) return false
      return true
    })
  }, [products, searchQuery, categoryFilter])

  /* ── Form: Daftar Produk ── */
  const productForm = useForm<ProductFormValues, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: { name: '', category: '', price: 0, stock: 0, entrepreneur: '' },
  })

  const onProductSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/v1/puspa-niaga/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Gagal mendaftarkan produk')
      toast.success('Produk Didaftarkan', {
        description: `${data.name} telah disenaraikan dalam PUSPA Niaga.`,
      })
      setProductDialogOpen(false)
      productForm.reset()
      fetchData()
    } catch (error) {
      toast.error('Ralat', {
        description: error instanceof Error ? error.message : 'Gagal mendaftarkan produk. Sila cuba lagi.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ── Form: Rekod Jualan ── */
  const saleForm = useForm<SaleFormValues, unknown, SaleFormValues>({
    resolver: zodResolver(saleSchema) as any,
    defaultValues: { productId: '', buyerName: '', quantity: 1, channel: '' },
  })

  const onSaleSubmit = async (data: SaleFormValues) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/v1/puspa-niaga/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Gagal merekod jualan')
      toast.success('Jualan Direkod', { description: 'Transaksi jualan telah disimpan.' })
      setSaleDialogOpen(false)
      saleForm.reset()
      fetchData()
    } catch (error) {
      toast.error('Ralat', {
        description: error instanceof Error ? error.message : 'Gagal merekod jualan. Sila cuba lagi.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (d: string) => new Date(d).toLocaleDateString('ms-MY', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 sm:p-6 lg:p-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-[#9b59b6]">
            PUSPA Niaga
          </h1>
          <p className="text-muted-foreground mt-1">
            Platform niaga & pemasaran produk asnaf — daripada usahawan kepada pasaran.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setSaleDialogOpen(true)}
          >
            <Receipt className="h-4 w-4" />
            Rekod Jualan
          </Button>
          <Button className="gap-2 bg-[#9b59b6] hover:bg-[#8e44ad]" onClick={() => setProductDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Daftar Produk
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produk Aktif</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '—' : stats.activeProducts}</div>
            <p className="text-xs text-muted-foreground">dari {products.length} produk disenaraikan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jumlah Jualan</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '—' : formatMYR(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">{stats.monthlySales} transaksi bulan ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usahawan</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.entrepreneurs}</div>
            <p className="text-xs text-muted-foreground">aktif dalam program niaga</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saluran Teratas</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{revenueByChannel[0]?.name || '—'}</div>
            <p className="text-xs text-muted-foreground">
              {revenueByChannel[0] ? formatMYR(revenueByChannel[0].value) : 'belum ada data'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="produk">Produk</TabsTrigger>
          <TabsTrigger value="jualan">Jualan</TabsTrigger>
          <TabsTrigger value="analisis">Analisis</TabsTrigger>
        </TabsList>

        {/* TAB: PRODUK */}
        <TabsContent value="produk" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Senarai Produk</CardTitle>
                <CardDescription>Produk usahawan asnaf di platform PUSPA Niaga</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari produk..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 pl-8"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Kategori</SelectItem>
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produk</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Usahawan</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Stok</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{CATEGORY_LABELS[p.category] || p.category}</TableCell>
                      <TableCell>{p.entrepreneur}</TableCell>
                      <TableCell>{formatMYR(Number(p.price))}</TableCell>
                      <TableCell>
                        <Badge variant={Number(p.stock) === 0 ? 'destructive' : 'secondary'}>
                          {Number(p.stock) === 0 ? 'Habis' : p.stock}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={p.status === 'active' ? 'default' : p.status === 'inactive' ? 'secondary' : 'destructive'}>
                          {p.status === 'active' ? 'Aktif' : p.status === 'inactive' ? 'Tidak Aktif' : 'Stok Habis'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: JUALAN */}
        <TabsContent value="jualan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaksi Jualan</CardTitle>
              <CardDescription>Semua rekod jualan PUSPA Niaga</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tarikh</TableHead>
                    <TableHead>Produk</TableHead>
                    <TableHead>Pembeli</TableHead>
                    <TableHead>Saluran</TableHead>
                    <TableHead>Kuantiti</TableHead>
                    <TableHead className="text-right">Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{formatDate(s.date)}</TableCell>
                      <TableCell className="font-medium">{s.productName}</TableCell>
                      <TableCell>{s.buyerName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{CHANNEL_LABELS[s.channel] || s.channel}</Badge>
                      </TableCell>
                      <TableCell>{s.quantity}</TableCell>
                      <TableCell className="text-right font-medium">{formatMYR(Number(s.total))}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: ANALISIS */}
        <TabsContent value="analisis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hasil Mengikut Saluran</CardTitle>
              <CardDescription>Agihan jualan mengikut saluran pemasaran</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              {revenueByChannel.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueByChannel} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v: any) => [formatMYR(Number(v)), 'Hasil']} />
                    <Bar dataKey="value" fill={BRAND_COLOR} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  Tiada data jualan lagi
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog: Daftar Produk */}
      <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Daftar Produk Baru</DialogTitle>
            <DialogDescription>
              Masukkan maklumat produk untuk disenaraikan dalam PUSPA Niaga.
            </DialogDescription>
          </DialogHeader>
          <Form {...productForm}>
            <form onSubmit={productForm.handleSubmit(onProductSubmit)} className="space-y-4 pt-2">
              <FormField
                control={productForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Produk</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: Biskut Badam PUSPA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={productForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="makanan">Makanan & Minuman</SelectItem>
                          <SelectItem value="tekstil">Jahitan & Tekstil</SelectItem>
                          <SelectItem value="pertanian">Pertanian</SelectItem>
                          <SelectItem value="kraftangan">Kraftangan</SelectItem>
                          <SelectItem value="perkhidmatan">Perkhidmatan Am</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={productForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga (RM)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={productForm.control}
                name="entrepreneur"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usahawan</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama usahawan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={productForm.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stok</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full bg-[#9b59b6] hover:bg-[#8e44ad]">
                {isSubmitting ? 'Menyimpan...' : 'Daftarkan Produk'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog: Rekod Jualan */}
      <Dialog open={saleDialogOpen} onOpenChange={setSaleDialogOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Rekod Jualan</DialogTitle>
            <DialogDescription>
              Catat transaksi jualan daripada pelbagai saluran.
            </DialogDescription>
          </DialogHeader>
          <Form {...saleForm}>
            <form onSubmit={saleForm.handleSubmit(onSaleSubmit)} className="space-y-4 pt-2">
              <FormField
                control={saleForm.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produk</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih produk" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {products.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name} — {formatMYR(Number(p.price))}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={saleForm.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kuantiti</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={saleForm.control}
                  name="channel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Saluran</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih saluran" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="kedai">Walk-in / Kedai</SelectItem>
                          <SelectItem value="bazar">Bazar / Pameran</SelectItem>
                          <SelectItem value="pesanan_korporat">Pesanan Korporat</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={saleForm.control}
                name="buyerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Pembeli</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: Pusat Zakat Pahang" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full bg-[#9b59b6] hover:bg-[#8e44ad]">
                {isSubmitting ? 'Menyimpan...' : 'Simpan Jualan'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}