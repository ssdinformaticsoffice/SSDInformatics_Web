const fs = require('fs');
const path = require('path');
const vm = require('vm');

const file = path.join(__dirname, 'src', 'data', 'serviceData.js');
const content = fs.readFileSync(file, 'utf8');
const importMatch = content.match(/import\s*\{([\s\S]*?)\}\s*from\s*"lucide-react"/);
if (!importMatch) {
  console.error('NO IMPORT MATCH');
  process.exit(1);
}
const imports = importMatch[1].split(',').map(s => s.trim()).filter(Boolean);
const usedIcons = [...new Set(Array.from(content.matchAll(/icon\s*:\s*([A-Za-z0-9_]+)/g)).map(m => m[1]))];
const missingIconImports = usedIcons.filter(u => !imports.includes(u));
const unusedIconImports = imports.filter(i => !usedIcons.includes(i));
console.log('missing icon imports:', JSON.stringify(missingIconImports));
console.log('unused icon imports:', JSON.stringify(unusedIconImports));

const requiredFields = [
  'companyName',
  'trustedText',
  'rating',
  'heroButtons',
  'featuresTitle',
  'processTitle',
  'techTitle',
  'industryTitle',
  'title',
  'subtitle',
  'description',
  'image',
  'overview',
  'stats',
  'offers',
  'features',
  'process',
  'technologies',
  'whyChoose',
  'industries',
  'faqs',
  'relatedServices',
  'cta',
];

const dummyImports = imports.map(name => `const ${name} = null;`).join('\n');
const replaced = content.replace(importMatch[0], dummyImports).replace('export const servicesData =', 'const servicesData =');

const context = { console, process, require };
vm.createContext(context);
vm.runInContext(replaced, context);
const servicesData = context.servicesData;
const errors = [];
for (const [slug, service] of Object.entries(servicesData)) {
  const missingFields = requiredFields.filter(field => service[field] === undefined);
  if (missingFields.length) {
    errors.push({ slug, missingFields });
  }
}
console.log('service count:', Object.keys(servicesData).length);
if (errors.length > 0) {
  console.log('services with missing fields:');
  errors.forEach(err => console.log(`- ${err.slug}: ${err.missingFields.join(', ')}`));
  process.exit(1);
}
console.log('all services have required fields');
