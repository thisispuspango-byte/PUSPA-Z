const fs = require('fs');

let content = fs.readFileSync('src/app/api/v1/reports/route.ts', 'utf8');

const regexGrowth = /        const monthlyGrowth: \{ month: string; count: number \}\[\] = \[\]\n        for \(let i = 11; i >= 0; i--\) \{\n          const d = new Date\(now\.getFullYear\(\), now\.getMonth\(\) - i, 1\)\n          const monthStr = d\.toISOString\(\)\.slice\(0, 7\)\n          const count = members\.filter\(\(m\) => \{\n            const created = new Date\(m\.createdAt\)\n            return created\.getFullYear\(\) === d\.getFullYear\(\) \&\& created\.getMonth\(\) === d\.getMonth\(\)\n          \}\)\.length\n          monthlyGrowth\.push\(\{ month: monthStr, count \}\)\n        \}/;

const replacementGrowth = `        const monthlyGrowth: { month: string; count: number }[] = []
        const growthMonthMap: Record<string, { monthStr: string; count: number }> = {}
        const growthMonthKeys: string[] = []

        for (let i = 11; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
          const monthStr = d.toISOString().slice(0, 7)
          const localKey = \`\${d.getFullYear()}-\${d.getMonth()}\`
          growthMonthKeys.push(localKey)
          growthMonthMap[localKey] = { monthStr, count: 0 }
        }

        members.forEach((m) => {
          const created = new Date(m.createdAt)
          const localKey = \`\${created.getFullYear()}-\${created.getMonth()}\`
          if (growthMonthMap[localKey]) {
            growthMonthMap[localKey].count++
          }
        })

        for (const key of growthMonthKeys) {
          monthlyGrowth.push({
            month: growthMonthMap[key].monthStr,
            count: growthMonthMap[key].count
          })
        }`;

content = content.replace(regexGrowth, replacementGrowth);

fs.writeFileSync('src/app/api/v1/reports/route.ts', content);
