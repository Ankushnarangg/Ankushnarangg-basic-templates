const fs = require('fs');
const path = require('path');

const projectStructure = {
  "node-auth-json": {
    "backend": {
      "controllers": { "authController.js": "" },
      "models": { "userModel.js": "" },
      "routes": { "authRoutes.js": "" },
      "data.json": "[]", // Empty JSON array for user storage
      "server.js": ""
    },
    "frontend": {
      "css": { "style.css": "" },
      "js": { "auth.js": "" },
      "index.html": ""
    }
  }
};

function createStructure(basePath, structure) {
  for (const [key, value] of Object.entries(structure)) {
    const fullPath = path.join(basePath, key);
    if (typeof value === "object") {
      fs.mkdirSync(fullPath, { recursive: true });
      createStructure(fullPath, value);
    } else {
      fs.writeFileSync(fullPath, value);
    }
  }
}

createStructure(__dirname, projectStructure);
console.log("✅ Project structure created successfully!");