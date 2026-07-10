const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, 'data.json');
const DOCS_DIR = path.join(__dirname, 'docs');
const DATA_DIR = path.join(DOCS_DIR, 'data');
const PORTFOLIO_DIR = path.join(DOCS_DIR, 'portfolio');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from docs/
app.use(express.static(DOCS_DIR));

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function generatePersonalMd(d) {
  var bi = d.basicInfo;
  var co = d.contact;
  var md = '# \u4e2a\u4eba\u4fe1\u606f\n\n## \u57fa\u672c\u4fe1\u606f\n\n';
  md += '- **\u59d3\u540d\uff1a** ' + bi['\u59d3\u540d'] + '\n';
  md += '- **\u804c\u4f4d\uff1a** ' + bi['\u804c\u4f4d'] + '\n';
  md += '- **\u6240\u5728\u5730\uff1a** ' + bi['\u6240\u5728\u5730'] + '\n';
  md += '- **\u90ae\u7bb1\uff1a** ' + bi['\u90ae\u7bb1'] + '\n';
  md += '- **GitHub\uff1a** [' + bi.githubLabel + '](' + bi.githubUrl + ')\n';
  md += '- **\u4e2a\u4eba\u7f51\u7ad9\uff1a** [' + bi.websiteLabel + '](' + bi.websiteUrl + ')\n\n';
  md += '---\n\n## \u5173\u4e8e\u6211\n\n' + d.about + '\n\n';
  md += '---\n\n## \u8054\u7cfb\u65b9\u5f0f\n\n';
  md += '- **\u5fae\u4fe1\uff1a** ' + co['\u5fae\u4fe1'] + '\n';
  md += '- **\u7535\u8bdd\uff1a** ' + co['\u7535\u8bdd'] + '\n';
  md += '- **LinkedIn\uff1a** [' + co.linkedinLabel + '](' + co.linkedinUrl + ')\n';
  return md;
}

function generateExperienceMd(section) {
  var md = '# \u9879\u76ee\u7ecf\u9a8c\n\n';
  for (var i = 0; i < section.length; i++) {
    var proj = section[i];
    if (i > 0) md += '\n---\n\n';
    md += '## ' + proj.name + '\n\n';
    md += '**\u65f6\u95f4\uff1a** ' + proj.time + '\n\n';
    md += '**\u89d2\u8272\uff1a** ' + proj.role + '\n\n';
    md += '**\u63cf\u8ff0\uff1a**\n' + proj.description + '\n\n';
    md += '**\u8d1f\u8d23\u5185\u5bb9\uff1a**\n';
    for (var j = 0; j < proj.responsibilities.length; j++) {
      md += '- ' + proj.responsibilities[j] + '\n';
    }
    md += '\n**\u6280\u672f\u6808\uff1a** ' + proj.techStack + '\n';
  }
  return md;
}

function generateSkillsMd(section) {
  var md = '# \u6280\u672f\u6808\n\n';
  var cats = Object.keys(section);
  for (var ci = 0; ci < cats.length; ci++) {
    var cat = cats[ci];
    var items = section[cat];
    md += '## ' + cat + '\n\n';
    if (cat === '\u5d4c\u5165\u5f0f\u5e73\u53f0') {
      md += '| \u5e73\u53f0 | \u7ecf\u9a8c |\n|------|------|\n';
      for (var k = 0; k < items.length; k++) {
        md += '| ' + items[k].col1 + ' | ' + items[k].col2 + ' |\n';
      }
    } else {
      for (var k = 0; k < items.length; k++) {
        if (items[k].name) {
          md += '- **' + items[k].name + '** \u2014 ' + items[k].desc + '\n';
        } else {
          md += '- ' + items[k].desc + '\n';
        }
      }
    }
    md += '\n';
  }
  return md;
}

function generatePortfolioMd(section) {
  var md = '# \u4f5c\u54c1\u96c6\n\n';
  for (var i = 0; i < section.length; i++) {
    var proj = section[i];
    if (i > 0) md += '\n---\n\n';
    md += '## ' + proj.name + '\n\n';
    md += proj.description + '\n\n';
    for (var j = 0; j < proj.details.length; j++) {
      md += '- ' + proj.details[j] + '\n';
    }
    md += '\n';
    if (proj.links) {
      for (var l = 0; l < proj.links.length; l++) {
        md += proj.links[l].label + '\uff1a' + proj.links[l].url + '\n';
      }
    }
  }
  return md;
}

function syncToFile(section, data, filename) {
  var content = '';
  switch (section) {
    case 'personal':   content = generatePersonalMd(data); break;
    case 'experience': content = generateExperienceMd(data); break;
    case 'skills':     content = generateSkillsMd(data); break;
    case 'portfolio':  content = generatePortfolioMd(data); break;
  }
  if (content) {
    fs.writeFileSync(path.join(DATA_DIR, filename), content, 'utf8');
  }
}

// Main page — render EJS with data
app.get('/', function(req, res) {
  var data = readData();
  res.render('index', data);
});

// API: get all data
app.get('/api/data', function(req, res) {
  res.json(readData());
});

// API: get specific section
app.get('/api/data/:section', function(req, res) {
  var data = readData();
  var section = req.params.section;
  if (!data[section]) return res.status(404).json({ error: 'Section not found' });
  res.json(data[section]);
});

// API: save section data
app.post('/api/data/:section', function(req, res) {
  var section = req.params.section;
  var validSections = ['personal', 'experience', 'skills', 'portfolio'];
  if (validSections.indexOf(section) === -1) {
    return res.status(400).json({ error: 'Invalid section' });
  }
  var data = readData();
  data[section] = req.body;
  writeData(data);
  var mdFiles = {
    personal: 'personal.md',
    experience: 'experience.md',
    skills: 'skills.md',
    portfolio: 'portfolio.md'
  };
  syncToFile(section, req.body, mdFiles[section]);
  res.json({ success: true, section: section });
});

// API: upload portfolio image
app.post('/api/upload', function(req, res) {
  var filename = req.body.filename;
  var b64data = req.body.data;
  if (!filename || !b64data) return res.status(400).json({ error: 'Missing filename or data' });
  var buffer = Buffer.from(b64data, 'base64');
  var filePath = path.join(PORTFOLIO_DIR, filename);
  fs.writeFileSync(filePath, buffer);
  res.json({ success: true, filename: filename });
});

// Admin panel page
app.get('/admin', function(req, res) {
  var data = readData();
  var sectionTitles = {
    personal: '\u4e2a\u4eba\u4fe1\u606f',
    experience: '\u9879\u76ee\u7ecf\u9a8c',
    skills: '\u6280\u672f\u6808',
    portfolio: '\u4f5c\u54c1\u96c6'
  };
  res.render('admin', { sectionTitles: sectionTitles, sections: Object.keys(data) });
});

app.listen(PORT, function() {
  console.log('');
  console.log('  Server started at http://localhost:' + PORT);
  console.log('  Admin panel at http://localhost:' + PORT + '/admin');
  console.log('');
});
