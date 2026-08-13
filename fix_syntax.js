const fs = require('fs');
let content = fs.readFileSync('src/app/api/v1/reports/route.ts', 'utf8');

// There is a missing closing brace `}` from replacing the block without keeping `}`
content = content.replace(
`        for (const key of growthMonthKeys) {
          monthlyGrowth.push({
            month: growthMonthMap[key].monthStr,
            count: growthMonthMap[key].count
          })`,
`        for (const key of growthMonthKeys) {
          monthlyGrowth.push({
            month: growthMonthMap[key].monthStr,
            count: growthMonthMap[key].count
          })
        }`);


content = content.replace(
`        for (const key of donationMonthKeys) {
          monthlyDonations.push({
            month: donationMonthMap[key].monthStr,
            amount: donationMonthMap[key].amount
          })`,
`        for (const key of donationMonthKeys) {
          monthlyDonations.push({
            month: donationMonthMap[key].monthStr,
            amount: donationMonthMap[key].amount
          })
        }`);


content = content.replace(
`        for (const key of disMonthKeys) {
          monthlyDisbursements.push({
            month: disMonthMap[key].monthStr,
            amount: disMonthMap[key].amount
          })`,
`        for (const key of disMonthKeys) {
          monthlyDisbursements.push({
            month: disMonthMap[key].monthStr,
            amount: disMonthMap[key].amount
          })
        }`);

fs.writeFileSync('src/app/api/v1/reports/route.ts', content);
