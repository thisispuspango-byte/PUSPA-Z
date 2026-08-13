import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    await requireAuth()

    const { searchParams } = new URL(request.url)
    const periodParam = searchParams.get('period') || '6m'

    // 1. Time range: rolling months based on periodParam
    let monthsToFetch = 6
    if (periodParam === '1m') monthsToFetch = 1
    else if (periodParam === '3m') monthsToFetch = 3
    else if (periodParam === '1y') monthsToFetch = 12

    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - (monthsToFetch - 1))
    startDate.setDate(1)
    startDate.setHours(0, 0, 0, 0)

    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    const firstDayOfCurrentMonth = new Date()
    firstDayOfCurrentMonth.setDate(1)
    firstDayOfCurrentMonth.setHours(0, 0, 0, 0)

    // 2. Parallel data fetching with Promise.all
    const [
      donations,
      disbursements,
      asnafRaw,
      statusRaw,
      totalMembers,
      activeCases,
      sumbanganTotal,
      confirmedDonationsCount,
      compliantDonationsCount,
      recentActivities,
      // Enhanced queries for Task 2.1
      overdueCasesCount,
      newApplicationsCount,
      pendingDisbursementsCount,
      ekycPendingCount,
      complianceOverdueCount,
      casePipelineRaw,
      totalDisbursedAgg,
      donationsByCategoryRaw,
      activeProgrammesRaw,
      activeVolunteersCount,
      volunteerHoursAgg,
      topVolunteersRaw,
      activeDonorsCount,
      newDonorsCount,
      repeatDonorsCount,
      topDonorsRaw,
    ] = await Promise.all([
      db.donation.findMany({
        where: { createdAt: { gte: startDate }, status: 'confirmed' },
        select: { amount: true, createdAt: true },
      }),
      db.disbursement.findMany({
        where: {
          createdAt: { gte: startDate },
          status: { in: ['disbursed', 'verified', 'approved'] },
        },
        select: { amount: true, createdAt: true },
      }),
      db.member.groupBy({
        by: ['asnafCategory'],
        _count: { _all: true },
      }),
      db.case.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
      db.member.count(),
      db.case.count({ where: { status: { notIn: ['closed', 'rejected'] } } }),
      db.donation.aggregate({
        _sum: { amount: true },
        where: { status: 'confirmed' },
      }),
      db.donation.count({ where: { status: 'confirmed' } }),
      db.donation.count({
        where: { status: 'confirmed', shariahCompliant: true },
      }),
      db.activity.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          type: true,
          category: true,
          title: true,
          description: true,
          createdAt: true,
        },
      }),
      // 1. Pending actions counts
      db.case.count({
        where: {
          status: { notIn: ['closed', 'rejected'] },
          updatedAt: { lt: fourteenDaysAgo },
        },
      }),
      db.aidApplication.count({ where: { status: 'PENDING' } }),
      db.disbursement.count({
        where: { status: { in: ['pending', 'approved'] }, disbursedDate: null },
      }),
      db.eKYCVerification.count({ where: { status: 'pending' } }),
      db.complianceRecord.count({
        where: { status: { notIn: ['compliant', 'completed'] } },
      }),
      // 2. 9-Stage Case Pipeline breakdown
      db.case.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
      // 3. Financial health aggregates
      db.disbursement.aggregate({
        _sum: { amount: true },
        where: { status: { in: ['disbursed', 'verified'] } },
      }),
      db.donation.groupBy({
        by: ['category'],
        _sum: { amount: true },
        where: { status: 'confirmed' },
      }),
      // 4. Programmes
      db.programme.findMany({
        where: { status: { in: ['active', 'planning'] } },
        take: 6,
        select: {
          id: true,
          name: true,
          category: true,
          status: true,
          budget: true,
          spent: true,
          targetBeneficiaries: true,
          _count: { select: { beneficiaries: true } },
        },
      }),
      // 5. Volunteers
      db.volunteer.count({ where: { status: 'active' } }),
      db.volunteerActivity.aggregate({
        _sum: { hours: true },
        where: { status: 'approved', createdAt: { gte: firstDayOfCurrentMonth } },
      }),
      db.volunteer.findMany({
        take: 3,
        orderBy: { totalHours: 'desc' },
        select: { id: true, name: true, totalHours: true },
      }),
      // 6. Donors
      db.donor.count({ where: { status: 'active' } }),
      db.donor.count({ where: { createdAt: { gte: firstDayOfCurrentMonth } } }),
      db.donor.count({ where: { donationCount: { gt: 1 } } }),
      db.donor.findMany({
        take: 3,
        orderBy: { totalDonated: 'desc' },
        select: { id: true, name: true, totalDonated: true, type: true },
      }),
    ])

    // 3. Trend aggregation (donations vs disbursements per month)
    const monthNames = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogos', 'Sep', 'Okt', 'Nov', 'Dis']
    const trendData: Array<{ name: string; sumbangan: number; agihan: number }> = []

    let prevSumbangan = 0
    let prevAgihan = 0

    for (let i = 0; i < monthsToFetch; i++) {
      const targetDate = new Date()
      targetDate.setMonth(targetDate.getMonth() - (monthsToFetch - 1 - i))
      const m = targetDate.getMonth()
      const y = targetDate.getFullYear()

      const monthDonations = donations
        .filter((d) => {
          const date = new Date(d.createdAt)
          return date.getMonth() === m && date.getFullYear() === y
        })
        .reduce((sum, d) => sum + Number(d.amount || 0), 0)

      const monthDisbursements = disbursements
        .filter((d) => {
          const date = new Date(d.createdAt)
          return date.getMonth() === m && date.getFullYear() === y
        })
        .reduce((sum, d) => sum + Number(d.amount || 0), 0)

      trendData.push({
        name: monthNames[m],
        sumbangan: monthDonations,
        agihan: monthDisbursements,
      })

      if (i < monthsToFetch - 1) {
        prevSumbangan = monthDonations
        prevAgihan = monthDisbursements
      }
    }

    // 4. Asnaf distribution
    const asnafColors = ['#a78bfa', '#8b5cf6', '#f97316', '#10b981', '#eab308', '#ef4444', '#c084fc', '#94a3b8']
    const asnafData = asnafRaw.map((r, i) => ({
      name: r.asnafCategory
        ? r.asnafCategory.charAt(0).toUpperCase() + r.asnafCategory.slice(1)
        : 'Lain-lain',
      value: r._count._all,
      color: asnafColors[i % asnafColors.length],
    }))

    // 5. Case status distribution (legacy 4-group mapping)
    const statusLabelMap: Record<string, string> = {
      active: 'Aktif',
      pending: 'Dalam Proses',
      in_review: 'Dalam Proses',
      approved: 'Selesai',
      closed: 'Selesai',
      rejected: 'Ditunda',
      on_hold: 'Ditunda',
    }

    const caseStatusGroups: Record<string, number> = {}
    for (const r of statusRaw) {
      const display = statusLabelMap[r.status] || r.status.charAt(0).toUpperCase() + r.status.slice(1)
      caseStatusGroups[display] = (caseStatusGroups[display] || 0) + r._count._all
    }
    const caseStatusData = Object.entries(caseStatusGroups).map(([name, total]) => ({ name, total }))

    // 6. 9-Stage Case Pipeline mapping
    const pipelineStages = [
      'draft',
      'intake',
      'verification',
      'assessment',
      'approval',
      'disbursement',
      'follow_up',
      'closed',
      'rejected',
    ]
    const casePipeline: Record<string, number> = {}
    for (const stage of pipelineStages) {
      casePipeline[stage] = 0
    }
    for (const r of casePipelineRaw) {
      const s = r.status.toLowerCase()
      casePipeline[s] = (casePipeline[s] || 0) + r._count._all
    }

    // 7. Financial Health calculations
    const totalDonated = Number(sumbanganTotal._sum.amount || 0)
    const totalDisbursed = Number(totalDisbursedAgg._sum.amount || 0)
    const netBalance = totalDonated - totalDisbursed
    const collectionRatio = totalDisbursed > 0 ? Math.round((totalDonated / totalDisbursed) * 100) / 100 : 1.0

    const donationsByCategory: Record<string, number> = {}
    for (const r of donationsByCategoryRaw) {
      const cat = r.category || 'general'
      donationsByCategory[cat] = Number(r._sum.amount || 0)
    }

    // 8. Programme Utilization
    const programmes = activeProgrammesRaw.map((p) => {
      const budget = Number(p.budget || 0)
      const spent = Number(p.spent || 0)
      const utilization = budget > 0 ? Math.round((spent / budget) * 100) : 0
      return {
        id: p.id,
        name: p.name,
        category: p.category,
        status: p.status,
        budget,
        spent,
        utilization,
        beneficiaryCount: p._count.beneficiaries,
      }
    })

    // 9. Trend %
    const currentSumbangan = trendData[trendData.length - 1]?.sumbangan || 0
    const sumbanganTrend =
      prevSumbangan > 0 ? ((currentSumbangan - prevSumbangan) / prevSumbangan) * 100 : currentSumbangan > 0 ? 100 : 0

    const currentAgihan = trendData[trendData.length - 1]?.agihan || 0
    const agihanTrend =
      prevAgihan > 0 ? ((currentAgihan - prevAgihan) / prevAgihan) * 100 : currentAgihan > 0 ? 100 : 0

    const compliancePct =
      confirmedDonationsCount > 0 ? Math.round((compliantDonationsCount / confirmedDonationsCount) * 1000) / 10 : 100

    const totalDonors = activeDonorsCount || 1
    const retentionRate = Math.round((repeatDonorsCount / totalDonors) * 100)

    return NextResponse.json({
      success: true,
      data: {
        trend: trendData,
        asnaf: asnafData.length > 0 ? asnafData : null,
        caseStatus: caseStatusData.length > 0 ? caseStatusData : null,
        stats: {
          totalMembers,
          activeCases,
          sumbangan: totalDonated,
          compliance: compliancePct,
          sumbanganTrend: Math.round(sumbanganTrend * 10) / 10,
          agihanTrend: Math.round(agihanTrend * 10) / 10,
          membersTrend: 12.5,
          casesTrend: 4.5,
          complianceTrend: 2.1,
        },
        activities: recentActivities.map((a) => ({
          id: a.id,
          type: a.type,
          category: a.category,
          title: a.title,
          description: a.description,
          createdAt: a.createdAt.toISOString(),
        })),
        // Enhanced fields for Task 2.1
        pendingActions: {
          overdueCases: overdueCasesCount,
          newApplications: newApplicationsCount,
          pendingDisbursements: pendingDisbursementsCount,
          ekycPending: ekycPendingCount,
          complianceOverdue: complianceOverdueCount,
        },
        casePipeline,
        financialHealth: {
          totalDonated,
          totalDisbursed,
          netBalance,
          collectionRatio,
          donationsByCategory,
        },
        programmes,
        volunteers: {
          totalActive: activeVolunteersCount,
          hoursThisMonth: Number(volunteerHoursAgg._sum.hours || 0),
          topContributors: topVolunteersRaw.map((v) => ({
            id: v.id,
            name: v.name,
            hours: v.totalHours,
          })),
        },
        donors: {
          totalActive: activeDonorsCount,
          newThisMonth: newDonorsCount,
          retentionRate,
          topDonors: topDonorsRaw.map((d) => ({
            id: d.id,
            name: d.name,
            total: Number(d.totalDonated || 0),
            type: d.type,
          })),
        },
      },
    })
  } catch (error) {
    console.error('[DASHBOARD_API_ERROR]:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data dashboard' },
      { status: 500 }
    )
  }
}
