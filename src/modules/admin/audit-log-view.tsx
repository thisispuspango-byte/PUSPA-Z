'use client'

import { useState, useEffect } from 'react'
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  Card, CardContent, CardHeader, CardTitle, Badge, ScrollArea
} from '@/components/ui'
import { Shield, Clock, User, Cpu, Settings } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ms } from 'date-fns/locale'

export function AuditLogView() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/v1/admin/audit-logs?limit=20')
      .then(res => res.json())
      .then(json => {
        if (json.success) setLogs(json.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <Card className="border-primary/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Audit Trail & Aktiviti Sistem
          </CardTitle>
          <p className="text-xs text-muted-foreground">Log penukaran tetapan dan penggunaan alatan AI (Hermes v5)</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[150px] text-xs uppercase">Masa</TableHead>
                <TableHead className="text-xs uppercase">Pengguna</TableHead>
                <TableHead className="text-xs uppercase">Aktiviti</TableHead>
                <TableHead className="text-xs uppercase">Butiran</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center py-10">Memuatkan log...</TableCell></TableRow>
              ) : logs.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-10">Tiada rekod audit ditemui.</TableCell></TableRow>
              ) : logs.map((log) => (
                <TableRow key={log.id} className="text-xs">
                  <TableCell className="text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true, locale: ms })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">{log.user?.name || 'Sistem'}</span>
                      <span className="text-[10px] opacity-60 uppercase">{log.user?.role}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {log.type === 'SETTINGS_UPDATE' ? <Settings className="h-2.5 w-2.5 mr-1" /> : <Cpu className="h-2.5 w-2.5 mr-1" />}
                      {log.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[250px] truncate font-mono text-[10px] bg-muted/30 p-1 rounded">
                      {log.type === 'SETTINGS_UPDATE' 
                        ? `Model: ${log.metadata?.agentModel} | Temp: ${log.metadata?.temperature}`
                        : `Tool: ${log.metadata?.tool} | Status: ${log.metadata?.status}`
                      }
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
