const ExportedFilesFolder = './exportedFiles/';
const outputFile = './output.csv';
const fs = require('fs');
const { findSourceMap } = require('module');
const path = require('path');
const { json } = require('stream/consumers');
const columns = [
	"site",
	"Form Title",
	"Notification Title",
	"Email"
];

fs.writeFileSync(outputFile, "");
fs.writeFileSync(outputFile, columns.join(",") + "\n");
fs.readdirSync(ExportedFilesFolder).forEach(file => {
	let filepath = path.join(ExportedFilesFolder, file);
	if (path.extname(filepath) !== ".json") return;
	let website = file.slice(0, -5);
	const data = fs.readFileSync(filepath);
	const jsonData = JSON.parse(data);
	if (!jsonData) return;
	for (let formIdx in jsonData) {
		let form = jsonData[formIdx];
		if (form.is_active !== '1') continue;
		for (let notification of form.notifications) {
			if (!notification.isActive || !isNaN(notification.to)) continue;
			let notificationTitle = "";
			notificationTitle += notification.name;
			// notificationText += notification.to.replaceAll(",", " | ");
			notification.to.split(",").forEach(email => {
				fs.appendFileSync(outputFile, website + ",");
				fs.appendFileSync(outputFile, form.title + ",");
				fs.appendFileSync(outputFile, notificationTitle + ",");
				fs.appendFileSync(outputFile, email);
				fs.appendFileSync(outputFile, "\n");
			});
		}
	}

});

