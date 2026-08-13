'use client'

import { toast } from 'sonner'
import { SkeletonLoader } from '@/components/ui/skeleton-loader'
import { useDashboardData } from './hooks/use-dashboard-data'
import { ExecutiveHeader } from './components/executive-header'
import { KpiCardGrid } from './components/kpi-cards'
import { SlaAlertStrip } from './components/sla-alert-strip'
import { FraudAlerts } from './components/fraud-alerts'
import { PendingActions } from './components/pending-actions'
import { MariaInsights } from './components/maria-insights'
import { FinancialTrend } from './components/financial-trend'
import { AsnafDistribution } from './components/asnaf-distribution'
import { CasePipeline } from './components/case-pipeline'
import { FinancialHealth } from './components/financial-health'
import { ProgrammeBurn } from './components/programme-burn'
import { DonorWidget } from './components/donor-widget'
import { VolunteerWidget } from './components/volunteer-widget'
import { RecentActivities } from './components/recent-activities'
import { GoalTracker } from './components/goal-tracker'
import { SedekahTracker } from './components/sedekah-tracker'
import dynamic from 'next/dynamic'
import { useMediaQuery } from '@reactuses/core'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const GeoMap = dynamic(() => import('./components/geo-map').then(m => ({ default: m.GeoMap })), {
  ssr: false,
  loading: () => <SkeletonLoader />,
})

export default function Dashboard() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const {
    trendData,
    asnafData,
    caseData,
    stats,
    recentActivities,
    pendingActions,
    casePipeline,
    financialHealth,
    programmes,
    volunteers,
    donors,
    sumbangan,
    compliance,
    totalAsnaf,
    period,
    setPeriod,
    isLoading,
    error,
  } = useDashboardData()

  if (error) {
    toast.error('Gagal memuat turun data Dashboard', {
      description: error.message,
    })
  }

  if (isLoading) {
    return <SkeletonLoader />
  }

  return (
    <div className="space-y-6 pb-8">
      {/* 1. Executive Welcome Banner & Quick Action Launchers */}
      <ExecutiveHeader />

      {/* 2. Critical Alert Strips (SLA Overdue & Data Integrity) */}
      <SlaAlertStrip
        overdueCases={pendingActions?.overdueCases}
        pendingDisbursements={pendingActions?.pendingDisbursements}
      />
      <FraudAlerts />

      {/* 3. 4-Column Bento KPI Cards */}
      <KpiCardGrid stats={stats} sumbangan={sumbangan} compliance={compliance} />

      {/* 4. Action-Required Items Grid */}
      <PendingActions data={pendingActions} />

      {/* 5. Maria AI Insights */}
      <MariaInsights />

      {/* 6. Aliran Kewangan & Agihan Asnaf */}
      {isMobile ? (
        <Tabs defaultValue="trend">
          <TabsList className="w-full">
            <TabsTrigger value="trend" className="flex-1">Aliran</TabsTrigger>
            <TabsTrigger value="asnaf" className="flex-1">Asnaf</TabsTrigger>
            <TabsTrigger value="map" className="flex-1">Peta</TabsTrigger>
          </TabsList>
          <TabsContent value="trend"><FinancialTrend data={trendData} period={period} onPeriodChange={setPeriod} /></TabsContent>
          <TabsContent value="asnaf"><AsnafDistribution data={asnafData} totalMembers={stats.totalMembers} totalAsnaf={totalAsnaf} /></TabsContent>
          <TabsContent value="map"><GeoMap /></TabsContent>
        </Tabs>
      ) : (
        <div className="grid gap-4 lg:grid-cols-12">
          <FinancialTrend data={trendData} period={period} onPeriodChange={setPeriod} />
          <AsnafDistribution
            data={asnafData}
            totalMembers={stats.totalMembers}
            totalAsnaf={totalAsnaf}
          />
        </div>
      )}

      {/* GeoMap Desktop */}
      {!isMobile && (
        <div className="grid gap-4 lg:grid-cols-12">
          <GeoMap />
          <SedekahTracker />
        </div>
      )}

      {/* Goal Tracker */}
      <div className="grid gap-4 lg:grid-cols-12">
        <GoalTracker totalDonated={financialHealth?.totalDonated ?? 0} totalMembers={stats.totalMembers} />
        <ProgrammeBurn programmes={programmes} />
      </div>

      {/* 7. Case Pipeline Funnel & Financial Health Scorecard */}
      <div className="grid gap-4 lg:grid-cols-12">
        <CasePipeline data={casePipeline} />
        <FinancialHealth data={financialHealth} />
      </div>

      {/* 8. Operational Widgets */}
      <div className="grid gap-4 lg:grid-cols-12">
        <DonorWidget data={donors} />
        {isMobile && <SedekahTracker />}
      </div>

      {/* 9. Volunteers & Recent Activity Row */}
      <div className="grid gap-4 lg:grid-cols-12">
        <VolunteerWidget data={volunteers} />
        <RecentActivities activities={recentActivities} />
      </div>
    </div>
  )
}