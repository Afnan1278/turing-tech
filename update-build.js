const fs = require("fs");
const filePath = "./package.json";

const packageJson = JSON.parse(fs.readFileSync(filePath).toString());
packageJson.buildDate = new Date().getTime();
packageJson.buildVersion = (packageJson.buildVersion)? (parseFloat(packageJson.buildVersion) + 0.1).toFixed(2) :"0.1";

fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));

const jsonData = {
  buildDate: packageJson.buildDate,
  buildVersion: packageJson.buildVersion,
};

const jsonContent = JSON.stringify(jsonData);

fs.writeFile("./public/meta.json", jsonContent, "utf8", function (error) {
  if (error) {
    console.log("An error occured while saving build date and time to meta.json");
    return console.log(error);
  }

  console.log("Latest build date and time updated in meta.json file");
});
