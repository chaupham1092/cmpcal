// Format the number to currency format (e.g., $1,000.00)
function formatCurrency(value) {
  return '$' + parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Format the number to a standard number format (e.g., 1,000)
function formatNumber(value) {
  return parseInt(value).toLocaleString();
}

// Function to calculate CPM
function calculateCPM() {
  const cost = document.getElementById('cost').value;
  const impressions = document.getElementById('impressions').value;

  if (cost && impressions) {
    const costValue = parseFloat(cost.replace(/[^0-9.-]+/g, ''));
    const impressionsValue = parseInt(impressions.replace(/[^0-9.-]+/g, ''));
    if (!isNaN(costValue) && !isNaN(impressionsValue) && impressionsValue !== 0) {
      const cpm = (costValue / impressionsValue) * 1000;
      document.getElementById('cpm').value = formatCurrency(cpm);
      document.getElementById('resultText').textContent = `Your CPM is ${formatCurrency(cpm)}`;
    }
  }
}

// Function to calculate Cost
function calculateCost() {
  const cpm = document.getElementById('cpmCalc').value;
  const impressions = document.getElementById('impressionsCalc').value;

  if (cpm && impressions) {
    const cpmValue = parseFloat(cpm.replace(/[^0-9.-]+/g, ''));
    const impressionsValue = parseInt(impressions.replace(/[^0-9.-]+/g, ''));
    if (!isNaN(cpmValue) && !isNaN(impressionsValue)) {
      const cost = (cpmValue * impressionsValue) / 1000;
      document.getElementById('costCalc').value = formatCurrency(cost);
      document.getElementById('costResultText').textContent = `Your Media Cost is ${formatCurrency(cost)}`;
    }
  }
}

// Function to calculate Impressions
function calculateImpressions() {
  const cost = document.getElementById('costCalcResult').value;
  const cpm = document.getElementById('cpmCalcResult').value;

  if (cost && cpm) {
    const costValue = parseFloat(cost.replace(/[^0-9.-]+/g, ''));
    const cpmValue = parseFloat(cpm.replace(/[^0-9.-]+/g, ''));
    if (!isNaN(costValue) && !isNaN(cpmValue)) {
      const impressions = (costValue / cpmValue) * 1000;
      document.getElementById('impressionsCalcResult').value = formatNumber(impressions);
      document.getElementById('impressionsResultText').textContent = `Your Total Impressions is ${formatNumber(impressions)}`;
    }
  }
}

// Reset CPM Calculator
function resetCPMCalculator() {
  document.getElementById('cost').value = '';
  document.getElementById('impressions').value = '';
  document.getElementById('cpm').value = '';
  document.getElementById('resultText').textContent = 'Your CPM is …';
}

// Reset Cost Calculator
function resetCostCalculator() {
  document.getElementById('cpmCalc').value = '';
  document.getElementById('impressionsCalc').value = '';
  document.getElementById('costCalc').value = '';
  document.getElementById('costResultText').textContent = 'Your Media Cost is …';
}

// Reset Impressions Calculator
function resetImpressionsCalculator() {
  document.getElementById('costCalcResult').value = '';
  document.getElementById('cpmCalcResult').value = '';
  document.getElementById('impressionsCalcResult').value = '';
  document.getElementById('impressionsResultText').textContent = 'Your Total Impressions is …';
}

// Reset all calculators
function resetAllCalculators() {
  resetCPMCalculator();
  resetCostCalculator();
  resetImpressionsCalculator();
}

// Apply focus and blur events to all relevant fields
const fields = [
  { id: 'cost', format: formatCurrency },
  { id: 'impressions', format: formatNumber },
  { id: 'cpmCalc', format: formatCurrency },
  { id: 'impressionsCalc', format: formatNumber },
  { id: 'costCalcResult', format: formatCurrency },
  { id: 'cpmCalcResult', format: formatCurrency }
];

fields.forEach(({ id, format }) => {
  const input = document.getElementById(id);
  input.addEventListener('focus', () => input.value = input.value.replace(/[^0-9.]/g, ''));
  input.addEventListener('blur', () => {
    if (input.value) input.value = format(input.value);
    if (id === 'cost' || id === 'impressions') calculateCPM();
    if (id === 'cpmCalc' || id === 'impressionsCalc') calculateCost();
    if (id === 'costCalcResult' || id === 'cpmCalcResult') calculateImpressions();
  });
});

// Reset buttons
document.getElementById('resetCPMBtn').addEventListener('click', resetCPMCalculator);
document.getElementById('resetCostBtn').addEventListener('click', resetCostCalculator);
document.getElementById('resetImpressionsBtn').addEventListener('click', resetImpressionsCalculator);
document.getElementById('resetBtn').addEventListener('click', resetAllCalculators);
