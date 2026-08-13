const fs = require('fs');

const path = 'src/app/api/v1/reports/route.ts';
let lines = fs.readFileSync(path, 'utf8').split('\n');

function replaceLines(startStr, endStr, replacementStr) {
  let startIdx = -1;
  let endIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(startStr)) {
      startIdx = i;
      break;
    }
  }

  if (startIdx !== -1) {
    for (let i = startIdx; i < lines.length; i++) {
      if (lines[i].includes(endStr)) {
        endIdx = i;
        break;
      }
    }
  }

  if (startIdx !== -1 && endIdx !== -1) {
    const newLines = replacementStr.split('\n');
    lines.splice(startIdx, endIdx - startIdx + 1, ...newLines);
    return true;
  }
  return false;
}

const r1 = replaceLines(
  "const monthlyGrowth: { month: string; count: number }[] = []",
  "monthlyGrowth.push({ month: monthStr, count })",
  `        const monthlyGrowth: { month: string; count: number }[] = []
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
          })`
);
console.log("R1 replaced:", r1);

// We need to also remove the extra closing brace that was left after `monthlyGrowth.push(...)`
if (r1) {
  let found = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("month: growthMonthMap[key].monthStr,")) {
       // Search for the next `}` and remove it because it belonged to the old for loop
       for(let j=i; j<lines.length; j++) {
          if (lines[j].trim() === "}") {
            lines.splice(j, 1);
            found = true;
            break;
          }
       }
       if (found) break;
    }
  }
}


const r2 = replaceLines(
  "const monthlyDonations: { month: string; amount: number }[] = []",
  "monthlyDonations.push({ month: monthStr, amount })",
  `        const monthlyDonations: { month: string; amount: number }[] = []
        const donationMonthMap: Record<string, { monthStr: string; amount: number }> = {}
        const donationMonthKeys: string[] = []

        for (let i = 11; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
          const monthStr = d.toISOString().slice(0, 7)
          const localKey = \`\${d.getFullYear()}-\${d.getMonth()}\`
          donationMonthKeys.push(localKey)
          donationMonthMap[localKey] = { monthStr, amount: 0 }
        }

        donations.forEach((don) => {
          const created = new Date(don.createdAt)
          const localKey = \`\${created.getFullYear()}-\${created.getMonth()}\`
          if (donationMonthMap[localKey]) {
            donationMonthMap[localKey].amount += Number(don.amount)
          }
        })

        for (const key of donationMonthKeys) {
          monthlyDonations.push({
            month: donationMonthMap[key].monthStr,
            amount: donationMonthMap[key].amount
          })`
);
console.log("R2 replaced:", r2);

if (r2) {
  let found = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("month: donationMonthMap[key].monthStr,")) {
       // Search for the next `}` and remove it because it belonged to the old for loop
       for(let j=i; j<lines.length; j++) {
          if (lines[j].trim() === "}") {
            lines.splice(j, 1);
            found = true;
            break;
          }
       }
       if (found) break;
    }
  }
}

const r3 = replaceLines(
  "const monthlyDisbursements: { month: string; amount: number }[] = []",
  "monthlyDisbursements.push({ month: monthStr, amount })",
  `        const monthlyDisbursements: { month: string; amount: number }[] = []
        const disMonthMap: Record<string, { monthStr: string; amount: number }> = {}
        const disMonthKeys: string[] = []

        for (let i = 11; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
          const monthStr = d.toISOString().slice(0, 7)
          const localKey = \`\${d.getFullYear()}-\${d.getMonth()}\`
          disMonthKeys.push(localKey)
          disMonthMap[localKey] = { monthStr, amount: 0 }
        }

        disbursements.forEach((dis) => {
          const created = new Date(dis.createdAt)
          const localKey = \`\${created.getFullYear()}-\${created.getMonth()}\`
          if (disMonthMap[localKey]) {
            disMonthMap[localKey].amount += Number(dis.amount)
          }
        })

        for (const key of disMonthKeys) {
          monthlyDisbursements.push({
            month: disMonthMap[key].monthStr,
            amount: disMonthMap[key].amount
          })`
);
console.log("R3 replaced:", r3);

if (r3) {
  let found = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("month: disMonthMap[key].monthStr,")) {
       // Search for the next `}` and remove it because it belonged to the old for loop
       for(let j=i; j<lines.length; j++) {
          if (lines[j].trim() === "}") {
            lines.splice(j, 1);
            found = true;
            break;
          }
       }
       if (found) break;
    }
  }
}


fs.writeFileSync(path, lines.join('\n'));
